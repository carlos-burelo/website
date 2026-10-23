import { toSlug } from "@/core/libs/providers";
import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPathsItem } from "astro";

export const prerender = true;

export async function getStaticPaths(): Promise<GetStaticPathsItem[]> {
    const works = await getCollection("works");
    return works.map((entry) => ({
        params: { slug: toSlug(entry.id) },
        props: { entry },
    }));
}

// /works/<slug>.md — ficha del proyecto en Markdown para agentes.
export const GET: APIRoute = ({ props }) => {
    const { entry } = props as {
        entry: {
            data: {
                title: string;
                description: string;
                createdAt: Date;
                preview?: string;
                repository?: string;
                tags?: string[];
                stack?: Record<string, unknown>;
            };
        };
    };
    const d = entry.data;
    const lines = [
        "---",
        `title: ${JSON.stringify(d.title)}`,
        `description: ${JSON.stringify(d.description)}`,
        `created: ${d.createdAt.toISOString()}`,
        ...(d.repository ? [`repository: ${d.repository}`] : []),
        ...(d.preview ? [`preview: ${d.preview}`] : []),
        ...(d.tags?.length ? [`tags: [${d.tags.join(", ")}]`] : []),
        "---",
        "",
        `# ${d.title}`,
        "",
        d.description,
        "",
        ...(d.repository ? [`Código: ${d.repository}`] : []),
        ...(d.preview ? [`Preview: ${d.preview}`] : []),
    ];
    return new Response(lines.join("\n") + "\n", {
        headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
};
