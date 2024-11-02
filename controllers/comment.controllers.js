import Comment from "../models/comment.models.js";
import Post from "../models/post.models.js";
const createComment = async(req, res) =>{
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }
        const { id } = req.params;
        console.log(id);
        
        const post = await Post.findById(id)
        if (!post) { 
            return res.status(404).json({ message: "Post not found" });
        }
        const comment = new Comment({
            content,
            postId:id,
            userId: req.user.id
        })
        await comment.save()
            .then(() => {
                res.status(201).json({ message: "Comment created successfully", comment });
            }).catch((err) => { 
                console.log(err);
                
                res.status(500).json({ message:"Error saving comment" });
            })
        
    } catch (error) {
        res.status(500).json({ message: "Error while creating comment" });
    }
}

const updateComment = async (req, res) => { 
    try {
        const { content } = req.body;
        if (!content) { 
            return res.status(400).json({ message: "Content is required" });
        }
        const { postId,commentId } = req.params;
        const post = await Post.findById(postId);
        if (!post) { 
            return res.status(404).json({ message: "Post not found" });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) { 
            return res.status(404).json({ message: "Comment not found" });
        }
            
        if (comment.userId.toString() !== req.user.id) {
            return res.status(404).json({ message: "you are not allowed to edit this comment" });
        }
        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
        res.status(200).json({ message: "Comment updated successfully", updatedComment });
    } catch (error) {
        res.status(500).json({ message: "Error while updating comment" });
    }
}

const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        if (comment.userId.toString() !== req.user.id && post.authorId.toString() !== req.user.id) {
            return res.status(400).json({ message: "you are authorized not to delete this comment" });
        }
        await Comment.findByIdAndDelete(commentId, {
            new :true,
        });
        res.status(200).json({ message: "Comment deleted successfully", comment });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting comment" });
    }

}

export { createComment,updateComment,deleteComment};