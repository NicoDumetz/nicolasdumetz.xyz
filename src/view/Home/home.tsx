import { useState, useEffect, useRef } from 'react'
import NavBar from '../../components/Nav/Nav'
import Header from '../Header/Header'
import { handleScroll } from '../../Helper/handlerScroll'
import SideModal from '../../components/SideModal/SideModal'
import About from '../About/About'
import Contact from '../Contact/Contact'
import Project from '../Project/Project'

export const IMAGE_HEIGHT_VH = 120
export const CONTAINER_HEIGHT_VH = IMAGE_HEIGHT_VH + 100
export const TRANSITION_DURATION = 700
export const BACKGROUND_DELAY = 500

export default function Home() {
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const grayBgRef = useRef<HTMLDivElement>(null)
  const [fixedPosition, setFixedPosition] = useState<'top' | 'bottom' | null>('top')
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const [portfolioVisible, setPortfolioVisible] = useState(false)
  const [overflowVisible, setOverflowVisible] = useState(false)
  const [grayBgOpacity, setGrayBgOpacity] = useState(0)
  const [isNowTextHovered, setIsNowTextHovered] = useState(false);
  const [initialAnimationDone, setInitialAnimationDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFixed = fixedPosition !== null
  const animationStyle = {
    opacity: backgroundVisible ? 1 : 0,
    transform: backgroundVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
    transition: `opacity ${TRANSITION_DURATION}ms ease-out, transform ${TRANSITION_DURATION}ms ease-out`,
    transitionDelay: `${BACKGROUND_DELAY}ms`
  }

  const handleScrollEvent = () => {
    handleScroll(pinContainerRef, fixedPosition, setFixedPosition, setIsScrolled, setScrollProgress)
    if (!grayBgRef.current)
      return
    const sectionTop = grayBgRef.current.offsetTop
    const sectionHeight = grayBgRef.current.offsetHeight
    const sectionBottom = sectionTop + sectionHeight
    const scrollMid = window.scrollY + window.innerHeight / 2
    let opacity = 0
    if (scrollMid >= sectionTop && scrollMid <= sectionBottom) {
      const progress = (scrollMid - sectionTop) / sectionHeight
      if (progress <= 0.25) {
        opacity = progress / 0.25
      } else if (progress >= 0.75) {
        opacity = (1 - progress) / 0.25
      } else {
        opacity = 1
      }
    }
    if (opacity < 0)
      opacity = 0
    if (opacity > 1)
      opacity = 1
    setGrayBgOpacity(opacity)
  }

  useEffect(() => {
    const bgTimer = setTimeout(() => setBackgroundVisible(true), BACKGROUND_DELAY)
    const portfolioTimer = setTimeout(() => setPortfolioVisible(true), BACKGROUND_DELAY + TRANSITION_DURATION)
    const overflowTimer = setTimeout(() => setOverflowVisible(true), BACKGROUND_DELAY + TRANSITION_DURATION * 2)
    return () => {
      clearTimeout(bgTimer)
      clearTimeout(portfolioTimer)
      clearTimeout(overflowTimer)
    }
  }, [])

  useEffect(() => {
    const totalAnimationTime = BACKGROUND_DELAY + TRANSITION_DURATION
    const timer = setTimeout(() => setInitialAnimationDone(true), totalAnimationTime)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent, { passive: true })
    handleScrollEvent()
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [fixedPosition])


  return (
    <>
      <NavBar isScrolled={isScrolled} scrollProgress={scrollProgress} />
      <main id='home' className="relative">
        <div
          ref={pinContainerRef}
          className="relative overflow-visible"
          style={{ height: `${CONTAINER_HEIGHT_VH}vh` }}>
          <img id='bg' src="monet2.jpg" alt="Background" draggable={false}
            className={`w-full object-cover z-0 ${isFixed ? 'fixed left-0' : 'relative'}`}
            style={{
              height: `${IMAGE_HEIGHT_VH}vh`,
              top: fixedPosition === 'top' ? 0 : undefined,
              bottom: fixedPosition === 'bottom' ? 0 : undefined,
              opacity: isFixed ? animationStyle.opacity : 1,
              transform: isFixed ? animationStyle.transform : 'none',
              transition: `
                opacity ${TRANSITION_DURATION}ms ease-out,
                transform ${TRANSITION_DURATION}ms ease-out,
                clip-path 0.7s cubic-bezier(0.25, 1, 0.5, 1)
              `,
              transitionDelay: (isFixed && !initialAnimationDone) ? `${BACKGROUND_DELAY}ms` : '0ms',
              clipPath: isNowTextHovered
                ? 'polygon(50% 10%, 60% 45%, 50% 80%, 40% 45%)'
                : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}/>
          <div
            className={`w-full bg-black/30 z-10 pointer-events-none ${isFixed ? 'fixed left-0' : 'absolute top-0 left-0'}`}
            style={{
              height: `${IMAGE_HEIGHT_VH}vh`,
              top: fixedPosition === 'top' ? 0 : undefined,
              bottom: fixedPosition === 'bottom' ? 0 : undefined,
              ...(isFixed ? animationStyle : {})
            }}/>
          <Header
            setIsNowTextHovered={setIsNowTextHovered}
            portfolioVisible={portfolioVisible}
            overflowVisible={overflowVisible}
            showText={backgroundVisible}
          />
          <div id='about' className="absolute top-[100vh] left-0 w-screen h-[200vh]" ref={grayBgRef}>
            <div
                className="fixed inset-0 bg-gray-900 pointer-events-none"
                style={{ opacity: grayBgOpacity > 0.6 ? 1 : grayBgOpacity, transition: 'opacity 0.2s linear', zIndex: 20 }}
              />
            <About
              portfolioVisible={portfolioVisible}
              backgroundVisible={backgroundVisible}
              grayBgOpacity={grayBgOpacity}
            />
            <Project/>
            <Contact
              portfolioVisible={portfolioVisible}
              backgroundVisible={backgroundVisible}
              overflowVisible={overflowVisible}
              setIsModalOpen={setIsModalOpen}
            />
              <SideModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Crédits">
                <div className='h-full w-full flex flex-col justify-between'>
                  <ul className="space-y-4">
                    <li className="text-xl hover:underline"><a href="https://wallpaper-house.com/wallpaper-id-460820.php">Promenade sur la falaise, Monet</a></li>
                    <li className="text-xl hover:underline"><a href="https://sketchfab.com/3d-models/david-head-39a4d01bef37495cac8d8f0009728871">David Head, Michel Ange</a></li>
                    <li className="text-xl hover:underline"><a href="https://sketchfab.com/3d-models/deco-cadre-la-gare-st-lazare-monet-cbe9a141ffa74b199d855ce58f9cda42">La Gare St Lazare, Monet</a></li>
                    <li className="text-xl hover:underline"><a href="https://reactbits.dev/">Some components, React Bits</a></li>
                    <li className="text-xl">Font <a className="hover:underline" href="https://globalfonts.pro/font/tusker-grotesk#google_vignette">Tusker</a>, <a className="hover:underline" href="https://www.behance.net/gallery/101509235/Migra-Free-Font?locale=fr_FR#">Migra</a>, <a className="hover:underline" href="https://befonts.com/neue-montreal-font-family.html#google_vignette">NeueMontreal</a></li>
                    <li className="text-xl hover:underline"><a href="https://threejs.org/">3D Modele, Three JS</a></li>
                    <li className="text-xl">Animation, <a className="hover:underline" href="https://gsap.com/">GSAP</a>, <a className="hover:underline" href="https://motion.dev/">Motion</a></li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="text-xl">Inspired by <a className='underline' href="https://bepatrickdavid.com/">Patrick David</a>
                    </li>
                </ul>
              </div>
            </SideModal>
          </div>
        </div>
      </main>
    </>
  )
}
