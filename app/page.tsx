"use client"
import Navbar from "@/components/ui/navbar";
import UploadModal from "@/components/ui/upload-modal";
import { Button } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => setTheme(theme == 'light' ? 'dark' : 'light');

  return (
    <main className="min-h-screen border-2">
      <Navbar />

      <UploadModal />

      <div className="border-2 p-3">
        <Button onClick={toggleMode}>
          Toggle Theme
        </Button>
      </div>
    </main>
  );
}
