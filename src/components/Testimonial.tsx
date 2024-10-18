'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import useEmblaCarousel from 'embla-carousel-react'
import { useMediaQuery } from '../hooks/use-media-query'

const testimonials = [
    {
        name: "Vonny Felicia",
        username: "@vonnyfelicia",
        image: "https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2024/02/03/snapinstaapp_373744852_66493041-20240203020304.jpg",
        quote: "KamusKu sangat membantu saya dalam menulis tugas kuliah. Terima kasih KamusKu!"
    },
    {
        name: "Joko Widodo",
        username: "@jokowi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtD_-6ZzIeFdlM2_xhFYVZy5icOfmBjN44OA&s",
        quote: "Aplikasi yang luar biasa untuk meningkatkan kosakata Bahasa Indonesia. Sangat direkomendasikan!"
    },
    {
        name: "Raisa Andriana",
        username: "@raisa6690",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ2UDURLOlxGeFj3fuD__7BiyHO2IR_2bKPg&s",
        quote: "KamusKu adalah teman setia saya dalam menulis. Fitur pencarian cepatnya sangat membantu!"
    },
    {
        name: "Maudy Ayunda",
        username: "@maudyayunda",
        image: "https://akcdn.detik.net.id/community/media/visual/2021/03/10/kelulusan-maudy-ayundainstagramcommaudyayunda.jpeg?w=620&q=90",
        quote: "Sebagai seorang pemimpin, komunikasi yang baik itu penting. KamusKu membantu saya menggunakan kata yang tepat."
    }
]

export default function Testimonial() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const isMobile = useMediaQuery("(max-width: 640px)")

    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit()
        }
    }, [emblaApi, isMobile])

    return (
        <section className="py-16 mb-6 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2">Testimoni</h2>
                <p className="text-center text-gray-600 mb-8">Apa kata pengguna kami tentang KamusKu</p>
                <div className="relative max-w-4xl mx-auto">
                    <Carousel ref={emblaRef} className="w-full">
                        <CarouselContent>
                            {testimonials.map((testimonial, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <Card className="h-full">
                                        <CardContent className="flex flex-col items-center p-6 h-full">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full mb-4 object-cover"
                                            />
                                            <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                            <p className="text-gray-500 mb-4">{testimonial.username}</p>
                                            <p className="text-center italic flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {!isMobile && (
                            <>
                                <CarouselPrevious className="left-0 -translate-x-1/2" />
                                <CarouselNext className="right-0 translate-x-1/2" />
                            </>
                        )}
                    </Carousel>
                </div>
            </div>
        </section>
    )
}