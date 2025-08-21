import { useEffect, useState, useRef } from "react"
import { motion, PanInfo, useMotionValue, useTransform, Transition, animate } from "framer-motion"

// ... (Interface CarouselProps reste la même)
export interface CarouselProps {
  items: React.ReactNode[]
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
  index?: number
  onIndexChange?: (i: number) => void
}


const VELOCITY_THRESHOLD = 500
const GAP = 16
const DOTS_HEIGHT = 40

const SMOOTH_TRANSITION: Transition = {
  type: "spring",
  mass: 1,
  stiffness: 80,
  damping: 25,
  restDelta: 0.001
}

export default function Carousel({
  items,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  index,
  onIndexChange
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0)
  const currentIndex = index !== undefined ? index : internalIndex
  const x = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const measureWidth = () => setSlideWidth(container.clientWidth)
      measureWidth()
      window.addEventListener("resize", measureWidth)
      return () => window.removeEventListener("resize", measureWidth)
    }
  }, [])

  const setIndex = (i: number) => {
    if (onIndexChange) onIndexChange(i)
    else setInternalIndex(i)
  }

  const getSlideX = (i: number) => {
    if (slideWidth === 0) return 0
    return -(slideWidth + GAP) * i
  }

  useEffect(() => {
    const animation = animate(x, getSlideX(currentIndex), SMOOTH_TRANSITION)
    return () => animation.stop()
  }, [currentIndex, slideWidth, x])

  // ... (Les autres useEffect ne changent pas)
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const el = containerRef.current
      const enter = () => setIsHovered(true)
      const leave = () => setIsHovered(false)
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        const next = currentIndex === items.length - 1 ? (loop ? 0 : currentIndex) : currentIndex + 1;
        setIndex(next);
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, currentIndex, items.length]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    if (Math.abs(velocity) > VELOCITY_THRESHOLD || Math.abs(offset) > slideWidth / 2) {
      const direction = velocity < 0 || offset < 0 ? 1 : -1
      if (direction === 1) {
        setIndex(loop && currentIndex === items.length - 1 ? 0 : Math.min(currentIndex + 1, items.length - 1))
      } else {
        setIndex(loop && currentIndex === 0 ? items.length - 1 : Math.max(currentIndex - 1, 0))
      }
    } else {
      animate(x, getSlideX(currentIndex), SMOOTH_TRANSITION)
    }
  }
  const trackWidth = slideWidth > 0 ? (items.length * slideWidth) + ((items.length - 1) * GAP) : 0;
  const dragConstraints = !loop && {
    left: -trackWidth + slideWidth,
    right: 0
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-full select-none">
      <motion.div
        className="flex"
        drag="x"
        onDragEnd={handleDragEnd}
        dragConstraints={dragConstraints}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
        style={{
          height: `calc(100% - ${DOTS_HEIGHT}px)`,
          width: trackWidth,
          x,
          perspective: 1000,
          transformStyle: "preserve-3d"
        }}
      >
         {items.map((item, i) => {
          const singleSlideTotalWidth = slideWidth + GAP
          const range = [-(i + 1) * singleSlideTotalWidth, -i * singleSlideTotalWidth, -(i - 1) * singleSlideTotalWidth]
          const outputRange = [60, 0, -60]
          const rotateY = useTransform(x, range, outputRange)

          return (
            <motion.div
              key={i}
              className={`relative shrink-0 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center ${
                round
                  ? "text-center bg-[#060010] border-0"
                  : "rounded-xl"
              }`}
              style={{
                width: slideWidth,
                height: '100%',
                marginRight: i === items.length - 1 ? 0 : `${GAP}px`,
                rotateY,
                transformOrigin: "center center",
                ...(round && { borderRadius: "50%" })
              }}
            >
              {item}
            </motion.div>
          )
        })}
      </motion.div>
      <div className="absolute bottom-0 h-[40px] flex w-full justify-center items-center">
        <div className="flex gap-4 p-2 rounded-full bg-black/10">
          {items.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-4 w-4 rounded-full cursor-pointer transition-all duration-300 ${ currentIndex === i ? "bg-gray-500" : "bg-white"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}