import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://soulgenia.com.br";

export default function robots(): MetadataRoute.Robots {
  if (
    process.env.STAGING_NO_INDEX === "true" ||
    process.env.NEXT_PUBLIC_STAGING_NO_INDEX === "true"
  ) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
