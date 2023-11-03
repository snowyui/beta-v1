'use client'

import { useLayoutEffect, useState, useCallback, useRef } from 'react'

interface AnimateStyles {
  base: string
  exit?: string
  initial?: string
  viewing?: string
  time?: number
}

type animates = {
  animates: AnimateStyles
}

let anchor: HTMLAnchorElement | null
let cleanupDom: HTMLElement | null
const useCapture = true

export const TransitionAPI = ({ animates }: animates) => {
  const ref = useRef(animates)
  const [hasDelay, setHasDelay] = useState(false)
  // get a universel client dom elmenet
  const getClientDom = () => {
    return document.getElementsByClassName(ref.current.base)[0] as HTMLElement
  }

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      const dom = getClientDom()
      const target = e.target as HTMLElement
      const anchorElement = target.closest('a') as HTMLAnchorElement
      if (anchorElement && window.location.href !== anchorElement.href) {
        anchor = anchorElement
        cleanupDom = dom
        dom.className = ref.current.base + ' ' + ref.current.exit
        e.preventDefault()
        setTimeout(() => {
          setHasDelay(true)
        }, ((animates.time as number) || 0) * 1000)
      }
    },
    [animates.time]
  )

  const innerEffect = useCallback(() => {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    if (!hasDelay) return
    if (!(anchor instanceof HTMLAnchorElement)) return
    anchor.dispatchEvent(clickEvent)
    anchor = null
  }, [hasDelay])

  useLayoutEffect(() => {
    if (!ref.current.exit) return
    innerEffect()
    const cleanup = ref.current.base

    document.body.addEventListener('click', clickHandler, useCapture)
    return () => {
      document.body.removeEventListener('click', clickHandler, useCapture)
      if (!cleanupDom) return
      cleanupDom.className = cleanup
      cleanupDom = null
    }
  }, [clickHandler, innerEffect])

  useLayoutEffect(() => {
    if (!ref.current.initial) return
    const dom = getClientDom()
    dom.className = ref.current.base + ' ' + ref.current.initial // respawn to base point and // first cleanup.
    const animateId = requestAnimationFrame(() => {
      dom.className = ref.current.base
    })

    return () => {
      cancelAnimationFrame(animateId)
    }
  }, [])

  return null
}
