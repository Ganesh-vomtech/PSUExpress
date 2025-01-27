"use client"; // Ensures this component is client-side only

import { useEffect, useState } from "react";

export default function Home() {
  const [newsData, setNewsData] = useState([]); // Holds the news data
  const [loading, setLoading] = useState(true); // Loading state

  // Categories configuration
  const categories = [
    { key: "new-faces-in-psus", title: "पीएसयू समाचार", link: "psu-news.html" },
    { key: "prime-minister-of-india-news", title: "भारत के प्रधानमंत्री", link: "#" },
    { key: "corporate-social-responsibility", title: "सी एस आर", link: "corporate-social-responsibility.html" },
    { key: "honor", title: "अवार्ड्स", link: "honor.html" },
    { key: "bank-news", title: "बैंक सेक्टर", link: "bank-news.html" },
    { key: "international-news", title: "अंतरराष्ट्रीय ख़बरें", link: "international-news.html" },
  ];

  const BASE_IMAGE_URL = "https://www.psuexpress.com/sdsdsd/";

  // Fetch news data on component mount
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("/api/getData?type=news&limit=100"); // Fetch a limited number of records
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchNewsData();
    document.title = "Blogs"; // Set the page title
  }, []);

  // Function to get the last three articles by category
  const getLastThreeByCategory = (categoryKey) => {
    return newsData
      .filter((item) => item.categoryname === categoryKey)
      .slice(-4)
      .reverse(); // Get the last three articles, reverse order
  };

  // Function to format URL title
  const formatUrl = (urltitle) => urltitle.replace(/ /g, "-");

  return (
    <div>
      {/* Page loading animation */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            {/* Logo during loading */}
            <img src="/images/logo.jpg" alt="Logo" className="loading-logo" />
            {/* Circular Loading animation */}
            <div className="loading-circle"></div>
          </div>
        </div>
      )}

      {/* Main Content (Visible only after loading is complete) */}
      {!loading && (
        <div>
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
                              <a href={`/${item.categoryname}/${formatUrl(item.urltitle)}`} title={item.title}>
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
        </div>
      )}
    </div>
  );
}
