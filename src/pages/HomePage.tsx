import Hero from '@/components/Hero'
import LastContent from '@/components/LastContent'

const HomePage = () => {
  return (
    <main className='mt-0!'>
        <Hero />
        <LastContent name='actors' limit={5} order='DESC' />
        <LastContent name='movies' limit={5} order='DESC' />
        <LastContent name='halls' limit={5} order='DESC' />
    </main>
  )
}

export default HomePage