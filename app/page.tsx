"use client"
import ListFiles from "@/components/files/list-files";
import Navbar from "@/components/ui/navbar";
import UploadModal from "@/components/upload/upload-modal";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, toggleModal } = useModal();
  const storedFiles = localStorage.getItem("files");

  const initialFiles = storedFiles ? JSON.parse(storedFiles) : [];
  const [files, setFiles] = useState<string[]>(initialFiles);

  useEffect(() => {
    console.log(localStorage.getItem("files"));
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      <UploadModal isOpen={isOpen} onChange={toggleModal} files={files} setFiles={setFiles} />

      <ListFiles files={files} />
    </main>
  );
}
