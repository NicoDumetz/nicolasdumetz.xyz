import { ReactElement, useState } from "react"
import Slide from "../../components/Slide/Slide"
import Carousel from "../../components/Carousel/Carousel"

const slideText: ReactElement[] = [
  <Slide
    title="Robocar"
    subtitle="by Epitech"
    content="As winners of EPITECH's national Robocar competition, we earned the title of 2025 French Champions. Our project involved making a remote-controlled car fully autonomous by developing and integrating our own hardware components and AI. In addition to our victory on the racetrack, we also won the award for the most efficient AI in a simulation."
    marginTop="md:mt-16"
  />,
  <Slide
    title="RPG"
    subtitle="Made in C with CSFML"
    content="You play the role of a recruit who has lost everything after being unjustly banished from his castle. Stripped of his happiness, his home and his position, he finds himself on an empty plain with a house you can see in the distance. As he navigates this new reality, he must help the villagers while facing the dangers that lurk in the shadows."
    marginTop="md:mt-8"
  />,
  <Slide
    title="Raytracer"
    subtitle="Made in CPP with SFML"
    content="Raytracer is a project that took my group and me a month to complete. It was developed to render realistic 3D scenes by simulating the physical behavior of light using ray tracing. This involves a great deal of mathematics, including applied mathematics."
    marginTop="md:mt-8"
  />
]

interface ProjectProps {}

export default function Project({}: ProjectProps) {
  const [isTextVisible, setIsTextVisible] = useState(true)
  const [displayedIndex, setDisplayedIndex] = useState(0)

  const handleIndexChange = (newIndex: number) => {
    if (newIndex === displayedIndex)
        return
    setIsTextVisible(false)
    setTimeout(() => {
      setDisplayedIndex(newIndex)
      setIsTextVisible(true)
    }, 1000)
  }

  return (
    <div id="project" className="h-screen w-full z-40 relative mt-14 p-8 flex md:flex-row flex-col justify-end items-center">
      <div className="md:h-3/4 h-1/2 md:w-1/2 w-full mb-20">
        <div
          className={`
            transition-all duration-[1000ms] ease-in-out h-full w-full
            ${isTextVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
          `}>
          {slideText[displayedIndex]}
        </div>
      </div>
      <div className="md:h-3/4 md:w-1/2 h-1/2 w-full">
        <Carousel
          round={false}
          autoplay={true}
          loop={true}
          autoplayDelay={5000}
          pauseOnHover={true}
          items={[
            <div
              onClick={() =>
                (window.location.href =
                  "https://github.com/Small-Bytes-Corporation/SBC-Robocar-IA-Prod")
              }
              className="relative w-full h-full group overflow-hidden ">
              <img
                src="projet/robome.png"
                draggable="false"
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  opacity-100 group-hover:opacity-0
                "/>
              <video
                src="projet/robo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  opacity-0 group-hover:opacity-100
                "
              />
            </div>,
            <div
              onClick={() =>
                (window.location.href = "https://github.com/NicoDumetz/My_RPG")
              }
              className="relative w-full h-full group overflow-hidden">
              <img
                src="projet/rpgphoto.png"
                draggable="false"
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  opacity-100 group-hover:opacity-0
                "
              />
              <video
                src="projet/rpg.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  opacity-0 group-hover:opacity-100
                "/>
            </div>,
            <div
              onClick={() =>
                (window.location.href = "https://github.com/NicoDumetz/Raytracer")
              }
              className="relative w-full h-full group overflow-hidden">
              <img
                src="projet/raytracerbox.png"
                draggable="false"
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  opacity-100 group-hover:opacity-0
                "/>
              <img
                src="projet/output_fractal.png"
                draggable="false"
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  opacity-0 group-hover:opacity-100
                "/>
            </div>
          ]}
          index={displayedIndex}
          onIndexChange={handleIndexChange}/>
      </div>
    </div>
  )
}
