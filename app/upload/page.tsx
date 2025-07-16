import React, { useState } from 'react'
import FileUpload, { FileUploadComponent } from '../components/FileUpload'

function UploadVideo() {

  const [title, setTitle] = useState<string>();
  const [description, setDescriptio] = useState<string>();
  const [videoUrl, setVideoUrl] = useState<string>();

  return (
    <div>
        <FileUploadComponent/>


    </div>
  )
}

export default UploadVideo