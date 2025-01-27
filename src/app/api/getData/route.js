import { NextResponse } from "next/server";
import pool from "@/app/lib/mysql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get("type"); // Type of query ('news' or 'category')
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const urltitle = searchParams.get("urltitle");

    // Validate the query type
    if (!queryType) {
      return NextResponse.json(
        { error: "Query type is required (e.g., 'type=news' or 'type=category')" },
        { status: 400 }
      );
    }

    // Define SQL query configurations
    const queryMap = {
      news: {
        base: "SELECT * FROM news",
        conditions: [
          { key: "id", sql: "id = ?" },
          { key: "category", sql: "categoryname = ?" },
          { key: "urltitle", sql: "urltitle = ?" },
        ],
      },
      category: {
        base: "SELECT * FROM category",
        conditions: [{ key: "id", sql: "id = ?" }],
      },
    };

    // Check if the query type is valid
    const queryConfig = queryMap[queryType];
    if (!queryConfig) {
      return NextResponse.json(
        { error: `Invalid query type: ${queryType}. Supported types: 'news', 'category'` },
        { status: 400 }
      );
    }

    // Build the query dynamically based on provided parameters
    let query = queryConfig.base;
    const params = [];
    const conditions = queryConfig.conditions
      .filter(({ key }) => searchParams.get(key)) // Match provided params
      .map(({ sql, key }) => {
        params.push(searchParams.get(key)); // Push corresponding value
        return sql;
      });

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    // Connect to the database
    const db = await pool.getConnection();
    if (!db) {
      return NextResponse.json(
        { error: "Failed to connect to the database" },
        { status: 500 }
      );
    }

    console.log("Database connection successful");

    // Execute the query
    const [rows] = await db.execute(query, params);

    // Release the connection
    db.release();

    // Return the query results
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}




// import { NextResponse } from "next/server";
// import pool from "@/app/lib/mysql";

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const queryType = searchParams.get("type"); // Type of query (news, category)
//     const id = searchParams.get("id"); // Specific ID
//     const category = searchParams.get("category"); // News category
//     const urltitle = searchParams.get("urltitle"); // Unique URL title

//     if (!queryType) {
//       return NextResponse.json(
//         { error: "Query type is required (e.g., 'type=news' or 'type=category')" },
//         { status: 400 }
//       );
//     }

//     // Initialize the query and parameters
//     let query = "";
//     const params = [];

//     // Determine query based on the queryType and parameters
//     switch (queryType) {
//       case "news":
//         if (id) {
//           query = "SELECT * FROM news WHERE id = ?";
//           params.push(id);
//         } else if (category) {
//           query = "SELECT * FROM news WHERE categoryname = ?";
//           params.push(category);
//         } else if (urltitle) {
//           query = "SELECT * FROM news WHERE urltitle = ?";
//           params.push(urltitle);
//         } else {
//           query = "SELECT * FROM news";
//         }
//         break;

//       case "category":
//         if (id) {
//           query = "SELECT * FROM category WHERE id = ?";
//           params.push(id);
//         } else {
//           query = "SELECT * FROM category";
//         }
//         break;

//       default:
//         return NextResponse.json(
//           { error: `Invalid query type: ${queryType}. Supported types: 'news', 'category'` },
//           { status: 400 }
//         );
//     }

//     // Connect to the database
//     const db = await pool.getConnection();
//     if (!db) {
//       return NextResponse.json(
//         { error: "Failed to connect to the database" },
//         { status: 500 }
//       );
//     }

//     console.log("Database connection successful");

//     // Execute the query
//     const [rows] = await db.execute(query, params);

//     // Release the connection back to the pool
//     db.release();

//     // Return the query result
//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error("Error in API route:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
