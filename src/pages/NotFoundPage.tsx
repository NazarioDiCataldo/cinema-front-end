import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-primary animate-bounce">404</h1>
        <Button variant={'outline'} >
            <Link to={'/'}>Torna alla home</Link>
        </Button>
    </main>
  )
}

export default NotFoundPage