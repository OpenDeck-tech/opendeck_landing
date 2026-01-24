import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'
import Authentication from '../content/authentication.mdx'

export default function AuthenticationPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <Authentication />
        </div>
      </MDXProvider>
    </Layout>
  )
}
