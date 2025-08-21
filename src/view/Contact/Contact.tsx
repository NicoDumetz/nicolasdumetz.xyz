import { useMemo } from "react"
import Scene from "../../components/Object/Object"
import CurvedLoop from '../../components/CurvedLoop/CurverdLoop'

interface ContactProps {
  portfolioVisible: boolean
  backgroundVisible: boolean
  overflowVisible: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Contact({ portfolioVisible, backgroundVisible, overflowVisible, setIsModalOpen }: ContactProps) {
  const cameraPositionMonet = useMemo(() => [0, 0, 250] as [number, number, number], [])
  const lookAtMonet = useMemo(() => [0, 0, 0] as [number, number, number], [])

  return (
    <div className='text-[#ffff] z-40 text-9xl h-[130vh] absolute w-full flex flex-col items-start justify-start'>
      <div className='w-full h-1/10 flex mt-32 items-end justify-end'>
        <CurvedLoop
          marqueeText="THANK YOU FOR VISITING ✦ LET'S CREATE THE FUTURE TOGETHER ✦ CONTACT ME ✦ LET'S GET STARTED ✦"
          speed={1.5}
          curveAmount={0}
          direction="left"
          interactive={true}
          className="font-tusker whitespace-nowrap tracking-wide md:block hidden" />
      </div>
      <div id='contact' className='w-full h-full flex-row m-16'>
        <div className="absolute md:bottom-0 bottom-[10%] left-0 px-8 z-10 flex flex-col items-start">
          <div className="flex items-end gap-1" style={{ overflow: overflowVisible ? 'visible' : 'hidden', lineHeight: 1.1 }}>
            <p
              className="text-white font-tusker whitespace-nowrap text-[12rem] lg:text-[16rem] xl:text-[20rem] 2xl:text-[21rem] inline-block transition-transform duration-700 ease-out delay-700"
              style={{ opacity: backgroundVisible ? 1 : 0, transform: backgroundVisible ? 'translateY(10%)' : 'translateY(100%)' }}>
              LET'S
            </p>
          </div>
          <div style={{ overflow: overflowVisible ? 'visible' : 'hidden', lineHeight: 1.1 }}>
            <h1
              className="text-white font-tusker whitespace-nowrap text-[12rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] 2xl:text-[21rem] inline-block transition-transform duration-700 ease-out delay-700"
              style={{ opacity: backgroundVisible ? 1 : 0, transform: backgroundVisible ? 'translateY(10%)' : 'translateY(100%)' }}>
              CONNECT
            </h1>
          </div>
        </div>
        <div
          className='absolute bottom-0 right-0 h-[5%] 2xl:w-[65%] xl:w-[58%] md:w-[55%] w-full border-t border-gray-300 flex justify-between items-center p-8 transition-opacity duration-500 ease-out delay-700'
          style={{ opacity: portfolioVisible ? 1 : 0 }}>
          <nav className="flex text-white font-neueMontreal font-medium lg:text-4xl md:text-2xl text-lg leading-4 tracking-normal whitespace-nowrap">
            <a href='mailto:nicolas.dumetz@epitech.eu' className="mr-4 hover:underline cursor-pointer">Mail,</a>
            <a href='https://www.linkedin.com/in/nicolas-dumetz/' className="mr-4 hover:underline cursor-pointer">Linkedin,</a>
            <a href='https://github.com/NicoDumetz' className="mr-2 hover:underline cursor-pointer">Github</a>
          </nav>
          <div
            onClick={() => { setIsModalOpen(true) }}
            className='lg:text-4xl md:text-2xl text-lg font-migra hover:underline cursor-pointer'>
            Credits
          </div>
        </div>
        <div
          className='lg:h-[55%] md:w-1/2 h-[30%] w-full absolute md:right-3 md:bottom-40 md:top-auto md:left-auto top-[10%] left-0 transition-opacity duration-500 ease-out delay-500'
          style={{ opacity: portfolioVisible ? 1 : 0 }}>
          <Scene
            modelPath="/scene/claude/scene.gltf"
            cameraPosition={cameraPositionMonet}
            cameraLookAt={lookAtMonet}
            rotationSpeed={3}
            scaleFactor={200}
            ambientLightIntensity={1}
            ambientLightColor='white'
            rotationLimit={25} />
        </div>
      </div>
    </div>
  )
}
