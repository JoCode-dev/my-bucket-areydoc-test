"use client"
import Navbar from "@/components/ui/navbar";
import UploadModal from "@/components/upload/upload-modal";
import useModal from "@/hooks/useModal";
import { useEffect, useState } from "react";

export default function Home() {
  const { isOpen, toggleModal } = useModal();
  const [files, setFiles] = useState<File[] | null>(null);

  useEffect(() => {
    window.localStorage.getItem("files");
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />

      <UploadModal isOpen={isOpen} onChange={toggleModal} />

    </main>
  );
}
