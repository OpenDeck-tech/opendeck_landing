import { CodeBlock } from './components/CodeBlock'
import { APIEndpoint } from './components/APIEndpoint'
import { Card } from './components/Card'
import { Alert } from './components/Alert'

export function useMDXComponents(components = {}) {
  return {
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
    ...components,
  }
}

// Also export as default for compatibility
export default useMDXComponents
