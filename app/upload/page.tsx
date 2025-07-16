"use client";

import React, { useState } from "react";
import { FileUploadComponent } from "../components/FileUpload";
import { useRouter } from "next/navigation";
import ProgressBar from "../components/ProgressBar";
import { apiClient } from "@/lib/api-client";

function UploadVideo() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [progress, setProgress] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title?.trim().length === 0 || description?.trim().length === 0 || !videoUrl ) return
    console.log(title, description)

    try {
      setLoading(true);
      setError(null);

      const videoData = {title, description, videoUrl, thumbnailUrl : ""}
      const res : any = await apiClient.createVideo(videoData)

      if (res) {
        router.push("/")
      }

    } catch (error : unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.log(error.message)
      }else{
        setError("Failed to upload video")
        console.log(error)
      }
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="h-[80vh]">
      <FileUploadComponent onSuccess={setVideoUrl} onProgress={setProgress} fileType="video" />

      <div  className="max-w-xl mx-auto mt-5 px-4">
        {progress && <ProgressBar progress={progress}/>}
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mt-5 flex flex-col gap-5 px-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="border border-gray-200/40 rounded-md px-3 py-2 w-full outline-0 focus:border-amber-600"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          rows={5}
          className="border border-gray-200/40 rounded-md px-3 py-2 w-full outline-0 focus:border-amber-600"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
         {error && <div className="text-red-600 ">{error}</div>}
        <button
          type="submit"
          disabled={loading || !!(progress && progress < 100)}
          className="px-3 py-2 w-full outline-0 bg-amber-600 disabled:bg-amber-800 duration-300 rounded-md cursor-pointer hover:bg-amber-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadVideo;
