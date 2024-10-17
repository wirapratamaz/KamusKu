// src/pages/index.tsx

import { useRef } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Book, Zap, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WaveBackground from '@/components/WaveBackground';
import { Chatbot } from "@/components/Chatbot";

export default function LandingPage() {
  const tentangKamiRef = useRef<HTMLDivElement>(null);
  const kontakRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative">
      <WaveBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 md:p-6 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
          <Link href="/" className="text-3xl font-bold text-primary flex items-center">
            <Book className="mr-2 h-8 w-8" />
            KamusKu
          </Link>
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/kamus">Buka Kamus</NavLink>
            <button onClick={() => scrollToSection(tentangKamiRef)} className="text-gray-600 hover:text-primary transition-colors">
              Tentang Kami
            </button>
            <button onClick={() => scrollToSection(kontakRef)} className="text-gray-600 hover:text-primary transition-colors">
              Kontak
            </button>
          </nav>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/kamus">Buka Kamus</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => scrollToSection(tentangKamiRef)}>
                  Tentang Kami
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => scrollToSection(kontakRef)}>
                  Kontak
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl mb-6">
              Kamus Bahasa Indonesia Digital
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Jelajahi kekayaan Bahasa Indonesia dengan kamus digital yang cepat, akurat, dan mudah digunakan.
            </p>
            <Button asChild size="lg" className="animate-pulse">
              <Link href="/kamus">
                Mulai Mencari
              </Link>
            </Button>
          </motion.div>
          <motion.div
            className="mt-20 grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FeatureCard
              icon={<Search className="h-8 w-8 text-blue-500" />}
              title="Pencarian Cepat"
              description="Temukan definisi kata dengan cepat dan akurat dalam hitungan detik."
              color="blue"
            />
            <FeatureCard
              icon={<Book className="h-8 w-8 text-green-500" />}
              title="Kamus Lengkap"
              description="Akses ribuan kata dan istilah dalam Bahasa Indonesia dengan mudah."
              color="green"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Akses Offline"
              description="Gunakan kamus kapan saja, di mana saja, bahkan tanpa koneksi internet."
              color="yellow"
            />
          </motion.div>
          <Chatbot />
        </main>
      </div>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-primary transition-colors">
      {children}
    </Link>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    <motion.div
      className="bg-white bg-opacity-80 backdrop-blur-sm text-card-foreground rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className={`flex justify-center items-center h-20 w-20 rounded-full bg-${color}-100 mx-auto mb-4`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}