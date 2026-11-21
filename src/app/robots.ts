import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Crawling stays allowed on purpose: search engines must be able to fetch the
// pages to see the "noindex" instruction and drop them from results.
// Blocking crawling here would leave already-indexed pages stuck in results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
  };
}
