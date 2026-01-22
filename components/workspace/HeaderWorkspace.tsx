"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const HeaderWorkspace = () => {
  return (
    <header className="w-full border-b bg-gray-950">
      <nav className="flex items-center justify-between py-4 px-5">
        <motion.div
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            prefetch={false}
            href="/"
            className="flex items-center space-x-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-700">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="bg-linear-to-r from-blue-500 to-blue-700 bg-clip-text text-xl font-bold text-transparent">
              Room AI
            </span>
          </Link>
        </motion.div>
        <Button className="text-white cursor-pointer">Simpan</Button>
      </nav>
    </header>
  );
};

export default HeaderWorkspace;
