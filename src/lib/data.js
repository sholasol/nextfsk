import {Post, User} from "./models";
import {connectToDb} from "./utils";
import { unstable_noStore as noStore } from "next/cache";
//TEMPORARY DATA

// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

export const getPosts = async () => {
    //return posts;
    try {
      connectToDb();
      const posts = await Post.find();
      return posts;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to Fetch posts");
    }
}

export const getPost = async (slug) => {
    //return posts.find((post) => post.id === parseInt(id));
    try {
      connectToDb();
      const post = await Post.findOne({slug});
      return post;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to Fetch post");
    }
}

export const getUsers = async () => {
    //return users;

    try {
      connectToDb();
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to Fetch users");
    }
}

export const getUser = async (id) => {
    //return users.find((user) => user.id ===id);

    try {
      connectToDb();
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log(error)
      throw new Error("Failed to Fetch user");
    }
}