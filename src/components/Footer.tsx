import { Github, Globe, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className='w-full bg-blue-950 mt-8'>
        <div className='container p-4 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-4 text-secondary'>
            <p className='text-center'>
                Copyright © {new Date().getFullYear()}. Nazario Di Cataldo. Progetto realizzato per fini scolastici
            </p>
            <div className="flex gap-4 justify-center">
                <a href='https://github.com/NazarioDiCataldo' target="_blank" className="border-2 p-2 rounded-full">
                    <Github className="size-6" />
                </a>
                <a href='https://nazariodicataldo.it/' target="_blank" className="border-2 p-2 rounded-full">
                    <Globe className="size-6" />
                </a>
                <a href='https://www.instagram.com/nazariodicataldo/' target="_blank" className="border-2 p-2 rounded-full">
                    <Instagram className="size-6" />
                </a>
            </div>
        </div>
    </footer>
  )
}

export default Footer