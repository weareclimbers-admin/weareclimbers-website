/**
 * Compilation MDX côté serveur (@mdx-js/mdx, sans CMS ni bundler dédié).
 *
 * Markdown GitHub (tableaux, listes de tâches, liens auto) via remark-gfm, et un plugin remark maison :
 *   - refuse tout titre de niveau 1 dans le corps (le H1 est le `title` du frontmatter) ;
 *   - donne un id stable à chaque H2 et en tire le sommaire.
 */

import { evaluate } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import * as runtime from 'react/jsx-runtime'
import type { ComponentType } from 'react'

export interface TocEntry {
  id: string
  text: string
}

interface MdNode {
  type: string
  depth?: number
  value?: string
  children?: MdNode[]
  data?: { hProperties?: Record<string, unknown> }
}

function nodeText(node: MdNode): string {
  if (typeof node.value === 'string') return node.value
  return (node.children ?? []).map(nodeText).join('')
}

export function slugifyHeading(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/['’]/g, '-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  )
}

function remarkHeadings(file: string, toc: TocEntry[]) {
  return () => (tree: MdNode) => {
    const used = new Map<string, number>()
    const walk = (node: MdNode) => {
      if (node.type === 'heading') {
        if (node.depth === 1) {
          throw new Error(
            `[blog] content/blog/${file} : titre de niveau 1 (« # ») interdit dans le corps — le H1 est le « title » du frontmatter, commence les sections par « ## ».`,
          )
        }
        if (node.depth === 2) {
          const text = nodeText(node).trim()
          const base = slugifyHeading(text)
          const n = used.get(base) ?? 0
          used.set(base, n + 1)
          const id = n === 0 ? base : `${base}-${n + 1}`
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
          toc.push({ id, text })
        }
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}

export async function compilePostBody(
  file: string,
  source: string,
): Promise<{ Content: ComponentType<{ components?: Record<string, unknown> }>; toc: TocEntry[] }> {
  const toc: TocEntry[] = []
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm, remarkHeadings(file, toc)],
  })
  return { Content: Content as ComponentType<{ components?: Record<string, unknown> }>, toc }
}
