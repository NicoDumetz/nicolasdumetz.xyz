import SplitText from '../../components/TextSplit/TextSplit'
import Button from '../../components/Button/Button'

interface HeaderProps {
  portfolioVisible: boolean
  overflowVisible: boolean
  showText: boolean
  setIsNowTextHovered: (isHovered: boolean) => void;
}

export default function Header(
  {
    portfolioVisible,
    overflowVisible,
    showText,
    setIsNowTextHovered
  }: HeaderProps
) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen text-9xl flex flex-row p-4">
      <div className="absolute bottom-[40%] md:bottom-0 left-0 px-8 z-10 flex flex-col items-start">
        <span
          className="text-white font-migra uppercase text-base sm:text-lg md:text-xl lg:text-2xl leading-none -mb-2 md:-mb-4 lg:-mb-8 transition-opacity duration-500 ease-out delay-500"
          style={{ opacity: portfolioVisible ? 1 : 0 }}>
          portfolio
        </span>
        <div
          className="flex items-end gap-1"
          style={{ overflow: overflowVisible ? 'visible' : 'hidden', lineHeight: 1.1 }}>
          <p
            className="text-white font-tusker whitespace-nowrap text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] inline-block transition-transform duration-700 ease-out delay-700"
            style={{ opacity: showText ? 1 : 0, transform: showText ? 'translateY(10%)' : 'translateY(100%)' }}>
            STUDENT
          </p>
          <span
            className="text-white font-migra whitespace-nowrap text-[1rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[4rem] inline-block leading-none md:-mb-2 delay-500 transition-opacity duration-500 ease-out"
            style={{ opacity: portfolioVisible ? 1 : 0, transform: 'scaleX(1.2)' }}>
            &
          </span>
        </div>
        <div
          style={{ overflow: overflowVisible ? 'visible' : 'hidden', lineHeight: 1.1 }}>
          <h1
            className="text-white font-tusker whitespace-nowrap text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[18rem] inline-block transition-transform duration-700 ease-out delay-700"
            style={{ opacity: showText ? 1 : 0, transform: showText ? 'translateY(5%)' : 'translateY(100%)' }}>
            DEVELOPER
          </h1>
        </div>
      </div>
      <div
        onMouseEnter={() => {setIsNowTextHovered(true)}}
        onMouseLeave={() => setIsNowTextHovered(false)}
        className="absolute bottom-[80%] md:bottom-[70%] right-[10%] md:right-[20%] xl:right-[25%] z-40 flex flex-row text-white font-zuecos text-9xl items-center gap-2 delay-500 duration-500 ease-out transition-opacity cursor-default"
        style={{ opacity: portfolioVisible ? 1 : 0, transform: 'scaleX(1.2)' }}>
        <div className="text-6xl md:text-9xl leading-none -tracking-widest">
          NOW
        </div>
        <div className="flex flex-col items-start text-base leading-tight font-neueMontreal uppercase">
          <span>available</span>
          <span>to work</span>
        </div>
      </div>
      <div
        className={`absolute bottom-14 md:bottom-8 right-8 z-40 transition-opacity duration-500 ease-in-out ${showText ? 'opacity-100 delay-700' : 'opacity-0'}`}
        style={{ pointerEvents: showText ? 'auto' : 'none' }}>
        <Button
          text="Contact Me"
          className="text-xl md:text-4xl"
           onClick={() => {
            window.location.href = "mailto:nicolas.dumetz@epitech.eu?subject=Inquiry%20from%20Portfolio";
          }}
        />
      </div>
      <div
        className={`absolute bottom-32 md:bottom-32 right-12 z-40 text-white font-neueMontreal max-w-xs md:max-w-xs lg:max-w-md xl:max-w-xl transition-opacity duration-500 ease-in-out ${showText ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-6'}`}
        style={{ pointerEvents: showText ? 'auto' : 'none', transitionProperty: 'opacity, transform' }}>
        <div className="flex flex-col">
          <SplitText
            text="I'm a student developer"
            className="text-right text-base md:text-xl lg:text-2xl xl:text-4xl uppercase"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="right"
            ready={showText}
          />
          <SplitText
            text="at Epitech Lille. I am passionate about AI and embedded programming. I am open to freelancing opportunities in these fields or in web development."
            className="text-left text-base md:text-xl lg:text-2xl xl:text-4xl uppercase"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
            ready={showText}
          />
        </div>
      </div>
    </div>
  )
}
