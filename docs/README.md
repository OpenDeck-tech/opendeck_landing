# Opendeck Developer Documentation

Modern MDX-based documentation for the Opendeck API.

## Why MDX?

- ✨ **10x Better Developer Experience** - Write in Markdown, use React components
- 🎨 **Reusable Components** - Code blocks, API endpoints, alerts, cards
- 🔧 **Better Tooling** - Syntax highlighting, auto-formatting, type safety
- 📝 **Easier to Maintain** - Clean diffs, version control friendly
- 🚀 **Modern Stack** - Next.js, React, TypeScript ready

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
docs/
├── components/          # React components (CodeBlock, APIEndpoint, etc.)
├── content/            # MDX documentation files
├── pages/              # Next.js pages
├── styles/             # Global styles
└── public/             # Static assets
```

## Writing Documentation

Create `.mdx` files in the `content/` directory:

```mdx
# My Documentation

<Card title="Example">
This is a card component!
</Card>

<APIEndpoint method="POST" path="/api/example">
```json
{ "example": "data" }
```
</APIEndpoint>

<CodeBlock language="bash">
curl -X POST https://api.opendeck.co.uk/api/example
</CodeBlock>
```

## Available Components

- `<Card>` - Content cards
- `<CodeBlock>` - Syntax highlighted code blocks
- `<APIEndpoint>` - API endpoint documentation
- `<Alert>` - Info, warning, success, error alerts

## Migration from HTML

The old `developers.html` can be gradually migrated to MDX files. Each section becomes its own MDX file for better organization and maintainability.
