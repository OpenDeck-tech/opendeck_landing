import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'
import PensionProviders from '../content/pension-providers.mdx'

export default function PensionProvidersPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <PensionProviders />
        </div>
      </MDXProvider>
    </Layout>
  )
}
