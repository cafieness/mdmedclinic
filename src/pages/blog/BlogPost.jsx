import React from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../../db";

function getPost(id) {
  for (let i = 0; i < blogPosts.length; i++) {
    if (id == blogPosts[i].id) {
      return blogPosts[i];
    }
  }
}

function BlogPost() {
  const { id, name } = useParams();

  const post = getPost(id);
  return (
    <div className="py-40 sm:py-28">
        <div className="w-4/5 mx-auto">
        <img src={post.image} alt="" className=" float-left w-500 object-cover rounded-3xl m-10 md:m-0 md:mb-8" />
        <div >
          <div className="text-4xl sm:text-2xl font-bold pt-20 mb-8 md:text-center">{post.title}</div>
          <div >{post.fullDesc}</div>
        </div>
        </div>
        
    </div>
  );
}

export default BlogPost;
