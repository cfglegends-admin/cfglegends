"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

export function FadeImage({ alt = "", className, style, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="h-full w-full"
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      <Image alt={alt} className={className} {...rest} onLoad={() => setLoaded(true)} />
    </div>
  )
}
