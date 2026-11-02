'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import { getPrimaryCta, WAITLIST, CAMPAIGN, FLASH_SALE } from '@/lib/campaign'
import { FETES_SALE } from '@/lib/preorder'

/**
 * Barre CTA sticky phase-aware — apparaît en bas d'écran une fois la hero dépassée.
 * Le libellé et la cible suivent la phase active (lib/campaign.ts) :
 *   campaign-success → "Rejoins la liste" (#liste-attente)
 *   precommande-live → "Je précommande" (/boutique)
 *   vente-flash-attente → "Je m'inscris" (/boutique#liste-attente)
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cta = getPrimaryCta()
  const href = cta.href ?? WAITLIST.anchor
  const isFlashWaitlist = CAMPAIGN.phase === 'vente-flash-attente'
  const label = cta.kind !== 'waitlist' ? cta.label : isFlashWaitlist ? 'Je m’inscris' : 'Rejoins la liste'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          <div
            className="flex items-center justify-between gap-4 px-5 py-3 md:px-8"
            style={{
              backgroundColor: 'var(--color-primary-green)',
              borderTop: '2px solid var(--color-secondary-orange)',
              boxShadow: '0 -8px 30px rgba(38,83,53,0.35)',
            }}
          >
            <p
              className="hidden sm:block text-sm md:text-base"
              style={{ fontFamily: 'var(--font-roboto)', color: 'var(--color-primary-beige)' }}
            >
              {CAMPAIGN.phase === 'campaign-success' ? (
                <>
                  <strong style={{ color: 'var(--color-secondary-orange)' }}>Objectif 100 % atteint.</strong>{' '}
                  Les pré-commandes arrivent — sois prévenu·e en premier.
                </>
              ) : isFlashWaitlist ? (
                <>
                  <strong style={{ color: 'var(--color-secondary-orange)' }}>Précommande des fêtes.</strong>{' '}
                  {FETES_SALE.flash.units} bracelets à {FETES_SALE.flash.priceTtc}&nbsp;€, {FLASH_SALE.window}.
                </>
              ) : (
                <>Les pré-commandes sont ouvertes.</>
              )}
            </p>
            <a
              href={href}
              className="flex-shrink-0 px-6 py-2.5 text-sm font-bold uppercase whitespace-nowrap transition-transform hover:scale-[1.04]"
              style={{
                fontFamily: 'var(--font-syne)',
                backgroundColor: 'var(--color-secondary-orange)',
                color: 'var(--color-primary-beige)',
              }}
            >
              {label} →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
