import React from 'react'

interface TitleComponentProps {
  children: React.ReactNode
  title?: string
  description?: string
}
const TitleComponent: React.FC<TitleComponentProps> = ({ children, title, description }) => {
  return (
    <div className="w-full h-full my-10">
      <div className="flex flex-col gap-5">
        <div className="w-[90%] md:w-[50%] m-auto flex flex-col gap-3">
          <h3 className="text-4xl text-center font-semibold">{title}</h3>
          <p className="text-zinc-600 text-sm text-center">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default TitleComponent
