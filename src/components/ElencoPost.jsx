import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function ElencoPost() {
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchPosts = async () => {
    const { data: response } = await axios.get(`${apiUrl}/api/posts`);
    setPosts(response);
    console.log(response);
  };

  const fetchCategories = async () => {
    const { data: response } = await axios.get(`${apiUrl}/api/categories`);
    setCategories(response);
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <>
      <CreatePost categories={categories} onPostCreated={handlePostCreated} />
      <div className="posts">
        {posts === null && 'Caricando posts...'}
        {posts?.length === 0 && 'Nessun posts trovato.'}
        {posts?.length > 0 &&
          posts.map((p) => (
            <PostCard
              key={`post${p.id}`}
              image={p.image}
              title={p.title}
              content={p.content}
              category={p.category}
              tags={p.tags}
              published={false}
            />
          ))}
      </div>
    </>
  );
}
