import Image from 'next/image'
import PostUser from '../../../components/postUser/postUser'
import styles from './singlePost.module.css'
import { Suspense } from 'react'
import  {getPost}  from '../../lib/data';



//With API
//const getData = async (slug) => {
  //With API

//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`, {cache: "no-store"})

//   if(!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json()
// }
export const generateMetaData = async ({params}) => {
    const {slug} = params;

    const post = await getPost(slug);

    return {
      title: post.title,
      description: post.desc,
    };
}


 
const SinglePost = async ({params}) => {
  const {slug} = params;

  const post  = await getPost(slug);

  console.log(post)

  return (
    <div className={styles.container}>
      {post?.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          
          {post && (
            <>
              <Suspense fallback={<div>Loading...</div>}></Suspense>
              <PostUser userId={post?.userId}/>
            </>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>{post.createdAt.toString().slice(0,16)}</span>
          </div> 
        </div>
        <div className={styles.content}>
          {post?.desc}
        </div>
      </div>
    </div>
  )
}

export default SinglePost