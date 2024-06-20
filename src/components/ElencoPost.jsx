import axios from 'axios';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';

const apiUrl = import.meta.env.VITE_BASE_API_URL;

export default function () {
  const [posts, setPosts] = useState(null);

  const fetchPosts = async () => {
    const { data: response } = await axios.get(`${apiUrl}/api/posts`);
    setPosts(response);
    console.log(response);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
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
              category={[]}
              tags={[]}
              published={false}
            />
          ))}
      </div>
    </>
  );
}
