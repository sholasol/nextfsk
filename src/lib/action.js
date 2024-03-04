"use server"

import { connectToDb } from "./utils";
import {Post, User} from '../lib/models';
import { revalidatePath } from "next/cache";
import {signIn, signOut} from './auth'
import bcrypt from 'bcrypt';

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

//login with Social media {GitHub}
export const handleGithubLogin = async () => {
    "use server";
    await signIn("github") //sigin in provider with github
  }

export const handleLogout = async () => {
     "use server";
    await signOut() //sigin out function
}


//user registration
export const register = async (previousState, formData) => {
    const {
        username, 
        email, 
        password, 
        passwordRepeat,
        img
    } = Object.fromEntries(formData);
    if(password !== passwordRepeat) {
        // return "Password does not match";
        return {error: "Passwords do not match"};
    }

    try {
        connectToDb();

        //check if user already exists
        const user = await User.findOne({username})
        if(user) { 
            // return "User already exists"
            return {error: "User already exists"};
        };

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create the user
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            img
        });
        await newUser.save();
        console.log("User created successfully")
        return {success: true};
    } catch (error) {
        console.log(error)
        //return {error: "Something went wrong"}
        return {error: "Something went wrong"};
    }
}

export const login = async (previousState, formData) => {
    const {
        email, 
        password,
    } = Object.fromEntries(formData);

    try {
        await signIn("credentials", {email, password})

    } catch (error) {
         //console.log(error);
        if(error.message.includes("CredentialsSignin")) {
            return {error: "Invalid user credentials"};
        }
        // return {error: "Something went wrong"};
        throw error;
    }
}