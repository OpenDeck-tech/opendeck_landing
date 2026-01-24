import Layout from '../components/Layout'
import { MDXProvider } from '@mdx-js/react'
import { CodeBlock } from '../components/CodeBlock'
import { APIEndpoint } from '../components/APIEndpoint'
import { Card } from '../components/Card'
import { Alert } from '../components/Alert'
import Introduction from '../content/introduction.mdx'
import QuickStart from '../content/quick-start.mdx'

const components = {
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => {
    // If it's a code block (has className), use CodeBlock
    if (props.className) {
      return <CodeBlock {...props} />
    }
    // Otherwise, it's inline code
    return <code className="bg-matte-dark text-white px-2 py-1 rounded text-sm font-mono border border-matte-border" {...props} />
  },
  APIEndpoint,
  Card,
  Alert,
}

export default function Home() {
  return (
    <Layout>
      <MDXProvider components={components}>
        <div className="mdx-content">
          <Introduction />
          <QuickStart />
        </div>
      </MDXProvider>
    </Layout>
  )
}
