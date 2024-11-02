import express from "express";
import dotenv from "dotenv";
import connectedDB from "./db/connection.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.routes.js";
import commentRoute from "./routes/comment.routes.js";
import likeRoute from "./routes/like.routes.js";
dotenv.config();
connectedDB();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);
app.use("/api/v1/likes", likeRoute);
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
    
})