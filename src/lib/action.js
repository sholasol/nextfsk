"use server"

import { connectToDb } from "./utils";
import {Post} from '../lib/models';
import { revalidatePath } from "next/cache";

export const addPost = async (formData) => {
    

    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");

    const {title, desc, slug, userId} = Object.fromEntries(formData);

   try {
        connectToDb();
        const newPost = new Post({
            title, 
            desc, 
            slug, 
            userId
        });

        await newPost.save();
        console.log("Saved to DB")
        revalidatePath("/blog")
   } catch (error) {
        console.log(error)
        return {error: "Something went wrong"};
   }
};

export const deletePost = async (formData) => {
    
    const {id} = Object.fromEntries(formData);

    try {
        connectToDb();

        await Post.findByIdAndDelete(id);
        console.log("Post deleted successfully");
        revalidatePath("/blog");
    } catch (error) {
        console.log(error)
        return {error: "Something went wrong"};
    }
}