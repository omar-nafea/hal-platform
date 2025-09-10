import { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8001/api/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
        setError("Failed to load posts. Is the Laravel API server running?");
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent"></div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative max-w-xl mx-auto mt-8">
        {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl font-serif font-bold mb-8 text-center">All Posts</h2>
      {posts.length > 0 ? (
        <ul className="space-y-8">
          {posts.map((post) => (
            <li
              key={post.id}
              className="bg-secondary rounded-xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border border-accent/30"
            >
              <h3 className="text-2xl font-serif font-bold text-text-primary mb-3">{post.title}</h3>
              <p className="text-text-secondary leading-relaxed">{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-text-secondary text-center">No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
