import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '#constants/site';
import { toSlug } from '#libs/providers';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
    const posts = (await getCollection('blog')).sort(
        (a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime(),
    );
    return rss({
        title: `${SITE.name} — Blog`,
        description: SITE.description,
        site: context.site ?? SITE.url,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description,
            pubDate: post.data.createdAt,
            link: `/blog/${toSlug(post.id)}/`,
        })),
    });
}
