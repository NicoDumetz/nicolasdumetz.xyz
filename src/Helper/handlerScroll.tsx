import { IMAGE_HEIGHT_VH } from '../view/Home/home'

export function handleScroll(
  pinContainerRef: React.RefObject<HTMLDivElement | null>,
  fixedPosition: 'top' | 'bottom' | null,
  setFixedPosition: React.Dispatch<React.SetStateAction<'top' | 'bottom' | null>>,
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>,
  setScrollProgress: React.Dispatch<React.SetStateAction<number>>
) {
  if (!pinContainerRef.current)
    return
  const scrollTop = window.scrollY
  const containerTop = pinContainerRef.current.offsetTop
  const viewportHeight = window.innerHeight
  const imageHeightPx = (Number(IMAGE_HEIGHT_VH) / 100) * viewportHeight
  const fixedThreshold = containerTop + imageHeightPx - viewportHeight
  if (scrollTop === 0 && fixedPosition !== 'top')
    setFixedPosition('top')
  else if (scrollTop >= fixedThreshold && fixedPosition !== 'bottom')
    setFixedPosition('bottom')
  else if (scrollTop > 0 && scrollTop < fixedThreshold && fixedPosition !== null)
    setFixedPosition(null)
  setIsScrolled(scrollTop > 0)
  const docHeight = document.documentElement.scrollHeight - viewportHeight
  setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
}