'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NewsletterForm from '@/components/NewsletterForm'
import BenefitCard from '@/components/BenefitCard'
import TimelineStep from '@/components/TimelineStep'
import FAQItem from '@/components/FAQItem'
import Image from 'next/image'

export default function EarlyAccess() {
  const faqs = [
    {
      id: 'early-1',
      question: "C'est payant de s'inscrire maintenant ?",
      answer: "Non, l'inscription à la newsletter est 100% gratuite. Tu ne payes rien avant le crowdfunding en Mai 2026."
    },
    {
      id: 'early-2',
      question: "Je suis obligé d'acheter pendant le crowdfunding ?",
      answer: "Absolument pas. L'inscription te donne juste l'accès prioritaire et les infos en avant-première. Tu décideras en Mai si ça te correspond."
    },
    {
      id: 'early-3',
      question: "Ça coûte combien ?",
      answer: "Les prix seront annoncés en Avril 2026. Mais les early supporters auront une réduction par rapport au prix public final."
    },
    {
      id: 'early-4',
      question: "L'app fonctionne sans le bracelet ?",
      answer: "Oui ! L'app WAC est utilisable sans bracelet. Le bracelet ajoute l'analyse physiologique (fréquence cardiaque, HRV, sommeil) pour aller plus loin dans la prévention."
    },
    {
      id: 'early-5',
      question: "C'est quoi les dates exactes ?",
      answer: "Lancement crowdfunding prévu en Mai 2026. Les early supporters recevront un email 48h avant le lancement public."
    },
    {
      id: 'early-6',
      question: "Mes données personnelles sont protégées ?",
      answer: "Bien sûr. On est 100% RGPD. Ton email ne sera utilisé QUE pour la newsletter WAC. Zéro spam, zéro revente de données."
    }
  ]

  return (
    <>
      <Header />

      <main className="bg-primary-beige">
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:py-32" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              {/* Badge Early Access */}
              <div className="flex justify-center mb-6" data-aos="fade-up">
                <span
                  className="px-6 py-2 text-sm font-bold uppercase"
                  style={{
                    backgroundColor: 'var(--color-secondary-orange)',
                    color: 'var(--color-primary-beige)',
                    fontFamily: 'var(--font-syne)',
                    display: 'inline-block'
                  }}
                >
                  Early Access
                </span>
              </div>

              {/* Titre principal */}
              <h1
                className="text-4xl md:text-6xl mb-6 text-center"
                style={{ color: 'var(--color-primary-green)' }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Sois parmi les premiers grimpeurs
              </h1>

              {/* Sous-titre */}
              <p
                className="text-lg md:text-xl font-roboto mb-12 text-center max-w-3xl mx-auto"
                style={{ color: 'var(--color-primary-green)' }}
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Le crowdfunding démarre en Mai 2026. Inscris-toi maintenant pour avoir accès aux avantages early supporters et ne rien rater.
              </p>

              {/* Formulaire d'inscription */}
              <div
                className="p-8 md:p-10 shadow-lg max-w-2xl mx-auto"
                style={{ backgroundColor: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <NewsletterForm variant="hero" />
              </div>
            </div>
          </div>
        </section>

        {/* Section Pourquoi s'inscrire */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl mb-12 md:mb-16 text-center"
              style={{ color: 'var(--color-primary-green)' }}
              data-aos="fade-up"
            >
              Pourquoi devenir early supporter ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <BenefitCard
                icon="💰"
                title="Économise sur le bracelet"
                description="Les early supporters auront accès à un tarif exclusif sur le bracelet Polar 360 lors du crowdfunding. Parce que tu nous fais confiance dès le départ."
                delay={0}
              />
              <BenefitCard
                icon="🚀"
                title="Reçois ton bracelet en premier"
                description="Les premières unités produites seront réservées aux supporters du crowdfunding. Grimpe avec WAC avant tout le monde."
                delay={100}
              />
              <BenefitCard
                icon="🤝"
                title="Influence le produit"
                description="Tes retours et suggestions seront pris en compte avant le lancement. Tu ne seras pas juste un client, tu feras partie de l'aventure."
                delay={200}
              />
            </div>
          </div>
        </section>

        {/* Section Timeline */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl mb-12 md:mb-16 text-center"
              style={{ color: 'var(--color-primary-green)' }}
              data-aos="fade-up"
            >
              Le plan d'action
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
              <TimelineStep
                stepNumber={1}
                title="Maintenant"
                items={[
                  "Tu t'inscris à la newsletter",
                  "Tu reçois des updates régulières sur l'avancée du projet"
                ]}
              />
              <TimelineStep
                stepNumber={2}
                title="Mai 2026"
                items={[
                  "Lancement du crowdfunding",
                  "Tu reçois un email prioritaire 48h avant le lancement public",
                  "Tu choisis ton pack early supporter"
                ]}
                isActive={true}
              />
              <TimelineStep
                stepNumber={3}
                title="Après le crowdfunding"
                items={[
                  "Production des bracelets",
                  "Livraison des premières unités (priorité early supporters)",
                  "Tu grimpes avec WAC !"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Section Ce que tu vas recevoir */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl mb-12 text-center"
              style={{ color: 'var(--color-primary-green)' }}
              data-aos="fade-up"
            >
              Ton pack early supporter
            </h2>

            <div className="max-w-3xl mx-auto p-8 md:p-10 shadow-lg" style={{ backgroundColor: 'var(--color-primary-beige)' }} data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg font-roboto mb-6" style={{ color: 'var(--color-primary-green)' }}>
                Détails à venir, mais voici ce qui est prévu :
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Bracelet Polar 360 à tarif réduit",
                  "Accès à vie à l'app WAC (sans abonnement)*",
                  "Livraison prioritaire",
                  "Accès au groupe privé des early supporters",
                  "Ton nom dans les crédits de l'app (optionnel)"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl" style={{ color: 'var(--color-primary-green)' }}>✓</span>
                    <span className="font-roboto text-lg" style={{ color: 'var(--color-primary-green)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-4" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
                <p className="text-sm font-roboto" style={{ color: 'var(--color-primary-green)' }}>
                  *Les détails exacts des packs seront annoncés en Avril 2026. On te tiendra informé par email.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignage Julien */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-secondary-beige-light)' }}>
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center">
                {/* Photo */}
                <div className="md:col-span-2" data-aos="fade-right">
                  <div className="relative aspect-square max-w-sm mx-auto">
                    <Image
                      src="/photo-julien.png"
                      alt="Julien, fondateur de We Are Climbers"
                      fill
                      className="object-cover shadow-lg"
                    />
                  </div>
                </div>

                {/* Citation */}
                <div className="md:col-span-3" data-aos="fade-left">
                  <blockquote className="space-y-6">
                    <p
                      className="text-xl md:text-2xl font-roboto italic leading-relaxed"
                      style={{ color: 'var(--color-primary-green)' }}
                    >
                      "Je ne crée pas WAC pour lever des millions. Je la crée parce que j'aurais voulu l'avoir quand je plafonnais avec mes tendinites. Si tu te reconnais dans cette galère, rejoins-nous. On va grimper mieux, plus longtemps."
                    </p>
                    <footer>
                      <p className="font-roboto font-bold" style={{ color: 'var(--color-primary-green)' }}>
                        — Julien, fondateur WAC
                      </p>
                    </footer>
                  </blockquote>

                  <div className="mt-8">
                    <a href="/histoire" className="text-secondary-orange font-roboto hover:underline text-lg">
                      Découvre toute l'histoire →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="py-20 md:py-32">
          <div className="container-custom">
            <h2
              className="text-3xl md:text-5xl mb-12 text-center"
              style={{ color: 'var(--color-primary-green)' }}
              data-aos="fade-up"
            >
              Questions fréquentes
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  item={faq}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-primary-green)' }}>
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="text-3xl md:text-5xl mb-6"
                style={{ color: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
              >
                Prêt à rejoindre le mouvement ?
              </h2>

              <p
                className="text-lg md:text-xl font-roboto mb-10"
                style={{ color: 'var(--color-primary-beige)' }}
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Inscris-toi en 10 secondes. On se retrouve en Mai pour grimper ensemble.
              </p>

              <div data-aos="fade-up" data-aos-delay="200">
                <NewsletterForm variant="footer" buttonText="Je m'inscris" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
