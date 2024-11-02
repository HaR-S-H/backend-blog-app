import Post from "../models/post.models.js";

const createPosts = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "please provide all required fields" });
        }

        const post = new Post({
            title,
            content,
            tags,
            authorId: req.user.id,
        })
        await post.save()
            .then(() => { 
                res.status(201).json({message:"post saved successfully"});
            })
            .catch((error) => {
            console.log(error);
            
            res.status(500).json({ message: "error is occured while saving post" });
        })

        
    } catch (error) {
        res.status(400).json({ message: "error is occured while creating a post" });
    }
}

const getPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: "Posts found successfully", posts });

    } catch (error) {
        res.status(400).json({message:"error is occured while getting posts" });
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        res.status(200).json({ message: "post updated successfully", post });
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ message: "error is occured while updating post" });
    }

}

const deletePost = async (req, res) => { 
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        res.status(200).json({ message: "post deleted successfully" , post });
    } catch (error) {
        res.status(400).json({message: "error is occured while deleting post" });
    }
}

export { createPosts, getPosts,updatePost,deletePost };