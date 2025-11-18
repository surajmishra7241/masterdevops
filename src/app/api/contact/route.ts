// Remove or comment out this line when using output: "export"
// export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import redis from "../../../lib/redis";

interface ContactFormPayload {
  name: string;
  email: string;
  service: string;
  timeline: string;
  message: string;
}

function validatePayload(payload: any): payload is ContactFormPayload {
  return (
    payload &&
    typeof payload.name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.service === "string" &&
    typeof payload.timeline === "string" &&
    typeof payload.message === "string" &&
    payload.name.trim() !== "" &&
    payload.email.trim() !== "" &&
    payload.message.trim() !== ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!validatePayload(payload)) {
      return NextResponse.json(
        { error: "Invalid payload. Missing required fields." },
        { status: 400 }
      );
    }

    const uuid = uuidv4();
    const timestamp = Date.now();
    const redisKey = `contact:${uuid}:${timestamp}`;

    const redisData = {
      ...payload,
      mongodbStatus: "false",
      sheetStatus: "false",
      emailStatus: "false",
      consumed: "false",
    };

    // Use hmset with proper typing for ioredis
    await redis.hmset(redisKey, redisData);
    await redis.expire(redisKey, 43200); // 12 hours TTL

    console.log(`Contact form data pushed to Redis: ${redisKey}`);

    return NextResponse.json({ 
      message: "Contact form submitted successfully",
      requestId: uuid 
    });
  } catch (error) {
    console.error("Error in contact form POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
