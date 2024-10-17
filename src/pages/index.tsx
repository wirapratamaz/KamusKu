'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { Search, Book, Zap, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Footer from '@/components/Footer'
import WaveBackground from '@/components/WaveBackground'

export default function Index() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-100 relative">
      <WaveBackground />
      <motion.div className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <header className="p-4 md:p-6 flex justify-between items-center bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0">
          <Link href="/" className="text-3xl font-bold text-primary flex items-center">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Book className="mr-2 h-8 w-8" />
            </motion.div>
            KamusKu
          </Link>
          <nav className="hidden md:flex space-x-4">
            <NavLink href="/kamus">Buka Kamus</NavLink>
            <NavLink href="#tentang-kami">Tentang Kami</NavLink>
            <NavLink href="#kontak">Kontak</NavLink>
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
                <DropdownMenuItem asChild>
                  <Link href="#tentang-kami">Tentang Kami</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#kontak">Kontak</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold tracking-tight lg:text-6xl mb-6"
              style={{ opacity }}
            >
              Kamus Bahasa Indonesia Digital
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              style={{ opacity }}
            >
              Jelajahi kekayaan Bahasa Indonesia dengan kamus digital yang cepat, akurat, dan mudah digunakan.
            </motion.p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="animate-pulse">
                <Link href="/kamus">
                  Mulai Mencari
                </Link>
              </Button>
            </motion.div>
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
            />
            <FeatureCard
              icon={<Book className="h-8 w-8 text-green-500" />}
              title="Kamus Lengkap"
              description="Akses ribuan kata dan istilah dalam Bahasa Indonesia dengan mudah."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-500" />}
              title="Akses Offline"
              description="Gunakan kamus kapan saja, di mana saja, bahkan tanpa koneksi internet."
            />
          </motion.div>
        </main>
        <Footer />
      </motion.div>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      className="bg-white bg-opacity-80 backdrop-blur-sm text-card-foreground rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex justify-center items-center h-20 w-20 rounded-full bg-primary bg-opacity-10 mx-auto mb-4"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
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