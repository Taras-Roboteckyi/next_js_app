"use client";

import Feed from "@components/Feed";

import { useState, useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("first");
  }, []);

  return (
    <section
      className="w-full flex-center flex-col" /* //w-full - width:100% */
    >
      <h1
        className="head_text text-center" /* //head_text-взято з global.css */
      >
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
