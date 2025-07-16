"use client"

import { apiClient } from "@/lib/api-client";
import type { IVideo } from "@/models/Video";
import React, { useEffect, useState } from "react";
import Loader from "./loader/Loader";

function Videos() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
     try {
      setLoading(true)
    const res = await apiClient.getVideos();

    if (res) {
      setVideos(res)
    }
   } catch (error) {
    console.log(error)
   }finally{
    setLoading(false)
   }
  }

  useEffect(() => {
  fetchVideos()
  }, [])
  
  if (loading) return <div className="h-screen fixed top-0 left-0 w-full bg-black grid place-items-center"><Loader /></div>

  return (videos.length === 0 ? <div className="h-80 grid place-items-center"><h1 className="text-3xl font-bold">No videos found</h1></div> :
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {videos.map(video => <Video key={video._id?.toString()} title={video.title} description={video.description} videoUrl={video.videoUrl}/>)}
      </div>
  )
}

export default Videos



function Video({
  title,
  description,
  videoUrl,
}: {
  title: string;
  description: string;
  videoUrl: string;
  thumbnail?: string | null;
}) {
  return (
    <div className="border border-gray-200/30 aspect-[9/16] rounded-xl overflow-clip flex flex-col">
      <video className="w-full flex-1 object-cover" controls>
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
      <div className="p-3 shrink-0">
        <h2 className="line-clamp-1">{title}</h2>
        <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}

