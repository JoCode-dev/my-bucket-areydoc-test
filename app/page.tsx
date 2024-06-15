"use client"
import ListFiles from "@/components/files/list-files";
import Navbar from "@/components/ui/navbar";
import Toaster from "@/components/ui/toast";
import UploadModal from "@/components/upload/upload-modal";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";

export type FilesType = {
  fileName: string;
  data: string;
}

export default function Home() {
  const { isOpen, toggleModal } = useModal();
  const [files, setFiles] = useState<FilesType[]>(null!);

  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    const storedFiles = localStorage.getItem("files");

    const initialFiles = storedFiles ? JSON.parse(storedFiles) : [];
    setFiles(initialFiles);
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      <UploadModal isOpen={isOpen} onChange={toggleModal} files={files} setFiles={setFiles} isUploaded={isUploaded} setIsUploaded={setIsUploaded} />
      {isUploaded && <Toaster message={"The file has been successfuly uploaded!"} title={"File uploaded"} success={true} />}

      <ListFiles files={files} setFiles={setFiles} />
    </main>
  );
}
