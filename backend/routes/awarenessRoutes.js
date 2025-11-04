import express from "express";
import { authenticateToken } from "./authRoutes.js";

const router = express.Router();

// Mock data for development when MongoDB is not connected
let mockPosts = [];
let nextId = 1;

// GET /api/awareness → list all awareness posts
router.get("/", async (req, res) => {
  try {
    // Try to import the model dynamically to check if MongoDB is connected
    let AwarenessPost;
    try {
      AwarenessPost = (await import("../models/AwarenessPost.js")).default;
    } catch (importError) {
      // If MongoDB is not connected, return mock data
      console.log("MongoDB not connected, returning mock data for awareness posts");
      return res.json(mockPosts);
    }
    
    const posts = await AwarenessPost.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email");
    res.json(posts);
  } catch (error) {
    console.error(error);
    // Return mock data as fallback
    res.json(mockPosts);
  }
});

// GET /api/awareness/:id → get single awareness post
router.get("/:id", async (req, res) => {
  try {
    // Try to import the model dynamically to check if MongoDB is connected
    let AwarenessPost;
    try {
      AwarenessPost = (await import("../models/AwarenessPost.js")).default;
    } catch (importError) {
      // If MongoDB is not connected, return mock data
      console.log("MongoDB not connected, returning mock data for awareness post");
      const post = mockPosts.find(p => p._id === req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      return res.json(post);
    }
    
    const post = await AwarenessPost.findById(req.params.id)
      .populate("author", "name email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/awareness → create new awareness post
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, content, mediaUrl, mediaType } = req.body;

    if (!title || !content) {
      return res.status(400).json({ 
        message: "Please provide title and content" 
      });
    }

    // Try to import the model dynamically to check if MongoDB is connected
    let AwarenessPost;
    try {
      AwarenessPost = (await import("../models/AwarenessPost.js")).default;
    } catch (importError) {
      // If MongoDB is not connected, use mock data
      console.log("MongoDB not connected, creating mock awareness post");
      const newPost = {
        _id: nextId++,
        title,
        content,
        mediaUrl: mediaUrl || "",
        mediaType: mediaType || "",
        author: req.user.id,
        authorName: req.user.name,
        likes: 0,
        likedBy: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      mockPosts.unshift(newPost);
      
      return res.status(201).json({ 
        message: "Awareness post created successfully!", 
        post: newPost 
      });
    }

    const newPost = new AwarenessPost({
      title,
      content,
      mediaUrl: mediaUrl || "",
      mediaType: mediaType || "",
      author: req.user.id,
      authorName: req.user.name
    });

    const savedPost = await newPost.save();
    
    // Populate author info before sending response
    await savedPost.populate("author", "name email");
    
    res.status(201).json({ 
      message: "Awareness post created successfully!", 
      post: savedPost 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/awareness/:id/like → like/unlike a post
router.put("/:id/like", authenticateToken, async (req, res) => {
  try {
    // Try to import the model dynamically to check if MongoDB is connected
    let AwarenessPost;
    try {
      AwarenessPost = (await import("../models/AwarenessPost.js")).default;
    } catch (importError) {
      // If MongoDB is not connected, use mock data
      console.log("MongoDB not connected, updating mock awareness post like");
      const postIndex = mockPosts.findIndex(p => p._id == req.params.id);
      if (postIndex === -1) return res.status(404).json({ message: "Post not found" });

      const post = mockPosts[postIndex];
      const userId = req.user.id;
      const userIndex = post.likedBy.indexOf(userId);

      if (userIndex === -1) {
        // User hasn't liked the post yet, so add like
        post.likedBy.push(userId);
        post.likes += 1;
      } else {
        // User has already liked the post, so remove like
        post.likedBy.splice(userIndex, 1);
        post.likes -= 1;
      }

      mockPosts[postIndex] = post;
      
      res.json({ 
        message: userIndex === -1 ? "Post liked!" : "Like removed",
        likes: post.likes
      });
      return;
    }
    
    const post = await AwarenessPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    const userIndex = post.likedBy.indexOf(userId);

    if (userIndex === -1) {
      // User hasn't liked the post yet, so add like
      post.likedBy.push(userId);
      post.likes += 1;
    } else {
      // User has already liked the post, so remove like
      post.likedBy.splice(userIndex, 1);
      post.likes -= 1;
    }

    await post.save();
    
    res.json({ 
      message: userIndex === -1 ? "Post liked!" : "Like removed",
      likes: post.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/awareness/:id → update awareness post
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    // Try to import the model dynamically to check if MongoDB is connected
    let AwarenessPost;
    try {
      AwarenessPost = (await import("../models/AwarenessPost.js")).default;
    } catch (importError) {
      // If MongoDB is not connected, use mock data
      console.log("MongoDB not connected, updating mock awareness post");
      const postIndex = mockPosts.findIndex(p => p._id == req.params.id);
      if (postIndex === -1) return res.status(404).json({ message: "Post not found" });

      const post = mockPosts[postIndex];
      
      // Check if user is the author
      if (post.author !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this post" });
      }

      const { title, content, mediaUrl, mediaType } = req.body;
      
      post.title = title || post.title;
      post.content = content || post.content;
      post.mediaUrl = mediaUrl || post.mediaUrl;
      post.mediaType = mediaType || post.mediaType;
      post.updatedAt = new Date();

      mockPosts[postIndex] = post;
      
      res.json({ 
        message: "Post updated successfully", 
        post 
      });
      return;
    }
    
    const post = await AwarenessPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    const { title, content, mediaUrl, mediaType } = req.body;
    
    post.title = title || post.title;
    post.content = content || post.content;
    post.mediaUrl = mediaUrl || post.mediaUrl;
    post.mediaType = mediaType || post.mediaType;
    post.updatedAt = Date.now();

    const updatedPost = await post.save();
    
    // Populate author info before sending response
    await updatedPost.populate("author", "name email");
    
    res.json({ 
      message: "Post updated successfully", 
      post: updatedPost 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/awareness/:id → delete awareness post
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    // Try to import the model dynamically to check if MongoDB is connected
    let AwarenessPost;
    try {
      AwarenessPost = (await import("../models/AwarenessPost.js")).default;
    } catch (importError) {
      // If MongoDB is not connected, use mock data
      console.log("MongoDB not connected, deleting mock awareness post");
      const postIndex = mockPosts.findIndex(p => p._id == req.params.id);
      if (postIndex === -1) return res.status(404).json({ message: "Post not found" });

      const post = mockPosts[postIndex];
      
      // Check if user is the author
      if (post.author !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this post" });
      }

      mockPosts.splice(postIndex, 1);
      
      res.json({ message: "Post deleted successfully" });
      return;
    }
    
    const post = await AwarenessPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await AwarenessPost.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;