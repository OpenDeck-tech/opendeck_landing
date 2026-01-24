import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { CodeBlock } from '../components/CodeBlock'
import { APIEndpoint } from '../components/APIEndpoint'
import { Card } from '../components/Card'
import { Alert } from '../components/Alert'
import Events from '../content/events-entertainment.mdx'

const components = {
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => {
    if (props.className) {
      return <CodeBlock {...props} />
    }
    return <code className="bg-matte-dark text-white px-2 py-1 rounded text-sm font-mono border border-matte-border" {...props} />
  },
  APIEndpoint,
  Card,
  Alert,
}

export default function EventsPage() {
  return (
    <Layout>
      <MDXProvider components={components}>
        <div className="mdx-content">
          <Events />
        </div>
      </MDXProvider>
    </Layout>
  )
}
