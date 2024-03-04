import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from 'bcrypt';
import {authConfig} from './auth.config';


const login = async (credentials) => {
    try {
        connectToDb();
        const user =await User.findOne({email: credentials.email});

        if(!user){
            throw new Error("Invalid user credentials");
        }

        //compare the user password with stored password
        const isPasswordCorrect =  await bcrypt.compare(credentials.password, user.password);

        if(!isPasswordCorrect){
            throw new Error("Wrong credentials");
        }

        return user;

    } catch (error) {
        console.log(error);
        throw new Error("Failed to login");
    }
}

export const { 
    handlers:{GET, POST}, 
    auth, 
    signIn, 
    signOut 
    } = NextAuth({ 
    ...authConfig,
    providers: [ //social media signin
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET 
        }),
    CredentialsProvider({
        async authorize(credentials){
            //implement the login function
            try {
                const user =  await login(credentials);
                return user;
            } catch (error) {
                return null;
            }
        }
    })
    ],
    callbacks:{
        async signIn({user, account, profile}) {
            console.log(user, account, profile)
            
            if(account.provider === "github") {
                connectToDb();
                try {
                    //check if user exists in the database
                    const user = await User.findOne({email: profile.email});

                    if(!user){
                        //create new user
                        const newUser = new User({
                            username: profile.login, //login is the username for github
                            email: profile.email,
                            image: profile.avatar_url,
                        });
                        await newUser.save();
                    }
                } catch (error) {
                    console.log(error)
                    return false;
                }
            }
            return true;
        },
        ...authConfig.callbacks,
    },
 });