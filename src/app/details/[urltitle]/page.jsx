"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Hook for accessing dynamic route parameters
import Link from "next/link"; // Importing Link to use in breadcrumbs

export default function Details() {
  const { urltitle } = useParams(); // Get the dynamic parameter from the route
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const decodedUrltitle = decodeURIComponent(urltitle).replace(/-/g, " ");
        console.log("Decoded URL Title:", decodedUrltitle);

        const encodedTitle = encodeURIComponent(decodedUrltitle);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getData?type=news&urltitle=${encodedTitle}`
        );
        const data = await response.json();
        console.log("Fetched Data:", data);

        // Log full data structure to inspect it
        console.log("Full data structure:", JSON.stringify(data, null, 2));

        if (Array.isArray(data) && data.length > 0) {
          const blog = data[0]; // Get the first blog object from the array
          const d = setNewsData(blog); // Update state (state setter doesn't return anything)

          console.log(d);
        } else {
          throw new Error("Fetched data is empty or not an array");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (urltitle) {
      fetchDetails(); // Call the fetchDetails function
    }
  }, [urltitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsData) {
    return <div>No data found for this news.</div>;
  }

  return (
    <section className="pagedetails">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrum">
          <ul>
            <li>
              <Link href="/">होम पेज</Link> ›
            </li>
            <li>
              <Link href={`/${newsData.categorySlug}`}>{newsData.categoryname}</Link>
            </li>
          </ul>
        </div>

        {/* News Content */}
        <div className="row">
          <div className="col-md-9 col-sm-8">
            <h1>{newsData.title}</h1>
            <span>{newsData.auther || "Unknown Author"}</span>
            <div className="date">{newsData.publish_date || "No Date"}</div>

            {/* Main Image */}
            <div className="detailsimg">
              <img
                src={
                  newsData.image
                    ? `https://www.psuexpress.com/sdsdsd/${newsData.image}`
                    : "/images/placeholder.jpg"
                }
                style={{ width: "100%" }}
                alt={newsData.title || "Default Alt Text"}
              />
            </div>

            {/* Article Body */}
            <div
              dangerouslySetInnerHTML={{
                __html: newsData.description || "No content available.",
              }}
            />
          </div>

          {/* Related News */}
          <div className="col-md-3 col-sm-4">
            <div className="popular-posts">
              <h3>मिलती जुलती ख़बरें</h3>

              {newsData.relatedNews && newsData.relatedNews.length > 0 ? (
                newsData.relatedNews.map((newss, index) => (
                  <ul key={index}>
                    <li key={newss.id || index}>
                      <Link href={`/details/${formatUrlTitle(newss.urltitle)}`}>
                        {newss.title}
                      </Link>
                    </li>
                  </ul>
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
