import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { Select } from "@/components/ui/select"

const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-16 pb-12 text-gray-600">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-4">BAHASA</h3>
                        <Select>
                            <option value="id">Bahasa Indonesia</option>
                        </Select>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">APLIKASI</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary">Kamus untuk Android</Link></li>
                            <li><Link href="#" className="hover:text-primary">Kamus untuk iOS</Link></li>
                            <li><Link href="#" className="hover:text-primary">Kamus untuk Web</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">LEGAL</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary">Syarat Layanan</Link></li>
                            <li><Link href="#" className="hover:text-primary">Kebijakan Privasi</Link></li>
                            <li><Link href="#" className="hover:text-primary">Kebijakan Cookie</Link></li>
                            <li><Link href="#" className="hover:text-primary">Hak Cipta</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">PERUSAHAAN</h3>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:text-primary">Tentang Kami</Link></li>
                            <li><Link href="#" className="hover:text-primary">Kontak</Link></li>
                            <li><Link href="#" className="hover:text-primary">Karir</Link></li>
                            <li><Link href="#" className="hover:text-primary">Blog</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p>Jam Kerja:</p>
                            <p>Senin — Jumat, 09:00 — 17:00 WIB</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Facebook size={24} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Instagram size={24} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Twitter size={24} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary">
                                <Linkedin size={24} />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} KamusKu - Hak Cipta Dilindungi</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer