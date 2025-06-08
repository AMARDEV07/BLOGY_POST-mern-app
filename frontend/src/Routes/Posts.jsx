// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function Posts() {
//   const [searchParams] = useSearchParams();
//   const search = searchParams.get("search") || "";
//   const [blogs, setBlogs] = useState([]);
//   const [aiContent, setAiContent] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/api/posts?search=${search}`);
//       if (res.data.length > 0) {
//         setBlogs(res.data);
//         setAiContent("");
//       } else {
//         toast("No blog found. Generating from AI...");
//         setBlogs([]);
//         generateAiContent(search);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateAiContent = async (query) => {
//     try {
//       const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const result = await model.generateContent(`Write a blog about: "${query}"`);
//       const response = await result.response;
//       const text = await response.text();
//       setAiContent(text);
//     } catch (err) {
//       toast.error("AI failed");
//     }
//   };

//   useEffect(() => {
//     if (search) {
//       fetchBlogs();
//     }
//   }, [search]);

//   return (
//     <div className="p-4">
//       {loading && <p>Loading...</p>}

//       {blogs.length > 0 ? (
//         blogs.map((blog) => (
//           <div key={blog._id} className="mb-4 p-4 border rounded">
//             <h2 className="text-xl font-bold">{blog.title}</h2>
//             <p>{blog.content}</p>
//           </div>
//         ))
//       ) : aiContent ? (
//         <div className="bg-yellow-100 p-4 rounded">
//           <h2 className="text-lg font-semibold">AI-Generated Content:</h2>
//           <p>{aiContent}</p>
//         </div>
//       ) : (
//         !loading && <p>No results found.</p>
//       )}
//     </div>
//   );
// }

// export default Posts;
