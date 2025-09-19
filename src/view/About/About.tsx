import { useMemo } from "react"
import SplitText from '../../components/TextSplit/TextSplit'
import Scene from "../../components/Object/Object"

interface AboutProps {
  portfolioVisible: boolean
  backgroundVisible: boolean
  grayBgOpacity: number
}

export default function About({ portfolioVisible, backgroundVisible, grayBgOpacity }: AboutProps) {
  const cameraPosition = useMemo(() => [0, 10, 300] as [number, number, number], [])
  const lookAt = useMemo(() => [0, 10, 0] as [number, number, number], [])

  return (
    <div className='h-[100vh] w-screen'>
      <div className="relative z-30 flex h-full w-full lg:flex-row flex-col items-center justify-center p-8"
        style={{ opacity: portfolioVisible ? 1 : 0 }}>
        <div className="flex lg:w-1/2 w-full h-full flex-col lg:items-start items-center lg:justify-start justify-center text-white 2xl:pl-56 lg:pl-36 pl-0">
          <div className="h-1/10 w-full" />
          <div className="flex items-end flex-col">
            <h1 className="text-left md:text-right text-7xl md:text-8xl xl:text-9xl uppercase font-tusker overflow-hidden pt-2">
              Hello. I'm Nicolas
            </h1>
            <p className="text-[#928b73] font-migra font-medium leading-4 tracking-normal whitespace-nowrap text-lg">
              Nicolas Dumetz
            </p>
          </div>
          <div className="flex flex-col mt-8 md:mt-16 max-w-lg md:max-w-3xl"
            style={{ visibility: backgroundVisible ? 'visible' : 'hidden' }}>
            <SplitText
              text="Currently a student,"
              className="text-right text-xl md:text-2xl lg:-ext-3xl 2xl:text-4xl uppercase font-neueMontreal"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="right"
              ready={grayBgOpacity > 0.1} />
            <SplitText
              text="I’m already ready to deliver professional results, blending strong technical skills with a genuine passion for breakthroughs in neuroscience, a field that truly inspires me. I focus on ambitious projects where I can contribute my skills."
              className="text-left text-xl md:text-2xl lg:-ext-3xl 2xl:text-4xl uppercase font-neueMontreal"
              delay={50}
              duration={0.6}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
              ready={grayBgOpacity > 0.25} />
          </div>
        </div>
        <div className="h-full w-full lg:w-1/2 flex items-center justify-center md:mt-0 mt-16">
          <div className="xl:h-2/3 xl:w-3/4 lg:h-1/2 h-full w-full">
            <Scene
              modelPath="/scene/david/scene.gltf"
              cameraPosition={cameraPosition}
              cameraLookAt={lookAt}
              rotationSpeed={0.005}
              scaleFactor={200}
              ambientLightIntensity={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
