import type { ReactNode } from 'react'
import React from 'react'

interface TooltipProps {
  children: ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right' // controlado
  className?: string
  textClass?: string
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top',
  textClass
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const tooltipPosition = positionClasses[position]

  return (
    <div className='group relative inline-block w-fit'>
      {children}
      <span
        className={`tooltipText invisible absolute z-10 whitespace-nowrap rounded-xl bg-[#0D2666] 
        p-2 px-4 text-xs font-normal text-white shadow-md transition group-hover:visible 
        ${tooltipPosition} ${textClass}`}
      >
        {text}
      </span>
    </div>
  )
}

export default Tooltip
