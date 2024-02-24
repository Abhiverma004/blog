// AppContextProvider.js
import React, { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  async function fetchBlogPosts(page = 1) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    console.log("Printing the final URL:", url);

    try {
      const result = await fetch(url);
      const data = await result.json();
      console.log("Fetched data:", data);

      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error in fetching data:", error);
      
    } finally {
      setLoading(false);
    }
  }
  function handlePageChange(page){
    setPage(page);
    fetchBlogPosts(page)
  }

  const value = {
    loading,
    setLoading,
    posts,
    setPosts,
    page,
    handlePageChange,
    totalPages,
    setTotalPages,
    fetchBlogPosts, // Consistent function name
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

