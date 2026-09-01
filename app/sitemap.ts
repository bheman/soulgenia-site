import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://soulgenia.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/genia",
    "/diagnostico-ia",
    "/blog",
    "/trial",
    "/privacidade",
    "/termos",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" as const : "monthly" as const,
    // /genia é a página de venda do produto: fica logo abaixo da home.
    // /diagnostico-ia é a porta de entrada da oferta de consultoria: vem logo
    // depois dela.
    priority:
      path === ""
        ? 1
        : path === "/genia"
          ? 0.95
          : path === "/diagnostico-ia"
            ? 0.9
            : path === "/blog"
              ? 0.9
              : 0.5,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T12:00:00-03:00`),
    changeFrequency: "monthly" as const,
    priority: post.id === "SG-BLOG-001" ? 0.85 : 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
