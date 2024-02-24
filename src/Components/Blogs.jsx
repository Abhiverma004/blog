// ... (import statements remain the same)
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import Spinner from './Spinner';
import './Blogs.css'

const Blogs = () => {
  const { posts, loading } = useContext(AppContext);
  console.log("printing inside blogs component");
  console.log(posts);
  
  return (
    <div className='w-11/12 max-w-[450px]'>
      {loading ? (
        <Spinner />
      ) : posts.length === 0 ? (
        <div>
          <p>No Post Found</p>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <p className='title text-xl'>{post.title}</p>
            <p>
              By <span>{post.author}</span> on <span>{post.category}</span>
            </p>
            <p>Posted on {post.data}</p>
            <p>{post.content}</p>

            <div>
              {Array.isArray(post.tag) && post.tag.length > 0 ? (
                post.tag.map((tag, index) => (
                  <span key={index}>{`#${tag}`}</span>
                ))
              ) : (
                <span>No tags available</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;

