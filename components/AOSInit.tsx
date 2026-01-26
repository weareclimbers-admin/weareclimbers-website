'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Durée de l'animation en ms
      once: true, // Animation ne se joue qu'une fois
      offset: 100, // Déclenche l'animation 100px avant que l'élément soit visible
      easing: 'ease-in-out', // Type d'animation
    })
  }, [])

  return null
}
