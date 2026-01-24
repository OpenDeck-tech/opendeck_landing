import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'
import Introduction from '../content/introduction.mdx'
import QuickStart from '../content/quick-start.mdx'
import Authentication from '../content/authentication.mdx'
import APICategories from '../content/api-categories.mdx'
import RequestResponse from '../content/request-response.mdx'
import CodeExamples from '../content/code-examples.mdx'

export default function Home() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <Introduction />
          <QuickStart />
          <Authentication />
          <APICategories />
          <RequestResponse />
          <CodeExamples />
        </div>
      </MDXProvider>
    </Layout>
  )
}
