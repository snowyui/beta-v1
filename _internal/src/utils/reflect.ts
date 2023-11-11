import { useCallback, useLayoutEffect, useRef, useState } from 'react'

let anchor: HTMLAnchorElement | null
let cleanupDom: HTMLElement | null

const useCapture = true

const reflect = (classes: [string, string, string?], exit?: number) => {
  const ref = useRef(classes)
  const [hasDelay, setHasDelay] = useState(false)

  const getClientClassElement = useCallback(() => {
    const oneClassElement = document.getElementsByClassName(ref.current[0])[0]
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

      const anchorElement = target.closest('a')
      if (anchorElement == null) return
      if (window.location.href === anchorElement.href) return

      const classElement = getClientClassElement()
      if (classElement == null) return

      classElement.className = ref.current[0] + ' ' + ref.current[2]
      e.preventDefault()
      if (typeof exit != 'undefined')
        setTimeout(() => {
          setHasDelay(true)
        }, exit * 1000)
      anchor = anchorElement
      cleanupDom = classElement
    },
    [exit, getClientClassElement]
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

  // ---------- Exits styles. entry the class third of array //
  useLayoutEffect(() => {
    innerEffect()
    const cleanup = ref.current[0]
    document.body.addEventListener('click', clickHandler, useCapture)

    return () => {
      document.body.removeEventListener('click', clickHandler, useCapture)
      if (cleanupDom == null) return
      cleanupDom.className = cleanup
      cleanupDom = null
    }
  }, [clickHandler, innerEffect])

  // ---------- Initial styles. entry the class second of array //
  useLayoutEffect(() => {
    const classElement = getClientClassElement()
    if (classElement == null) return

    classElement.className = ref.current[0] + ' ' + ref.current[1] // respawn to base point.
    const animateId = requestAnimationFrame(() => {
      classElement.className = ref.current[0]
    })

    return () => {
      cancelAnimationFrame(animateId)
    }
  }, [getClientClassElement])

  return ref.current[0]
}
export default reflect
