'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimationConfig } from 'melt-extract/_internal'

export const TransitionAPI = ({ animates }: AnimationConfig) => {
  const [hasClickDelay, setHasClickDelay] = useState(false)
  const [anchor, setAnchor] = useState<HTMLAnchorElement | undefined>(undefined)
  const { styles, times } = animates || {}
  /* ---------- delayed--- */
  useEffect(() => {
    let timerId: NodeJS.Timeout
    const handleClick = (e: MouseEvent) => {
      const targetAnchor = e.target as HTMLAnchorElement
      setAnchor(targetAnchor)
      e.preventDefault()
      timerId = setTimeout(() => {
        setHasClickDelay(true)
      }, (times.going as number) * 1000)
    }

    const clickHandler = (e: MouseEvent) => {
      if (hasClickDelay) return
      handleClick(e)
    }

    const registeredAnchors = new Set<HTMLAnchorElement>()

    function bodyClickHandler(event: MouseEvent) {
      const a = event.target as HTMLAnchorElement
      if (a.tagName !== 'A') return
      if (!registeredAnchors.has(a)) {
        a.addEventListener('click', clickHandler)
        registeredAnchors.add(a)
      }
    }

    document.body.addEventListener('pointerover', bodyClickHandler, true)

    return () => {
      clearTimeout(timerId)
      document.body.removeEventListener('pointerover', bodyClickHandler, true)
      registeredAnchors.forEach(a => {
        a.removeEventListener('click', clickHandler)
      })
    }
  }, [hasClickDelay, times.going])

  useLayoutEffect(() => {
    if (!anchor) return

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    anchor.dispatchEvent(clickEvent)
    console.log('clicked')
    return () => {
      if (hasClickDelay) return
      setAnchor(undefined)
      setHasClickDelay(false)
    }
  }, [anchor, hasClickDelay])

  /* ---------- sync animations--- */
  // exits unmount has going entrys.
  useLayoutEffect(() => {
    if (!anchor) return
    const e = document?.getElementsByClassName(styles.base)[0] as HTMLElement
    if (!e) return
    e.style.transitionDuration = times.going + 's'
    e.className = styles.base + ' ' + styles.going //

    return () => {
      e.removeAttribute('style')
      e.className = styles.base
    }
  }, [anchor, styles.base, styles.going, times.going])

  // initial mount has coming entrys.
  useLayoutEffect(() => {
    if (anchor) return
    const e = document?.getElementsByClassName(styles.base)[0] as HTMLElement // get a universel client dom elmenet
    if (!e) return
    e.style.transitionDuration = times.coming + 's'
    e.className = styles.base + ' ' + styles.coming // respawn to base point.

    const toBase = () => {
      e.className = styles.base
    }
    const animateId = requestAnimationFrame(toBase) // if going entry defined.

    return () => {
      e.removeAttribute('style')
      cancelAnimationFrame(animateId)
    }
  }, [anchor, styles.base, styles.coming, times.coming])

  return null
}
