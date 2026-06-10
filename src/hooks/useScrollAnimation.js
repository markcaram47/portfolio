import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    )

    const observeAnimations = () => {
      const elements = ref.current.querySelectorAll(
        '.fade-in-up:not(.visible), .fade-in-left:not(.visible), .fade-in-right:not(.visible)'
      )
      elements.forEach((el) => observer.observe(el))
    }

    observeAnimations()

    const mutationObserver = new MutationObserver(observeAnimations)
    mutationObserver.observe(ref.current, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return ref
}
