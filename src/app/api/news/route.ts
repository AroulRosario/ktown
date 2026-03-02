import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser({
    customFields: {
        item: [["media:content", "media:content", { keepArray: true }], ["content:encoded", "contentEncoded"]],
    }
});

const FEEDS = [
    { name: "Soompi", url: "https://www.soompi.com/feed" },
    { name: "AllKpop", url: "https://www.allkpop.com/rss" },
];

export async function GET() {
    try {
        const feedPromises = FEEDS.map(async (feed) => {
            try {
                const parsedFeed = await parser.parseURL(feed.url);
                return parsedFeed.items.map((item: any) => {
                    // Improved image extraction
                    let image = null;
                    if (item["media:content"] && item["media:content"][0]) {
                        image = item["media:content"][0].$.url;
                    } else if (item.enclosure?.url) {
                        image = item.enclosure.url;
                    } else {
                        image = extractImage(item.contentEncoded || item.content);
                    }

                    return {
                        id: Buffer.from(item.link).toString("base64"), // Use base64 link as ID
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        contentSnippet: item.contentSnippet,
                        contentEncoded: item.contentEncoded || item.content,
                        source: feed.name,
                        image: image,
                    };
                });
            } catch (error) {
                console.error(`Error fetching feed ${feed.name}:`, error);
                return [];
            }
        });

        const results = await Promise.all(feedPromises);
        const flattenedResults = results.flat();

        const sortedResults = flattenedResults.sort((a, b) => {
            const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
            const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
            return dateB - dateA;
        });

        return NextResponse.json(sortedResults.slice(0, 30));
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
