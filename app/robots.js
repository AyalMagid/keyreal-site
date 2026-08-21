// Agent-allow, not block-all. Training crawlers and retrieval crawlers are
// separate bots: blocking a retrieval bot removes the site from that
// assistant's answers entirely, which is the opposite of what we want.
const AI_AGENTS = [
  // retrieval / answer engines — these decide whether we get cited
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "Amazonbot",
  "meta-externalagent",
  // training crawlers — allowed on purpose: being in the model's own weights
  // is what makes an assistant name us without a live search
  "GPTBot",
  "ClaudeBot",
  "CCBot"
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" }))
    ],
    sitemap: "https://www.keyreal.co.il/sitemap.xml",
    host: "https://www.keyreal.co.il"
  };
}
