import Layout from '../components/Layout'
import Introduction from '../content/introduction.mdx'
import QuickStart from '../content/quick-start.mdx'

export default function Home() {
  return (
    <Layout>
      <div className="mdx-content">
        <Introduction />
        <QuickStart />
      </div>
    </Layout>
  )
}
