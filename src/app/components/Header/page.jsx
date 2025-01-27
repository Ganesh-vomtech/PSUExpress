"use client";

import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [
    {
      name: "पीएसयू विशेष",
      slug: "psu-news",
      subcategories: [
        { name: "समझौता", slug: "memorandum-of-understanding" },
        { name: "अवार्ड", slug: "honor" },
        { name: "सी एस आर", slug: "corporate-social-responsibility" },
        { name: "नए चेहरे", slug: "new-faces-in-psus" },
      ],
    },
    { name: "मंत्रालय", slug: "ministry" },
    { name: "बैंक", slug: "bank-news" },
    { name: "टेक्नोलॉजी", slug: "technology" },
    { name: "बॉलीवुड", slug: "bollywood" },
    { name: "खेल", slug: "sports" },
    { name: "शिक्षा", slug: "education" },
    { name: "राजनीति", slug: "politics" },
    { name: "स्वास्थ्य व सौंदर्य", slug: "health" },
    { name: "खास मुलाकात", slug: "special-meeting" },
    { name: "सरकारी योजनाएं", slug: "india-government-schemes" },
    {
      name: "More",
      slug: "more",
      subcategories: [
        { name: "बच्चों की दुनिया", slug: "world-of-children" },
        { name: "कला संस्कृति व साहित्य", slug: "culture-and-literature" },
        { name: "संपादकीय", slug: "editorial" },
      ],
    },
  ];

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header>
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
            <button
              className={`cmn-toggle-switch open_close ${
                menuOpen ? "active" : ""
              }`}
              onClick={toggleMenu}
            >
              <span>Menu mobile</span>
            </button>
            <div className={`main-menu ${menuOpen ? "open" : "closed"}`}>
              <h1>
                <Link href="/">Hindi News</Link>
              </h1>
              <ul>
                {categories.map((category) => (
                  <li key={category.slug}>
                    {category.subcategories && category.name === "More" ? (
                      <span>{category.name}</span> // Make "More" not clickable
                    ) : (
                      <Link href={`/${category.slug}`}>{category.name}</Link>
                    )}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <ul>
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.slug}>
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
    </header>
  );
};

export default Header;





// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function Header() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("/api/getData?type=category");
//         const data = await response.json();

//         const desiredOrder = [
//           "पीएसयू विशेष",
//           "मंत्रालय",
//           "बैंक",
//           "टैकनोलजी",
//           "बॉलीवुड",
//           "खेल",
//           "शिक्षा",
//           "राज्य",
//           "राजनीति",
//           "स्वास्थ्य व सौंदर्य",
//           "संपादकीय",
//           "खास मुलाकात",
//           "सरकारी योजनाएं",
//           "महत्वपूर्ण ख़बरें",
          
//         ];

//         // Filter specific categories and sort them
//         const filteredCategories = data
//           .filter((category) =>
//             desiredOrder.includes(category.name)
//           )
//           .map((category) => ({
//             ...category,
//             subcategories: category.subcategories || [],
//           }));

//         // Add "पीएसयू विशेष" with subcategories
//         const psuSpecial = {
//           name: "पीएसयू विशेष",
//           slug: "psu-news",
//           subcategories: [
//             { name: "समझौता", slug: "memorandum-of-understanding" },
//             { name: "अवार्ड", slug: "honor" },
//             { name: "सी एस आर", slug: "corporate-social-responsibility" },
//             { name: "नए चेहरे", slug: "new-faces-in-psus" },
//           ],
//         };

//         const updatedCategories = [psuSpecial, ...filteredCategories];

//         // Sort categories according to desiredOrder
//         updatedCategories.sort(
//           (a, b) =>
//             desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name)
//         );

//         setCategories(updatedCategories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return <div>Loading categories...</div>;
//   }

//   return (
//     <div>
//       <div className="logo">
//         <div className="container">
//           <Link href="/">
//             <img src="/images/logo.jpg" alt="Hindi News - PSU Express" />
//           </Link>
//         </div>
//       </div>
//       <section id="menu">
//         <div className="container">
//           <nav>
//             <button className="cmn-toggle-switch cmn-toggle-switch__htx open_close">
//               <span>Menu mobile</span>
//             </button>
//             <div className="main-menu">
//               <h1>
//                 <Link href="/">Hindi News</Link>
//               </h1>
//               <ul>
//                 {categories.map((category) => (
//                   <li key={category.slug}>
//                     <Link href={`/${category.slug}`}>{category.name}</Link>
//                     {/* Render subcategories if available */}
//                     {category.subcategories && category.subcategories.length > 0 && (
//                       <ul>
//                         {category.subcategories.map((subcategory) => (
//                           <li key={subcategory.slug}>
//                             <Link href={`/${subcategory.slug}`}>
//                               {subcategory.name}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </nav>
//         </div>
//       </section>
//     </div>
//   );
// }

