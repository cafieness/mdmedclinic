import React from 'react'

import {blogPosts} from '../../db';
import { Link } from "react-router-dom";




function Blog() {
    return (
        <div className="bg-blog relative pt-40">
            <div className="flex md:flex-col md:w-full items-center w-4/5 mx-auto mb-40 lg:mx-0 px-10">
                <img className="blog-image md:mb-10" src={blogPosts[0].image} alt="" />
                <div className="md:ml-0 ml-20">
                    <div className="text-5xl mb-8 md:text-2xl md:mb-5">{blogPosts[0].title}</div>
                    <div className="text-lg first-blog-width mb-12 md:text-base truncate">{blogPosts[0].fullDesc}</div>
                    <Link to={`/blog/${blogPosts[0].id}/${blogPosts[0].title}`}><button className="text-2xl w-300 border-black border-2 rounded-3xl py-2 transform duration-200 ease-in-out hover:bg-white">Подробнее</button>
                    </Link>
                    
                </div>
            </div>
            <div className=" bg-white py-20">
                <div className="w-full blogposts-width xl:grid-cols-2 grid grid-cols-3 justify-items-center">
                {blogPosts.map(post=>(    
                    (blogPosts[0]!==post)&&
                    <div className="p-4 w-450 mb-8 sm:w-300">
                        <img src={post.image} alt="" />
                        <div className="text-2xl mb-4 mt-8 font-bold">{post.title}</div>
                        <div className="mb-4 truncate">{post.fullDesc}</div>
                        <Link to={`/blog/${post.id}/${post.title}`} className="font-bold">Подробнее</Link>
                    </div>
                
            ))}
                </div>
                
            </div>
            
        </div>
    )
}

export default Blog
