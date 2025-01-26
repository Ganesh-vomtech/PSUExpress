"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [NewsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: "new-faces-in-psus", title: "पीएसयू समाचार", link: "psu-news.html" },
    { key: "prime-minister-of-india-news", title: "भारत के प्रधानमंत्री", link: "#" },
    { key: "corporate-social-responsibility", title: "सी एस आर", link: "corporate-social-responsibility.html" },
    { key: "honor", title: "अवार्ड्स", link: "honor.html" },
    { key: "bank-news", title: "बैंक सेक्टर", link: "bank-news.html" },
    { key: "international-news", title: "अंतरराष्ट्रीय ख़बरें", link: "international-news.html" },
  ];

  const BASE_IMAGE_URL = "https://www.psuexpress.com/sdsdsd/";

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("/api/getData?type=news");
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching blogs data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsData();
    document.title = "Blogs";
  }, []);

  const getLastThreeByCategory = (categoryKey) => {
    return NewsData.filter((item) => item.categoryname === categoryKey)
      .slice(-4)
      .reverse();
  };

  const getBreakingNews = () => {
    return NewsData.slice(0, 4);
  };

  const formatUrl = (urltitle) => urltitle.replace(/ /g, "-");

  return (
    <div>
      {loading ? (
        <div className="loader">
          <div className="loader-box-1" />
          <div className="loader-box-2" />
        </div>
      ) : (
        <>
          {/* Breaking News Section */}
          {/* <section className="sildetab">
            <div className="container">
              <div className="owl-carousel slide1 owl-theme">
                {getBreakingNews().map((item) => (
                  <div className="item" key={item.id || item.urltitle}>
                    <div className="start">
                      <div className="img-thumb">
                        <a href={`/${formatUrl(item.urltitle)}`} title={item.title}>
                          <div
                            className="img"
                            style={{
                              backgroundImage: `url("${item.image ? `${BASE_IMAGE_URL}${item.image}` : "/images/placeholder.jpg"}")`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                        </a>
                      </div>
                      <div className="title">
                        <a href={`details/${formatUrl(item.urltitle)}`} title={item.title}>
                          <h2>{item.title}</h2>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

          {/* Categories Sections */}
          {categories.map((category) => {
            const categoryData = getLastThreeByCategory(category.key);

            return (
              <section key={category.key} className="sildetab">
                <div className="container">
                  <div className="sectiontitle">
                    <h2 className="fontbold titlepage">{category.title}</h2>
                    <a href={`${category.key}`} className="viewall">
                      View All
                    </a>
                    <div className="clear" />
                  </div>
                  <div className="row">
                    {categoryData.length > 0 ? (
                      categoryData.map((item) => (
                        <div key={item.id || `${category.key}-${item.urltitle}`} className="col-sm-3">
                          <div className="start">
                            <div className="img-thumb">
                              <a href={`/${formatUrl(item.urltitle)}`} title={item.title}>
                                <div
                                  className="img"
                                  style={{
                                    backgroundImage: `url("${item.image ? `${BASE_IMAGE_URL}${item.image}` : "/images/placeholder.jpg"}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                />
                              </a>
                            </div>
                            <div className="title">
                              <a href={`/details/${formatUrl(item.urltitle)}`} title={item.title}>
                                <h2>{item.title}</h2>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No data available for this category.</p>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
