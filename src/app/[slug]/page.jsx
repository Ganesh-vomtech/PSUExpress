"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PsuNewsCategoryPage() {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatUrlTitle = (title) => {
    return title ? title.replace(/\s+/g, "-") : "";
  };

  useEffect(() => {
    if (!slug) return;

    const fetchNews = async () => {
      try {
        const formattedSlug = slug.replace(/\s+/g, "-");
        const response = await fetch(
          `/api/getData?type=news&category=${formattedSlug}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data || data.length === 0) {
          setError("No news found for this category.");
        } else {
          setNewsData(data);
        }
      } catch (error) {
        setError(`Error fetching news data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const BASE_IMAGE_URL = "https://www.psuexpress.com/sdsdsd/";

  return (
    <section className="listing">
      <div className="container">
        <div className="breadcrum">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            ›
            <li>
              <a href={`${slug}`}>    {/* Category: */} {slug}</a>
            </li>
          </ul>
          {/* Category: */}
          <h1>Category: {slug}</h1>
        </div>
        <div className="row">
          <div className="col-md-9 col-sm-8">
            {newsData.length > 0 ? (
              newsData.slice(-10).reverse().map((item) => (
                <div className="start" key={item.id || item.urltitle}>
                  <div className="row">
                    <div className="col-sm-4">
                      <a href={`/details/${formatUrlTitle(item.urltitle)}`}>
                        <div
                          className="listimg"
                          style={{
                            backgroundImage: `url("${item.image
                              ? `${BASE_IMAGE_URL}${item.image}`
                              : "/images/placeholder.jpg"}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </a>
                    </div>
                    <div className="col-sm-8">
                      <div className="title">
                        <a
                          href={`/details/${formatUrlTitle(item.urltitle)}`}
                          title={item.title}
                        >
                          <h2>{item.title}</h2>
                        </a>
                      </div>



                      <h3
                        className="newslisttitle"
                        dangerouslySetInnerHTML={{
                          __html: item.short_desc || "No content",
                        }}
                      ></h3>

                      <a
                        href={`/details/${formatUrlTitle(item.urltitle)}`}
                        className="more"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No news found for this category.</p>
            )}
          </div>
          <div className="col-md-3 col-sm-4">Space For Ads</div>
        </div>
      </div>
    </section >
  );
}
