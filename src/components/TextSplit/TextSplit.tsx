import { useRef, useEffect, CSSProperties, ReactElement } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText as GSAPSplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

type SplitType = "chars" | "words" | "lines"

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: SplitType
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  textAlign?: CSSProperties["textAlign"]
  ready?: boolean
  onLetterAnimationComplete?: () => void
}

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  ready = false,
  onLetterAnimationComplete,
}: SplitTextProps): ReactElement => {
  const ref = useRef<HTMLParagraphElement>(null)
  const animationStarted = useRef(false)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!ref.current || !text || animationStarted.current || !ready)
      return
    animationStarted.current = true
    const el = ref.current
    const isLines = splitType === "lines"
    let splitter: GSAPSplitText
    let targets: HTMLElement[] = []

    if (isLines)
      el.style.position = "relative"
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: isLines,
        linesClass: "split-line",
      })
    } catch (e) {
      console.error("SplitText error:", e)
      return
    }
    if (splitType === "lines")
      targets = splitter.lines as HTMLElement[]
    else if (splitType === "words")
      targets = splitter.words as HTMLElement[]
    else
      targets = splitter.chars as HTMLElement[]
    if (!targets.length) {
      splitter.revert()
      return
    }
    targets.forEach((t) => {
      t.style.willChange = "transform, opacity"
    })
    const startPct = (1 - threshold) * 100
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0
    const marginUnit = marginMatch ? marginMatch[2] || "px" : "px"
    const offset =
      marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`
    const start = `top ${startPct}%${offset}`
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
        once: true,
        onToggle: (self) => {
          scrollTriggerRef.current = self
        },
      },
      onComplete: () => {
        gsap.set(targets, { ...to, clearProps: "willChange", immediateRender: true })
        onLetterAnimationComplete?.()
      },
    })
    tl.set(targets, { ...from, immediateRender: false, force3D: true })
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    })
    return () => {
      tl.kill()
      scrollTriggerRef.current?.kill()
      gsap.killTweensOf(targets)
      splitter.revert()
    }
  }, [ready])
return (
  <p
    ref={ref}
    className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
    style={{
      textAlign,
      wordWrap: "break-word",
      // AJOUTEZ CETTE LIGNE :
      // Le texte est caché si 'ready' est faux, et visible sinon.
      visibility: ready ? 'visible' : 'hidden'
    }}
  >
    {text}
  </p>
)
}

export default SplitText
