import { ReactElement } from "react"

interface SlideProps {
  title: string
  subtitle: string
  content: string
  marginTop?: string
}

export default function Slide({
  title,
  subtitle,
  content,
  marginTop = "md:mt-8"
}: SlideProps): ReactElement {
  return (
    <div className="h-full w-full flex flex-col items-start justify-end text-white">
      <div className="flex items-start flex-col">
        <h1 className="text-left md:text-[9rem] text-7xl uppercase font-tusker overflow-hidden pt-2">
          {title}
        </h1>
        <p className="text-[#928b73] font-migra font-medium leading-4 tracking-normal whitespace-nowrap md:text-lg text-base">
          {subtitle}
        </p>
      </div>
      <div className={`${marginTop} font-neueMontreal xl:text-4xl lg:text-3xl xs:text-2xl text-xl text-white text-left md:w-9/10 w-full`}>
        {content}
      </div>
    </div>
  )
}
