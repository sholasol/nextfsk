import styles from './postUser.module.css'
// import {getPosts} from '../../../lib/data'
import { getUser } from '../../lib/data';
import Image from 'next/image';

// const getData = async (userId) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

//   if(!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json()
// }

const PostUser = async ({userId}) => {
    const user = await getUser(userId);

  return (
      <div className={styles.container}>
          <Image src={user.img ? user.img : '/user.jpg'} className={styles.avatar} width={40} height={40} alt="user" />
          <div className={styles.texts}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}>{user.username}</span>
          </div>
            
      </div> 
  )
}

export default PostUser