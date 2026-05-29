import type { LegalDocument } from '@/lib/legal/types'

interface LegalDocumentRendererProps {
  doc: LegalDocument
}

function formatFrenchDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function LegalDocumentRenderer({ doc }: LegalDocumentRendererProps) {
  const formattedDate = formatFrenchDate(doc.lastUpdated)

  return (
    <main className="bg-primary-beige">
      {/* Hero */}
      <section className="pt-32 pb-12 md:py-32 bg-primary-green text-primary-beige">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl mb-6 font-syne">{doc.title}</h1>
            {doc.subtitle && (
              <p className="text-lg md:text-xl font-roboto opacity-90">{doc.subtitle}</p>
            )}
            <p className="text-sm font-roboto opacity-75 mt-4">
              Dernière mise à jour : {formattedDate} — Version {doc.version}
            </p>
          </div>
        </div>
      </section>

      {/* Metadata bar */}
      <section className="py-6 bg-secondary-beige-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-2 font-roboto text-primary-green text-sm">
            <div>
              <span className="font-bold">Version :</span> {doc.version}
            </div>
            <div>
              <span className="font-bold">Dernière mise à jour :</span> {formattedDate}
            </div>
          </div>
        </div>
      </section>

      {/* Preamble */}
      {doc.preamble && (
        <section className="py-12 bg-primary-beige">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="p-6 md:p-8 bg-secondary-beige-light border-l-4 border-secondary-orange">
              <p className="font-roboto text-primary-green whitespace-pre-wrap leading-relaxed">
                {doc.preamble}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Table of contents */}
      <section className="py-8 bg-primary-beige">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="p-6 md:p-8 bg-secondary-beige-light">
            <h2 className="text-2xl mb-4 text-primary-green font-syne">Sommaire</h2>
            <ol className="space-y-2 font-roboto text-primary-green">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#section-${section.id}`}
                    className="hover:text-secondary-orange transition-colors"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 md:py-16 bg-primary-beige">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="space-y-10 md:space-y-12">
            {doc.sections.map((section) => (
              <article
                key={section.id}
                id={`section-${section.id}`}
                className="p-6 md:p-8 bg-secondary-beige-light shadow-sm scroll-mt-24"
              >
                <h2 className="text-2xl md:text-3xl mb-6 text-primary-green font-syne">
                  {section.title}
                </h2>

                {section.content && (
                  <p className="font-roboto text-primary-green whitespace-pre-wrap leading-relaxed mb-6">
                    {section.content}
                  </p>
                )}

                {section.subsections && section.subsections.length > 0 && (
                  <div className="space-y-6 mt-4">
                    {section.subsections.map((sub) => (
                      <div
                        key={sub.id}
                        className="border-l-4 border-secondary-orange pl-4 md:pl-6"
                      >
                        <h3 className="text-lg md:text-xl mb-3 text-secondary-orange font-syne">
                          {sub.title}
                        </h3>
                        <p className="font-roboto text-primary-green whitespace-pre-wrap leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section className="py-10 bg-secondary-beige-light">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <p className="font-roboto text-sm text-primary-green opacity-75">
            © 2026 WeAreClimbers SAS. Tous droits réservés.
          </p>
          <p className="font-roboto text-xs text-primary-green opacity-60 mt-2">
            Document version {doc.version} — {formattedDate}
          </p>
        </div>
      </section>
    </main>
  )
}
