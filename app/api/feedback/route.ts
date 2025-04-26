import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

interface FormData {
  comment: string;
}

export async function POST(req: Request) {
  // CORS Headers
  const origin = req.headers.get("origin") || "*";

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Check content type
  const contentType = req.headers.get("content-type");
  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "Invalid content type" },
      {
        status: 415,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
  }
  let client: MongoClient | null = null;

  try {
    const body = await req.json();
    const { comment } = body as Partial<FormData>;

    if (!comment?.trim()) {
      return NextResponse.json(
        { error: "Comment is required" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );
    }

    console.log("MONGODB_URI:", process.env.MONGO_CONNECTION);
    client = await MongoClient.connect(process.env.MONGO_CONNECTION as string);
    const db = client.db("it_legend");

    await db.collection("task").insertOne({
      comment,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
