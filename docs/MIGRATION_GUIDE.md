# Migration Guide: HTML to MDX

## Why MDX is 10x Better

### Before (HTML)
```html
<div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
    <h3 class="text-xl font-semibold mb-3 text-white">What is Opendeck?</h3>
    <p class="text-gray-300 mb-4">
        Opendeck is an open-finance infrastructure platform...
    </p>
    <ul class="list-disc list-inside text-gray-300 space-y-2 mb-4">
        <li><strong>Gaming & Gambling Payments</strong> - Process payments...</li>
    </ul>
</div>
```

### After (MDX)
```mdx
<Card title="What is Opendeck?">

Opendeck is an open-finance infrastructure platform...

- **Gaming & Gambling Payments** - Process payments...

</Card>
```

**Result**: 70% less code, much more readable!

## Benefits

1. **Easier to Write**: Markdown is natural, HTML is verbose
2. **Component Reusability**: Write once, use everywhere
3. **Better Syntax Highlighting**: Built-in code block support
4. **Type Safety**: TypeScript support for components
5. **Cleaner Diffs**: Git diffs are much more readable
6. **Live Examples**: Can embed React components
7. **Better SEO**: Next.js handles optimization automatically

## Migration Steps

1. **Install Dependencies**
   ```bash
   cd docs
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Migrate Content Gradually**
   - Start with one section (e.g., Introduction)
   - Convert HTML to MDX
   - Test and iterate
   - Continue with other sections

4. **Deploy**
   ```bash
   npm run build
   npm start
   ```

## Component Examples

### Code Blocks
```mdx
<CodeBlock language="bash" title="Register Operator">
curl -X POST https://api.opendeck.co.uk/api/gaming/operators \
  -H "Content-Type: application/json" \
  -d '{"company_name": "Example Ltd"}'
</CodeBlock>
```

### API Endpoints
```mdx
<APIEndpoint method="POST" path="/api/gaming/operators" description="Register a new operator">
```json
{
  "company_name": "Example Ltd",
  "trading_name": "Example",
  "contact_email": "api@example.com"
}
```
</APIEndpoint>
```

### Alerts
```mdx
<Alert type="warning" title="Important">
Save your API credentials immediately! They won't be shown again.
</Alert>
```

## Next Steps

1. Migrate all content from `developers.html` to MDX files
2. Create reusable components for common patterns
3. Add interactive examples with React components
4. Set up automated deployment
