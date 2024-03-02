import styles from './blog.module.css'
import PostCard from '../../components/postCard/PostCard'
// import { cache } from 'react';
import  {getPosts}  from '../../lib/data';

// const getData = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {cache: "no-store"})

//   if(!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json()
// }

const BlogPage = async () => {

  //With API
   //const posts  = await getData();

   //without API
  const posts  = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post}/>
          </div>
      ))}
      
    </div>
  )
}

export default BlogPage