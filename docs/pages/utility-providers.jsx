import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'
import UtilityProviders from '../content/utility-providers.mdx'

export default function UtilityProvidersPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <UtilityProviders />
        </div>
      </MDXProvider>
    </Layout>
  )
}
