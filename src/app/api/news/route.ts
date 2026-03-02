import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
    { name: "Soompi", url: "https://www.soompi.com/feed" },
    { name: "AllKpop", url: "https://www.allkpop.com/rss" },
];

export async function GET() {
    try {
        const feedPromises = FEEDS.map(async (feed) => {
            try {
                const parsedFeed = await parser.parseURL(feed.url);
                return parsedFeed.items.map((item) => ({
                    title: item.title,
                    link: item.link,
                    pubDate: item.pubDate,
                    contentSnippet: item.contentSnippet,
                    source: feed.name,
                    image: item.enclosure?.url || extractImage(item.content),
                }));
            } catch (error) {
                console.error(`Error fetching feed ${feed.name}:`, error);
                return [];
            }
        });

        const results = await Promise.all(feedPromises);
        const flattenedResults = results.flat();

        // Sort by date (newest first)
        const sortedResults = flattenedResults.sort((a, b) => {
            const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
            const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
            return dateB - dateA;
        });

        // Limit to top 20 items
        return NextResponse.json(sortedResults.slice(0, 20));
    } catch (error) {
        console.error("General error in news API:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

function extractImage(content?: string): string | null {
    if (!content) return null;
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
}
