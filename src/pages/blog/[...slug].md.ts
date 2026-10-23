import { getPosts } from "@/core/libs/providers";
import type { APIRoute } from "astro";

export const prerender = true;

export { getPosts as getStaticPaths };

// /blog/<slug>.md — fuente canónica del post para agentes.
export const GET: APIRoute = ({ props }) => {
    const { entry } = props as { entry: { data: Record<string, unknown>; body?: string } };
    const { title, description, createdAt, updatedAt } = entry.data;
    const fm = [
        "---",
        `title: ${JSON.stringify(title)}`,
        `description: ${JSON.stringify(description)}`,
        `published: ${new Date(String(createdAt)).toISOString()}`,
        `updated: ${new Date(String(updatedAt)).toISOString()}`,
        "---",
        "",
    ].join("\n");
    return new Response(fm + (entry.body ?? ""), {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
};
