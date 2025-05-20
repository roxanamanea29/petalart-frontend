import React, { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";

function BlogFeed() {
    const [posts, setPosts] = useState([]);
    const extractImage = (html) => {
        const match = html.match(/<img.*?src="(.*?)"/);
        return match ? match[1] : null;
    };

    useEffect(() => {
        fetchJsonp("https://petalart-blog.blogspot.com/feeds/posts/default?alt=json-in-script")
            .then((response) => response.json())
            .then((data) => {
                const entries = data.feed.entry.map((entry) => ({
                    title: entry.title.$t,
                    summary: entry.summary?.$t || "",
                    link: entry.link.find((l) => l.rel === "alternate").href,
                    published: entry.published.$t,
                    image: extractImage(entry.content?.$t || "") || "/placeholder.svg"
                }));
                setPosts(entries);
            })
            .catch((error) => {
                console.error("Error al obtener el feed:", error);
            });
    }, []);

    return (
        <section className="mt-26">
            <h2 className="text-4xl text-green-900 font-bold text-center mb-16">Últimos artículos del blog</h2>

            <div className="flex flex-wrap justify-center gap-6 px-6">
                {posts.slice(0, 2).map((post, index) => (
                    <div
                        key={index}
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
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 text-green-700 font-semibold transition-transform duration-200 hover:underline hover:translate-x-1"
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