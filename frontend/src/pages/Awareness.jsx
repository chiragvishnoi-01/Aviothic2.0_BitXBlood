import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "../api/axiosConfig.js";

const Awareness = () => {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    mediaUrl: "",
    mediaType: "image"
  });

  // Fetch all awareness posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/awareness");
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch awareness posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/awareness", newPost);
      setPosts(prev => [response.data.post, ...prev]);
      setNewPost({
        title: "",
        content: "",
        mediaUrl: "",
        mediaType: "image"
      });
      setShowCreateForm(false);
    } catch (err) {
      setError("Failed to create post");
      console.error("Error creating post:", err);
    }
  };

  // Handle like/unlike
  const handleLike = async (postId) => {
    try {
      const response = await axios.put(`/awareness/${postId}/like`);
      setPosts(prev => prev.map(post => 
        post._id === postId 
          ? { ...post, likes: response.data.likes } 
          : post
      ));
    } catch (err) {
      setError("Failed to like post");
      console.error("Error liking post:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading awareness posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎗️ Blood Donation Awareness
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Share stories, experiences, and educational content to promote blood donation awareness in your community.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Create Post Button */}
        <div className="mb-8 text-center">
          {isAuthenticated ? (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-3 rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition-all shadow-lg"
            >
              {showCreateForm ? "Cancel" : "➕ Create Awareness Post"}
            </button>
          ) : (
            <p className="text-gray-600">
              <a href="/login" className="text-red-600 font-bold hover:underline">Login</a> to create awareness posts
            </p>
          )}
        </div>

        {/* Create Post Form */}
        {showCreateForm && isAuthenticated && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-red-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter a compelling title for your post"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Content *</label>
                <textarea
                  name="content"
                  value={newPost.content}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Share your story, experience, or educational content about blood donation..."
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Media URL (Optional)</label>
                <input
                  type="url"
                  name="mediaUrl"
                  value={newPost.mediaUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="https://example.com/image.jpg or https://youtube.com/watch?v=..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Media Type</label>
                <select
                  name="mediaType"
                  value={newPost.mediaType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-6 py-2 rounded-lg font-bold hover:from-red-700 hover:to-rose-700 transition-all shadow-md"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Posts List */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No awareness posts yet</h3>
              <p className="text-gray-600">
                Be the first to share your blood donation story or educational content!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100">
                {post.mediaUrl && (
                  <div className="w-full h-64 bg-gray-200">
                    {post.mediaType === "image" ? (
                      <img 
                        src={post.mediaUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">Image not available</div>';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🎥</div>
                          <p className="text-gray-600">Video Content</p>
                          <a 
                            href={post.mediaUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-red-600 font-bold hover:underline mt-2 inline-block"
                          >
                            Watch Video
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{post.authorName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 whitespace-pre-line">{post.content}</p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                        post.likedBy?.includes(user?._id) 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      ❤️ {post.likes} {post.likes === 1 ? 'Like' : 'Likes'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Awareness;