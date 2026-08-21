/** @type {import('next').NextConfig} */

// The Wix site indexed four separate legal URLs; this site serves them as one
// /legal page with tabs, so each old URL is redirected to its tab. Without these
// the ranking those pages accumulated is lost.
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/terms", destination: "/legal#terms", permanent: true },
      { source: "/privacy-policy", destination: "/legal#privacy", permanent: true },
      { source: "/cancellation-policy", destination: "/legal#cancellation", permanent: true },
      { source: "/accessibility", destination: "/legal#accessibility", permanent: true }
    ];
  }
};

export default nextConfig;
