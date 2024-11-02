import Like from "../models/like.models.js";
import Post from "../models/post.models.js";
const addLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        
        const like = new Like({
            postId,
            userId: req.user.id,
        });
        
        await like.save()
            .then(() => {
            res.json({ message: "like added successfully",like });
            })
            .catch((err) => {
            res.status(400).json({ message: "error in saving a like" });
            });
    } catch (error) {
        res.status(400).json({ message: "error in adding a like" });
    }
}

const deleteLike = async (req, res) => { 
    try { 
        const { postId, likeId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }
        const like = await Like.findById(likeId);
        if (!like) {
            return res.status(404).json({ message: "like not found" });
        }
        if (like.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "unauthorized to delete this like" });
        }
        await Like.findByIdAndDelete(likeId, {
            new :true,
        });
        res.json({ message: "like deleted successfully",like });

    } catch (error) {
        res.status(400).json({ message: "error in deleting a like" });
    }
}


export { addLike,deleteLike };
    