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

  const getClientClassElement = useCallback(() => {
    const oneClassElement = document.getElementsByClassName(ref.current.base)[0]
    if (oneClassElement instanceof HTMLElement) return oneClassElement
    else return null
  }, [])

  const eventTargetHTMLElement = (e: MouseEvent) => {
    const clickTarget = e.target
    if (clickTarget instanceof HTMLElement) return clickTarget
    else return null
  }

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      const target = eventTargetHTMLElement(e)
      if (target == null) return

      const anchorElement = target.closest('a') as HTMLAnchorElement
      if (anchorElement && window.location.href !== anchorElement.href) {
        anchor = anchorElement
        const classElement = getClientClassElement()
        if (classElement == null) return

        classElement.className = ref.current.base + ' ' + ref.current.exit
        e.preventDefault()
        if (typeof animates.time == 'undefined') return
        setTimeout(() => {
          setHasDelay(true)
        }, animates.time * 1000)
        cleanupDom = classElement
      }
    },
    [animates.time, getClientClassElement]
  )

  const innerEffect = useCallback(() => {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    if (!hasDelay) return
    if (anchor == null) return

    anchor.dispatchEvent(clickEvent)
    anchor = null
  }, [hasDelay])

  useLayoutEffect(() => {
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
    const classElement = getClientClassElement()
    if (classElement == null) return

    classElement.className = ref.current.base + ' ' + ref.current.initial // respawn to base point.
    const animateId = requestAnimationFrame(() => {
      classElement.className = ref.current.base
    })

    return () => {
      cancelAnimationFrame(animateId)
    }
  }, [getClientClassElement])

  return null
}
