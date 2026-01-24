import '../styles/globals.css'
import { MDXProvider } from '@mdx-js/react'
import { mdxComponents } from '../mdx-components'

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={mdxComponents}>
      <Component {...pageProps} />
    </MDXProvider>
  )
}
