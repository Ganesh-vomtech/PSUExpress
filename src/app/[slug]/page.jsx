"use client"; // Ensures this component is client-side only

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PsuNewsCategoryPage() {
  const { slug } = useParams(); // Get the category slug from the URL
  const [newsData, setNewsData] = useState([]); // Holds the fetched news data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  // Helper function to format the URL title
  const formatUrlTitle = (title) => {
    return title
      ? title
          .replace(/\s{3}/g, "---") // Replace three spaces with "---"
          .replace(/\s{2}/g, "--")  // Replace two spaces with "--"
          .replace(/\s+/g, "-")     // Replace single or multiple spaces with "-"
      : "";
  };

  useEffect(() => {
    if (!slug) return; // If no slug is provided, do nothing

    const fetchNews = async () => {
      try {
        // Format the slug to match the API URL structure
        const formattedSlug = slug
          .replace(/\s{3}/g, "---")
          .replace(/\s{2}/g, "--")
          .replace(/\s+/g, "-");

        const response = await fetch(`/api/getData?type=news&category=${formattedSlug}`);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Handle the case where no news data is returned
        if (!data || data.length === 0) {
          setError("No news found for this category.");
        } else {
          setNewsData(data);
        }
      } catch (error) {
        setError(`Error fetching news data: ${error.message}`);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchNews(); // Call the function to fetch news
  }, [slug]); // Re-run the effect whenever the slug changes

  if (loading) {
    // Display a loading spinner while the data is being fetched
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <img src="/images/logo.jpg" alt="Logo" className="loading-logo" />
          <div className="loading-circle"></div>
        </div>
      </div>
    );
  }

  if (error) {
    // Display error message if something went wrong
    return <div>{error}</div>;
  }

  const BASE_IMAGE_URL = "https://www.psuexpress.com/sdsdsd/"; // Base URL for images

  return (
    <section className="listing">
      <div className="container">
        <div className="breadcrum">
          <ul>
            <li><a href="/">Home</a></li> ›
            <li><a href={`/${slug}`}>{slug}</a></li>
          </ul>
          <h1>{slug}</h1>
        </div>
        <div className="row">
          <div className="col-md-9 col-sm-8">
            {newsData.length > 0 ? (
              // Render the latest 10 news items in reverse order
              newsData.slice(-10).reverse().map((item) => (
                <div className="start" key={item.id || item.urltitle}>
                  <div className="row">
                    <div className="col-sm-4">
                      <a href={`/${item.categoryname}/${formatUrlTitle(item.urltitle)}`}>
                        <div
                          className="listimg"
                          style={{
                            backgroundImage: `url("${item.image ? `${BASE_IMAGE_URL}${item.image}` : "/images/placeholder.jpg"}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      </a>
                    </div>
                    <div className="col-sm-8">
                      <div className="title">
                        <a href={`/${item.categoryname}/${formatUrlTitle(item.urltitle)}`} title={item.title}>
                          <h2>{item.title}</h2>
                        </a>
                      </div>
                      <h3
                        className="newslisttitle"
                        dangerouslySetInnerHTML={{
                          __html: item.short_desc || " ",
                        }}
                      ></h3>
                      <a href={`/${item.categoryname}/${formatUrlTitle(item.urltitle)}`} className="more">
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
    </section>
  );
}
