"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

//PromptCardList буде використовуватись тільки в цьому компоненті, тому записуєм так
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  //Search state
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //Фільтруємо Prompts на основі цих запитів
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // "i" - flag for case-insensitive search
    return allPosts.filter((item) => {
      regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt);
    });
  };

  const handleSearchChange = (e) => {};

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={allPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
