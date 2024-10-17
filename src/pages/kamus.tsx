'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, Book, Sparkles, Loader2 } from "lucide-react";
import Link from 'next/link';

const MotionCard = motion(Card);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

const BackgroundAnimation = () => (
  <div className="absolute inset-0 overflow-hidden z-0">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <motion.circle
        cx="50%"
        cy="50%"
        r="30%"
        fill="none"
        stroke="rgba(59, 130, 246, 0.3)"
        strokeWidth="2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: Infinity,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  </div>
);

export default function KamusPage() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<'dictionary' | 'gpt'>('dictionary');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      alert('Silakan masukkan kata yang ingin dicari.');
      return;
    }

    setIsLoading(true);
    setResult([]);

    try {
      if (mode === 'dictionary') {
        await searchDictionary();
      } else {
        await searchGPT();
      }
    } catch (error) {
      console.error('Search error:', error);
      setResult(['Terjadi kesalahan saat mencari definisi.']);
    } finally {
      setIsLoading(false);
    }
  };

  const searchDictionary = async () => {
    try {
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(word)}`);
      const data = await response.json();

      if (response.ok) {
        // Split the definition string by semicolon followed by space to create an array of definitions
        const definitions = data.definition.split('; ').map((def: string) => def.trim());
        setResult(definitions);
      } else {
        setResult([data.error || 'Kata tidak ditemukan.']);
      }
    } catch (error) {
      console.error('Dictionary API error:', error);
      setResult(['Terjadi kesalahan saat mengambil data kamus.']);
    }
  };

  const searchGPT = async () => {
    try {
      const response = await fetch('/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult([data.response]);
      } else {
        setResult([data.error || 'Terjadi kesalahan saat memproses permintaan AI.']);
      }
    } catch (error) {
      console.error('GPT API error:', error);
      setResult(['Terjadi kesalahan saat memproses permintaan AI.']);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 sm:p-8 relative">
      <BackgroundAnimation />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </motion.div>
      <MotionCard
        className="max-w-3xl mx-auto z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Jelajahi Kata</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="dictionary"
            className="mb-6"
            onValueChange={(value: string) => setMode(value as 'dictionary' | 'gpt')}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dictionary" className="flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <Book className="mr-2 h-4 w-4" />
                  Kamus Tradisional
                </motion.div>
              </TabsTrigger>
              <TabsTrigger value="gpt" className="flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Eksplorasi AI
                </motion.div>
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="dictionary">
                  <p className="text-muted-foreground mb-4">
                    Temukan arti kata dari kamus resmi Bahasa Indonesia. Dapatkan definisi akurat dan penggunaan yang tepat.
                  </p>
                </TabsContent>
                <TabsContent value="gpt">
                  <p className="text-muted-foreground mb-4">
                    Jelajahi kata lebih dalam dengan bantuan kecerdasan buatan. Dapatkan wawasan yang lebih luas dan beragam tentang penggunaan kata.
                  </p>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <MotionInput
                type="text"
                placeholder="Ketik kata yang ingin Anda cari"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="flex-grow"
                aria-label="Ketik kata yang ingin Anda cari"
                required
                initial={{ scale: 1 }}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <MotionButton
                type="submit"
                disabled={isLoading}
                aria-label="Cari kata"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <motion.div
                    className="flex items-center justify-center"
                  >
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Loading...</span>
                  </motion.div>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span className="ml-2">Cari</span>
                  </>
                )}
              </MotionButton>
            </div>
          </form>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-white bg-opacity-80 p-4 rounded shadow"
              >
                <motion.h2
                  className="text-2xl font-semibold mb-2 capitalize"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {word}
                </motion.h2>
                <motion.div
                  className="text-muted-foreground whitespace-pre-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {result}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </MotionCard>
    </div>
  );
}