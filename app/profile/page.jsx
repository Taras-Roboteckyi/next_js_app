"use client";

import React from "react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      //Отримуємо дані(пости) тільки одного користувача, а не всіх одразу

      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts(); //Якщо є юзер, тоді робимо запит за даними юзера
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post.id}`);
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
