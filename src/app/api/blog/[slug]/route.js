import {connectToDb} from '../../../lib/utils'
import {Post} from '../../../lib/models'
import { NextResponse } from 'next/server'

export const GET = async (request, {params}) => {

    const {slug} = params;

    try {
        connectToDb()

        const post = await Post.findOne(slug);
        return NextResponse.json(posts);

    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch a post")
    }
}

//delete blog
export const DELETE = async (request, {params}) => {

    const {slug} = params;

    try {
        connectToDb()

        const post = await Post.deleteOne(slug);
        return NextResponse.json("Post deleted successfully");

    } catch (error) {
        console.log(error)
        throw new Error("Failed to delete a post")
    }
}