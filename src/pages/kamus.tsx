'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowLeft, Book, Sparkles, Loader2, Bookmark, Star, X } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BackgroundAnimationComponent } from '@/components/background-animation'
import { Toast } from '@/components/ui/toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getAllBookmarks, addBookmark, removeBookmark } from '@/lib/indexedDB'

const MotionCard = motion(Card)
const MotionInput = motion(Input)
const MotionButton = motion(Button)

export default function KamusPage() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'dictionary' | 'gpt'>('dictionary')
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [wordOfTheDay, setWordOfTheDay] = useState({ word: '', definition: '' })
  const [showToast, setShowToast] = useState(false)
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false)

  useEffect(() => {
    // Load bookmarks from IndexedDB
    const loadBookmarks = async () => {
      const savedBookmarks = await getAllBookmarks()
      setBookmarks(savedBookmarks)
    }

    loadBookmarks()

    // Fetch word of the day
    fetchWordOfTheDay()
  }, [])

  const fetchWordOfTheDay = async () => {
    // This would be replaced with an actual API call
    setWordOfTheDay({
      word: 'Semangat',
      definition: 'Kekuatan (kegembiraan, gairah) batin; perasaan hati; nafsu (kemauan, gairah) untuk bekerja, berjuang, dsb.'
    })
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!word.trim()) {
      alert('Silakan masukkan kata yang ingin dicari.')
      return
    }

    if (mode === 'gpt') {
      setIsMaintenanceModalOpen(true)
      return
    }

    setIsLoading(true)
    setResult([])

    try {
      if (mode === 'dictionary') {
        await searchDictionary()
      }
    } catch (error) {
      console.error('Search error:', error)
      setResult(['Terjadi kesalahan saat mencari definisi.'])
    } finally {
      setIsLoading(false)
    }
  }

  const searchDictionary = async () => {
    try {
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(word)}`)
      const data = await response.json()

      if (response.ok) {
        const definitions = data.definition.split('; ').map((def: string) => def.trim())
        setResult(definitions)
      } else {
        setResult([data.error || 'Kata tidak ditemukan.'])
      }
    } catch (error) {
      console.error('Dictionary API error:', error)
      setResult(['Terjadi kesalahan saat mengambil data kamus.'])
    }
  }

  const toggleBookmark = async (wordToBookmark: string) => {
    if (bookmarks.includes(wordToBookmark)) {
      await removeBookmark(wordToBookmark)
      setBookmarks(bookmarks.filter(b => b !== wordToBookmark))
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } else {
      await addBookmark(wordToBookmark)
      setBookmarks([...bookmarks, wordToBookmark])
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 sm:p-8 relative">
      {/* Background Animation with pointer-events disabled */}
      <div className="pointer-events-none z-0">
        <BackgroundAnimationComponent />
      </div>

      {/* Top Bar with Higher z-index */}
      <div className="flex justify-between items-center mb-6 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </motion.div>
        <Dialog open={isBookmarkDialogOpen} onOpenChange={setIsBookmarkDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Bookmark">
              <Bookmark className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bookmark Kata</DialogTitle>
              <DialogDescription>
                Daftar kata yang telah Anda simpan.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {bookmarks.length === 0 ? (
                <p className="text-center text-muted-foreground">Belum ada kata yang di-bookmark.</p>
              ) : (
                <ul className="space-y-2">
                  {bookmarks.map((bookmarkedWord, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <Button
                        variant="link"
                        onClick={() => {
                          setWord(bookmarkedWord)
                          setIsBookmarkDialogOpen(false)
                          handleSearch(new Event('submit') as unknown as React.FormEvent)
                        }}
                      >
                        {bookmarkedWord}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(bookmarkedWord)}
                        aria-label="Hapus Bookmark"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
          <div className="mb-6 p-4 bg-primary-foreground rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Star className="mr-2 h-5 w-5 text-yellow-500" />
              Kata Hari Ini
            </h3>
            <p className="font-medium">{wordOfTheDay.word}</p>
            <p className="text-sm text-muted-foreground">{wordOfTheDay.definition}</p>
          </div>
          <Tabs
            defaultValue="dictionary"
            className="mb-6"
            onValueChange={(value) => {
              setMode(value as 'dictionary' | 'gpt')
              setResult([])
            }}
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
                  <motion.div className="flex items-center justify-center">
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
            {result.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-6 bg-white bg-opacity-80 p-4 rounded shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <motion.h2
                    className="text-2xl font-semibold capitalize"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {word}
                  </motion.h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(word)}
                    aria-label={bookmarks.includes(word) ? "Hapus dari bookmark" : "Tambahkan ke bookmark"}
                  >
                    <Bookmark className={`h-5 w-5 ${bookmarks.includes(word) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <motion.ol
                  className="list-decimal list-inside space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  {result.map((definition, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      className="text-muted-foreground"
                    >
                      {definition}
                    </motion.li>
                  ))}
                </motion.ol>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </MotionCard>

      {/* Maintenance Modal */}
      <AnimatePresence>
        {isMaintenanceModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-sm w-full text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Maintenance</h2>
              <p className="mb-6">
                Maaf, layanan Eksplorasi AI sedang dalam pemeliharaan. Silakan coba lagi nanti.
              </p>
              <Button onClick={() => setIsMaintenanceModalOpen(false)}>Tutup</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <Toast
            title={bookmarks.includes(word) ? "Ditambahkan ke bookmark" : "Dihapus dari bookmark"}
          >
            Kata &quot;{word}&quot; telah {bookmarks.includes(word) ? 'ditambahkan ke' : 'dihapus dari'} bookmark Anda.
          </Toast>
        )}
      </AnimatePresence>
    </div>
  )
}