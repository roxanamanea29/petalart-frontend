import React, { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";

function BlogFeed() {
    const [posts, setPosts] = useState([]);

    const extractImage = (entry) => {
        if (entry.media$thumbnail?.url) {
            return entry.media$thumbnail.url;
        }
        const html = entry.content?.$t || "";
        const match = html.match(/<img[^>]+src="([^">]+)"/);
        return match?.[1] || "/placeholder.svg";
    };

    useEffect(() => {
        fetchJsonp(
            "https://petalart-blog.blogspot.com/feeds/posts/default?alt=json-in-script"
        )
            .then((res) => res.json())
            .then((data) => {
                const entries = data.feed.entry.map((entry) => ({
                    title: entry.title.$t,
                    summary: entry.summary?.$t || "",
                    link: entry.link.find((l) => l.rel === "alternate").href,
                    published: entry.published.$t,
                    image: extractImage(entry),
                }));
                setPosts(entries);
            })
            .catch((err) => console.error("Error al obtener el feed:", err));
    }, []);

    return (
        <section className="mt-16">

            <h2 className="text-4xl text-green-900 font-bold text-center mb-12">
                Últimos artículos del blog
            </h2>

            <div className="flex flex-wrap justify-center gap-6 px-6">
                {posts.slice(0, 2).map((post, idx) => (
                    <div
                        key={idx}
                        className="w-[665px] h-[350px] bg-yellow-50 overflow-hidden shadow hover:shadow-md transition duration-200 flex flex-col"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-[200px] object-cover"
                        />
                        <div className="p-3 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-sm font-semibold mb-1">{post.title}</h3>
                                <p
                                    className="text-xs text-gray-600 line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: post.summary }}
                                />
                            </div>
                            <a
                                href={post.link}
                                className="mt-3 text-green-700 font-semibold hover:underline"
                            >
                                Leer artículo
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BlogFeed;