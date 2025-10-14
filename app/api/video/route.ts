import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Video, { Ivideo } from "@/models/Video";
import { request } from "http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const video = await Video.find({}).sort({ createdAt: -1 });
    if (!video || video.length === 0) {
      return NextResponse.json({ error: "No Video Found" }, { status: 400 });
    }
    return NextResponse.json(video);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Faild to fetch video" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body: Ivideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Faild to create video" },
        { status: 500 }
      );
    }
    const videoddata = {
      ...body,
      controls: body?.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      }, 
    };

    const newVideo = await Video.create(videoddata);
    return NextResponse.json(newVideo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Faild to create video" },
      { status: 500 }
    );
  }
}
