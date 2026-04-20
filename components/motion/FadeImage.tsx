"use client"

import Image, { type ImageProps } from "next/image"
import { m } from "framer-motion"
import { useState } from "react"

export function FadeImage({ alt = "", ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="h-full w-full"
    >
      <Image alt={alt} {...rest} onLoad={() => setLoaded(true)} />
    </m.div>
  )
}
