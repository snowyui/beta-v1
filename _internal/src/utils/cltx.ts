import { useLayoutEffect, useState } from 'react'

let anchor: HTMLAnchorElement | null
const useCapture = true
const cltx = (classes: [string, string, string?], exit?: number) => {
  const [merged, setMerged] = useState('')
  const [hasDelay, setHasDelay] = useState(false)

  // ---------- Entrypoint Effect//
  useLayoutEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      const anchorElement = target.closest('a') as HTMLAnchorElement
      anchor = anchorElement
      if (anchorElement) {
        setMerged(classes[0] + ' ' + classes[2])
        e.preventDefault()
        setTimeout(() => {
          setHasDelay(true)
        }, (exit as number) * 1000)
      }
    }
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })

    function innerEffect() {
      if (!hasDelay) return
      const AnchorElement = anchor as HTMLAnchorElement
      AnchorElement.dispatchEvent(clickEvent)
      setHasDelay(false)
      anchor = null
    }

    innerEffect()
    document.body.addEventListener('click', clickHandler, useCapture)
    return () => {
      document.body.removeEventListener('click', clickHandler, useCapture)
    }
  }, [classes, exit, hasDelay])

  useLayoutEffect(() => {
    setMerged(classes[0] + ' ' + classes[1])
    return () => {
      setMerged(classes[0])
    }
  }, [classes])

  return merged
}
export default cltx
