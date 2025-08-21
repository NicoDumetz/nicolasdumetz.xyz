import { useEffect, useState } from 'react'

export default function NavBar({
    isScrolled,
    scrollProgress
}: {
    isScrolled: boolean;
    scrollProgress: number
}) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 700)
        return () => clearTimeout(timeout)
    }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href')?.substring(1);
      if (!targetId)
        return;
      const targetElement = document.getElementById(targetId);
      if (!targetElement)
        return;
      const navbarHeight = 50;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1500;
      let startTime: number | null = null;
      const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const animation = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easedProgress = easeInOutQuad(progress);
          window.scrollTo(0, startPosition + distance * easedProgress);
          if (timeElapsed < duration) {
              requestAnimationFrame(animation);
          }
      };
      requestAnimationFrame(animation);
  };
    return (
        <div className={`fixed top-0 left-0 w-full h-16 flex flex-col px-8 z-50 transition-all duration-300 delay-700 ${isScrolled ? 'bg-opacity-60 backdrop-blur-sm' : 'bg-opacity-100'}`}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-100%)',
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.5s',
                transitionTimingFunction: 'ease-out',
            }}>
            <div className="flex justify-between items-center w-full h-full">
                <div className="flex flex-col md:flex-row items-start md:items-center md:gap-6">
                    <a href="google.com" className="text-white font-migra font-medium text-base leading-4 tracking-normal whitespace-nowrap">Nicolas Dumetz</a>
                    <span className="text-white font-neueMontreal tracking-wide uppercase md:text-base text-xs">Developer free-lance</span>
                </div>
                <nav className="flex text-white font-neueMontreal font-medium text-base leading-4 tracking-normal whitespace-nowrap">
                    <a href="#home" onClick={handleClick} className="mr-2 hover:underline">Home,</a>
                    <a href="#about" onClick={handleClick} className="mr-2 hover:underline">About,</a>
                    <a href="#project" onClick={handleClick} className="mr-2 hover:underline">Project,</a>
                    <a href="#contact" onClick={handleClick} className="hover:underline">Contact</a>
                </nav>
            </div>
            <div className="relative w-full h-[2px] bg-gray-400 overflow-hidden">
                <div className="h-full bg-white transition-all duration-200" style={{ width: `${scrollProgress * 100}%` }} />
            </div>
        </div>
    )
}