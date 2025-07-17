import { connectDB } from "@/lib/db"
import Video from "@/models/Video"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";
import { IVideo } from "@/models/Video";

export async function GET() {
    try {
        await connectDB()

        const videos = await Video.find({}).sort({createdAt : -1}).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json([] ,{status : 200})
        }

        console.log(videos)
        return NextResponse.json(videos)

    } catch (error) {
        console.log(error)
         return NextResponse.json({error: "Failed to fetch videos"}, {status : 500})
    }
}


export async function POST(request : NextRequest) {
    try {
       const session = await getServerSession(authOptions)


       if (!session) {
         return NextResponse.json({error: "Unauthorized"}, {status : 401})
       }

       await connectDB();

       const body : IVideo = await request.json();


       if (!body.title || !body.description || !body.videoUrl) {
        return NextResponse.json({error: "Missing required fields"}, {status : 400})
       }

       const videoData = {
        ...body,
        controls : body?.controls ?? true,
        thumbnailUrl : body?.thumbnailUrl ?? "",
        transformation : {
            height : 1920,
            width : 1080,
            quality: body?.transformation?.quality ?? 100
        }
       }

       const newVideo = await Video.create(videoData);

       return NextResponse.json(newVideo, {status : 201});

    } catch (error) {
        console.log(error)
         return NextResponse.json({error: "Failed to create new video"}, {status : 500})
    }
}