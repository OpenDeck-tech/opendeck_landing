import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'
import Events from '../content/events-entertainment.mdx'

export default function EventsPage() {
  return (
    <Layout>
      <MDXProvider components={mdxComponents}>
        <div className="mdx-content">
          <Events />
        </div>
      </MDXProvider>
    </Layout>
  )
}
