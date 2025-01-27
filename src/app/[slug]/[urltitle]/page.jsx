"use client"; // This will ensure this component is client-side only

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // useParams for dynamic routes
import Link from "next/link";

const formatUrlTitle = (title) => {
  return title
    ? title
      .replace(/\s{3}/g, "---")
      .replace(/\s{2}/g, "--")
      .replace(/\s+/g, "-")
    : "";
};

const formatDateToIST = (dateString) => {
  try {
    // Ensure dateString is not invalid
    if (!dateString || isNaN(new Date(dateString))) {
      return "Invalid Date";
    }

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

export default function DetailsPage() {
  const { category, urltitle } = useParams(); // Get category and urltitle from params
  const [newsData, setNewsData] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  if (!urltitle) {
    console.error("URL Title is missing.");
    return <div>Invalid URL</div>;
  }

  // Use useEffect to fetch data on the client side
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Decode and convert urltitle to lowercase
        const decodedUrlTitle = decodeURIComponent(urltitle)
          .replace(/---/g, "   ")
          .replace(/--/g, "  ")
          .replace(/-/g, " ")
          .toLowerCase(); // Convert to lowercase
          console.log(decodedUrlTitle);
        const encodedUrlTitle = encodeURIComponent(decodedUrlTitle);
     
        let url = `/api/getData?type=news&urltitle=${encodedUrlTitle}`;
        if (category) {
          const encodedCategory = encodeURIComponent(category);
          url = `/api/getData?type=news&category=${encodedCategory}&urltitle=${encodedUrlTitle}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setNewsData(data[0]);
        } else {
          setNewsData({}); // No data found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchDetails();
  }, [category, urltitle]);

  useEffect(() => {
    const fetchRelatedNews = async () => {
      if (newsData?.categoryname) {
        try {
          const response = await fetch(
            `/api/getData?type=news&category=${newsData.categoryname}`
          );
          const relatedData = await response.json();

          if (Array.isArray(relatedData) && relatedData.length > 0) {
            setRelatedNews(relatedData.reverse().slice(0, 10));
          }
        } catch (error) {
          console.error("Error fetching related news:", error);
        }
      }
    };

    fetchRelatedNews();
  }, [newsData?.categoryname]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-content">
          <img
            src="/images/logo.jpg"
            alt="Logo"
            className="loading-logo"
          />
          <div className="loading-circle"></div>
        </div>
      </div>
    );
  }

  // Handle no data found case
  if (!newsData || Object.keys(newsData).length === 0) {
    return <div>No data found for this news.</div>;
  }

  return (
    <section className="pagedetails">
      <div className="container">
        <div className="breadcrum">
          <ul>
            <li>
              <Link href="/">होम पेज</Link> ›
            </li>
            <li>
              <Link href={`/${newsData.categoryname}`}>{newsData.categoryname}</Link>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-md-9 col-sm-8">
            <h1>{newsData.title || "Title not available"}</h1>
            <span>{newsData.auther || "Unknown Author"}</span>
            <div className="date">
              {newsData.publish_date
                ? formatDateToIST(newsData.publish_date)
                : "No Date"}
            </div>
            <div className="detailsimg">
              <img
                src={
                  newsData.image
                    ? `https://www.psuexpress.com/sdsdsd/${newsData.image}`
                    : "/images/placeholder.jpg"
                }
                alt={newsData.title || "Default Alt Text"}
                style={{
                  width: "100%",
                  overflowX: "visible",
                  overflowY: "visible",
                }}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: newsData.description || "No content available.",
              }}
            />
          </div>
          <div className="col-md-3 col-sm-4">
            <div className="popular-posts">
              <h3>मिलती जुलती ख़बरें</h3>
              {relatedNews.length > 0 ? (
                relatedNews.map((newss, index) => (
                  <div key={index} className="start">
                    <div className="row no-gutters">
                      <div className="col-sm-5">
                        <Link
                          href={`/${formatUrlTitle(
                            newss.categoryname
                          )}/${formatUrlTitle(newss.urltitle)}`}
                          title={newss.title}
                        >
                          <img
                            src={
                              newss.image
                                ? `https://www.psuexpress.com/sdsdsd/${newss.image}`
                                : "/images/placeholder.jpg"
                            }
                            alt={newss.title || "Default Alt Text"}
                            style={{ width: "100%" }}
                          />
                        </Link>
                      </div>
                      <div className="col-sm-7">
                        <div className="title">
                          <Link
                            href={`/${formatUrlTitle(
                              newss.categoryname
                            )}/${formatUrlTitle(newss.urltitle)}`}
                            title={newss.title}
                            rel="bookmark"
                          >
                            {newss.title}
                          </Link>
                        </div>
                        <span className="date">
                          {newss.publish_date
                            ? formatDateToIST(newss.publish_date)
                            : "No Date"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No related news available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
