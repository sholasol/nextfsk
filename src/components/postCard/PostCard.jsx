import Image from 'next/image'
import styles from './postCard.module.css'
import Link from 'next/link'

const PostCard = ({post}) => {
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            {post.img && <div className={styles.imgContainer}>
                <Image src={post.img} alt='Post' fill className={styles.img} />
            </div>}
            <span className={styles.date}>01.01.2024</span>
        </div>
        <div className={styles.bottom}>
            <h1 className={styles.title}>{post.title.substring(0,20)}</h1>
            <p className={styles.desc}>{post.desc.substring(0,100)}</p>
            <Link href={`/blog/${post.slug}`}>More Info</Link>
        </div>
    </div>
  )
}

export default PostCard