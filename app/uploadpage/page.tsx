"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { FaFileUpload } from "react-icons/fa"
import { IoClose } from "react-icons/io5"

const FileUploadPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>("")
  const tagInputRef = useRef<HTMLInputElement>(null)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".svg"],
      "video/*": [".mp4", ".mov", ".avi", ".wmv"],
      "audio/*": [".mp3", ".wav", ".ogg", ".m4a"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".csv", ".xml", ".json"],
      "application/*": [".zip", ".rar", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"],
    },
    onDrop: (acceptedFiles:any) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    },
  })

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setTags((prevTags) => [...prevTags, newTag.trim()])
      setNewTag("")
      if (tagInputRef.current) {
        tagInputRef.current.focus()
      }
    }
  }

  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index))
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }

  // 태그 입력 시 엔터 키 처리 함수를 수정합니다.
  // 기존 함수:
  // const handleTagKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault()
  //     handleAddTag()
  //   }
  // }

  // 수정된 함수:
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-md border-2 border-dashed border-gray-400 cursor-pointer"
      >
        <input {...getInputProps()} />
        <FaFileUpload size={48} className="text-gray-500 mb-4" />
        <p className="text-gray-500 text-sm">Drag & drop files here, or click to select files</p>
      </div>

      <div className="mt-4 w-full max-w-md">
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Uploaded Files</h2>
            <ul>
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <span>{file.name}</span>
                  <button onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700">
                    <IoClose size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Tags</h2>
          <div className="flex items-center flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >
                {tag}
                <button onClick={() => handleRemoveTag(index)} className="ml-1 text-red-500 hover:text-red-700">
                  <IoClose size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Add a tag"
              value={newTag}
              onChange={handleTagChange}
              onKeyDown={handleTagKeyDown}
              ref={tagInputRef}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            <button
              onClick={handleAddTag}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileUploadPage
