import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'
import GamingOperators from '../content/gaming-operators.mdx'

export default function GamingOperatorsPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <GamingOperators />
        </div>
      </MDXProvider>
    </Layout>
  )
}
