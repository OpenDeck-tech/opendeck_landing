import '../styles/globals.css'
import { MDXProvider } from '@mdx-js/react'
import { CodeBlock } from '../components/CodeBlock'
import { APIEndpoint } from '../components/APIEndpoint'
import { Card } from '../components/Card'
import { Alert } from '../components/Alert'

const components = {
  pre: CodeBlock,
  APIEndpoint,
  Card,
  Alert,
}

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}
