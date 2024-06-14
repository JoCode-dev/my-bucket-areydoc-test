"use client"
import Navbar from "@/components/ui/navbar";
import UploadModal from "@/components/ui/upload-modal";
import useModal from "@/hooks/useModal";
import { useEffect } from "react";

export default function Home() {

  const { isOpen, toggleModal } = useModal();

  return (
    <main className="min-h-screen">
      <Navbar />

      <UploadModal isOpen={isOpen} onChange={toggleModal} />

      {isOpen && <div>Hello Div is OPEN</div>}
    </main>
  );
}
