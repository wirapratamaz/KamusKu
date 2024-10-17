'use client'

import { useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const faqTopics = [
    { id: 1, title: "Cara Menggunakan Kamus" },
    { id: 2, title: "Fitur Pencarian" },
    { id: 3, title: "Akses Offline" },
    { id: 4, title: "Pembaruan Konten" },
    { id: 5, title: "Dukungan Teknis" },
]

const faqAnswers: { [key: number]: string } = {
    1: "Untuk menggunakan kamus, cukup ketik kata yang ingin Anda cari di kotak pencarian dan tekan Enter. Hasil akan muncul dalam hitungan detik.",
    2: "Fitur pencarian kami mendukung pencarian kata dasar, kata berimbuhan, dan frasa. Anda juga dapat menggunakan filter untuk mempersempit hasil pencarian.",
    3: "Untuk mengakses kamus secara offline, pastikan Anda telah mengunduh database kamus terbaru. Setelah itu, Anda dapat menggunakan aplikasi tanpa koneksi internet.",
    4: "Konten kamus kami diperbarui secara berkala. Pastikan aplikasi Anda selalu dalam versi terbaru untuk mendapatkan definisi dan entri terkini.",
    5: "Jika Anda mengalami masalah teknis, silakan hubungi tim dukungan kami melalui menu 'Kontak' atau kirim email ke support@kamusku.com.",
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ type: 'user' | 'bot', content: string }[]>([])
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleTopicSelect = async (topicId: number) => {
        setSelectedTopic(topicId)
        setIsLoading(true)
        setMessages([
            { type: 'user', content: faqTopics.find(t => t.id === topicId)?.title || '' },
        ])

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        const answer = faqAnswers[topicId]
        setMessages(prevMessages => [
            ...prevMessages,
            { type: 'bot', content: answer }
        ])
        setIsLoading(false)
    }

    const resetChat = () => {
        setMessages([])
        setSelectedTopic(null)
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="w-80 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">FAQ KamusKu</CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[300px] w-full pr-4">
                                    {messages.length > 0 ? (
                                        <>
                                            {messages.map((msg, index) => (
                                                <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                                    <span className={`inline-block p-2 rounded-lg ${msg.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                        {msg.content}
                                                    </span>
                                                </div>
                                            ))}
                                            {isLoading && (
                                                <div className="flex items-center space-x-2 text-muted-foreground">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span>Sedang berpikir...</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-sm text-muted-foreground mb-4">Pilih topik yang ingin Anda tanyakan:</p>
                                            {faqTopics.map((topic) => (
                                                <Button
                                                    key={topic.id}
                                                    variant="outline"
                                                    className="w-full justify-start text-left"
                                                    onClick={() => handleTopicSelect(topic.id)}
                                                    disabled={isLoading}
                                                >
                                                    {topic.title}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                            </CardContent>
                            <CardFooter>
                                {selectedTopic && !isLoading && (
                                    <Button variant="outline" className="w-full" onClick={resetChat}>
                                        Tanya Pertanyaan Lain
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
            <Button
                className="rounded-full w-12 h-12 shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MessageCircle />
            </Button>
        </div>
    )
}