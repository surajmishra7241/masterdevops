import { google } from "googleapis";
import { JWT } from "google-auth-library";

/**
 * Appends a new row to the configured Google Sheet
 * @param values Array of values to append as a row [timestamp, name, email, service, timeline, message]
 */
export async function appendToGoogleSheet(values: string[]): Promise<void> {
  try {
    // Validate required environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_EMAIL is not defined in environment variables");
    }
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("GOOGLE_PRIVATE_KEY is not defined in environment variables");
    }
    if (!process.env.GOOGLE_SHEETS_ID) {
      throw new Error("GOOGLE_SHEETS_ID is not defined in environment variables");
    }

    // Replace escaped newlines in private key (common issue with env variables)
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    // Create JWT client for service account authentication
    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    // Initialize Google Sheets API client
    const sheets = google.sheets({ version: "v4", auth });

    // Configuration
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || "Sheet1!A:F"; // Default range

    // Append the row to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED", // Allows Google Sheets to parse dates, numbers, formulas
      insertDataOption: "INSERT_ROWS", // Always insert new rows
      requestBody: {
        values: [values], // Wrap in array as API expects array of rows
      },
    });

    console.log(
      `Successfully appended row to Google Sheet. Updated range: ${response.data.updates?.updatedRange}`
    );
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    // Re-throw so the caller knows it failed
    throw error;
  }
}

/**
 * Initialize the Google Sheet with headers (run this once manually if needed)
 */
export async function initializeGoogleSheet(): Promise<void> {
  try {
    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SHEETS_ID) {
      throw new Error("Missing required Google Sheets environment variables");
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    // Add headers to the first row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1:F1",
      valueInputOption: "RAW",
      requestBody: {
        values: [["Timestamp", "Name", "Email", "Service", "Timeline", "Message"]],
      },
    });

    console.log("Google Sheet initialized with headers");
  } catch (error) {
    console.error("Error initializing Google Sheet:", error);
    throw error;
  }
}

/**
 * Get all rows from the Google Sheet
 * @returns Array of rows
 */
export async function getGoogleSheetData(): Promise<any[][]> {
  try {
    if (!process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SHEETS_ID) {
      throw new Error("Missing required Google Sheets environment variables");
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets.readonly",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A:F",
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error reading from Google Sheet:", error);
    throw error;
  }
}
