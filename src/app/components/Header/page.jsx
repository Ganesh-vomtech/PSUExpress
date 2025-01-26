"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/getData?type=category");
        const data = await response.json();

        // Filter specific categories and add subcategories dynamically
        const filteredCategories = data
          .filter((category) =>
            [
              "मंत्रालय",
              "बैंक",
              "टेक्नोलॉजी",
              "बॉलीवुड",
              "खेल",
              "शिक्षा",
              "राज्य",
              "राजनीति",
              "स्वास्थ्य व सौंदर्य",
              "संपादकीय",
              "खास मुलाकात",
              "सरकारी योजनाएं",
            ].includes(category.name)
          )
          .map((category) => ({
            ...category,
            subcategories: category.subcategories || [] // Ensure subcategories exist
          }));

        // Manually add "पीएसयू विशेष" at the start with its own subcategories
        const updatedCategories = [
          {
            name: "पीएसयू विशेष",
            slug: "psu-news",
            subcategories: [
              { name: "समझौता", slug: "memorandum-of-understanding" },
              { name: "अवार्ड", slug: "honor" },
              { name: "सी एस आर", slug: "corporate-social-responsibility" },
              { name: "नए चेहरे", slug: "new-faces-in-psus" }
            ]
          },

          ...filteredCategories
        ];

        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <div className="logo">
        <div className="container">
          <Link href="/">
            <img src="/images/logo.jpg" alt="Hindi News - PSU Express" />
          </Link>
        </div>
      </div>
      <section id="menu">
        <div className="container">
          <nav>
            <button className="cmn-toggle-switch cmn-toggle-switch__htx open_close">
              <span>Menu mobile</span>
            </button>
            <div className="main-menu">
              <h1>
                <Link href="/">Hindi News</Link>
              </h1>
              <ul>
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link href={`/${category.slug}`}>{category.name}</Link>
                    {/* Render subcategories if available */}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <ul>
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.slug}>
                            {/* Remove parent category slug from subcategory URL */}
                            <Link href={`/${subcategory.slug}`}>
                              {subcategory.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
