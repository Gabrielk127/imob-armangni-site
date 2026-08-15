import { useEffect, useState } from 'react'
import { Play } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'

interface VideoSectionProps {
  title?: string
  subtitle?: string
  videoUrl?: string
  description?: string
  sectionDescription?: string
}

export function VideoSection({
  title,
  subtitle,
  videoUrl,
  description,
  sectionDescription,
}: VideoSectionProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const videoData = {
    title: title || 'Tour Virtual',
    subtitle:
      subtitle ||
      sectionDescription ||
      'Conheça cada detalhe da propriedade através do nosso vídeo exclusivo',
    videoUrl: videoUrl || '',
    description:
      description ||
      'Assista ao tour completo e descubra todos os ambientes desta propriedade única',
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return ''
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  if (!videoData.videoUrl) return null

  const embedUrl = getEmbedUrl(videoData.videoUrl)

  if (!isMounted) {
    return (
      <section className='bg-[#1C1C1C] px-4 py-16' id='video'>
        <div className='mx-auto max-w-4xl'>
          <SectionHeading title={videoData.title} description={videoData.subtitle} dark />
          <div className='relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-[#262626] shadow-2xl mt-8'>
            <div className='text-center text-white'>
              <Play className='mx-auto mb-4 h-16 w-16 opacity-80' />
              <p className='text-lg font-medium'>Carregando vídeo...</p>
            </div>
          </div>
          <div className='mt-6 text-center'>
            <p className='text-[#c9ccd0]'>{videoData.description}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className='bg-[#1C1C1C] px-4 py-16' id='video'>
      <div className='mx-auto max-w-4xl'>
        <SectionHeading title={videoData.title} description={videoData.subtitle} dark />

        <div className='relative aspect-video overflow-hidden rounded-lg bg-[#262626] shadow-2xl mt-8'>
          <iframe
            src={embedUrl}
            title={`${videoData.title} - Tour Virtual`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='h-full w-full border-0'
            loading='lazy'
          />
        </div>

        <div className='mt-6 text-center'>
          <p className='text-[#c9ccd0]'>{videoData.description}</p>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
