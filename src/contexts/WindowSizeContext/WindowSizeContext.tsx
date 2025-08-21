import { createContext, useState, useEffect, useContext } from "react"
import type { PropsWithChildren } from "react"

export interface IWindowSize {
    width: number
    height: number
}

const WindowSizeContext = createContext<IWindowSize | undefined>(undefined)

export function WindowSizeProvider({ children }: PropsWithChildren) {
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: window.innerWidth,
        height: window.innerHeight
    })

    const handleResize = () => setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    )
}

export function useWindowSize() {
    const context = useContext(WindowSizeContext)
    if (!context)
        throw new Error("useWindowSize must be used within a WindowSizeProvider")
    return context
}
