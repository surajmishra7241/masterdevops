import { NextResponse } from "next/server";
import redis from "../../../lib/redis";
import clientPromise from "../../../lib/mongo";
import { appendToGoogleSheet } from "../../../lib/googleSheets";
import { sendConfirmationEmail } from "../../../lib/email";

const REDIS_LOCK_TTL = 60;

async function acquireLock(key: string): Promise<boolean> {
  const lockKey = `${key}:lock`;
  const acquired = await redis.set(lockKey, "1", "EX", REDIS_LOCK_TTL, "NX");
  return acquired === "OK";
}

async function releaseLock(key: string): Promise<void> {
  const lockKey = `${key}:lock`;
  await redis.del(lockKey);
}

interface ContactRedisData {
  name: string;
  email: string;
  service: string;
  timeline: string;
  message: string;
  mongodbStatus: "true" | "false";
  sheetStatus: "true" | "false";
  emailStatus: "true" | "false";
  consumed: "true" | "false";
}

async function processKey(key: string) {
  console.log(`Processing Redis key: ${key}`);

  const locked = await acquireLock(key);
  if (!locked) {
    console.log(`Lock not acquired for ${key}, skipping.`);
    return;
  }

  try {
    const data = await redis.hgetall(key);
    if (!data || Object.keys(data).length === 0) {
      console.log(`No data found for ${key}`);
      await releaseLock(key);
      return;
    }

    const contactData = data as unknown as ContactRedisData;

    if (contactData.consumed === "true") {
      console.log(`Key ${key} already consumed.`);
      await releaseLock(key);
      return;
    }

    const db = (await clientPromise).db();
    const contacts = db.collection("contacts");

    // MongoDB insert (idempotent)
    if (contactData.mongodbStatus !== "true") {
      const existing = await contacts.findOne({ _id: key });
      if (!existing) {
        const { name, email, service, timeline, message } = contactData;
        await contacts.insertOne({
          _id: key,
          name,
          email,
          service,
          timeline,
          message,
          createdAt: new Date(parseInt(key.split(":")[2]) || Date.now()),
        });
        await redis.hset(key, "mongodbStatus", "true");
        console.log(`MongoDB insert success for ${key}`);
      } else {
        await redis.hset(key, "mongodbStatus", "true");
        console.log(`MongoDB record already exists for ${key}`);
      }
    }

    // Google Sheets append
    if (contactData.sheetStatus !== "true") {
      const { name, email, service, timeline, message } = contactData;
      await appendToGoogleSheet([
        new Date().toISOString(),
        name,
        email,
        service,
        timeline,
        message,
      ]);
      await redis.hset(key, "sheetStatus", "true");
      console.log(`Google Sheets append success for ${key}`);
    }

    // Send confirmation email
    if (contactData.emailStatus !== "true") {
      const { name, email } = contactData;
      await sendConfirmationEmail(email, name);
      await redis.hset(key, "emailStatus", "true");
      console.log(`Confirmation email sent for ${key}`);
    }

    // Check if all tasks completed
    const updatedData = await redis.hgetall(key);
    const updatedContactData = updatedData as unknown as ContactRedisData;

    if (
      updatedContactData.mongodbStatus === "true" &&
      updatedContactData.sheetStatus === "true" &&
      updatedContactData.emailStatus === "true"
    ) {
      await redis.del(key);
      console.log(`All tasks completed for ${key}, deleted from Redis.`);
    } else {
      await redis.hset(key, "consumed", "true");
      console.log(`Marked ${key} as consumed but kept for retry`);
    }
  } catch (error) {
    console.error(`Error processing ${key}:`, error);
    // Do not mark consumed on error so it can retry
  } finally {
    await releaseLock(key);
  }
}

export async function GET() {
  try {
    let cursor = "0";
    let processedCount = 0;

    do {
      const result = await redis.scan(cursor, "MATCH", "contact:*", "COUNT", 100);
      cursor = result[0];
      const keys = result[1];

      for (const key of keys) {
        if (key.endsWith(":lock")) {
          continue;
        }

        const data = await redis.hgetall(key);
        if (data && data.consumed === "false") {
          await processKey(key);
          processedCount++;
        }
      }
    } while (cursor !== "0");

    console.log(`Processing completed. Processed ${processedCount} keys.`);

    return NextResponse.json({
      message: "Processing completed",
      processedCount,
    });
  } catch (error) {
    console.error("Error in background processing worker:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
