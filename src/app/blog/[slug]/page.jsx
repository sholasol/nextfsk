import Image from 'next/image'
import styles from './singlePost.module.css'
 
const SinglePost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/blog.jpg" alt='Post' fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image src="/user.jpg" className={styles.avatar} width={40} height={40} alt="user" />
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Author</span>
            <span className={styles.detailValue}>John Doe</span>
          </div> 
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>01.03.2024</span>
          </div> 
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit omnis porro ullam veritatis doloribus est, dolorem nostrum, sed vel iusto laboriosam adipisci inventore, amet alias culpa quidem voluptatum. In, corrupti.
        </div>
      </div>
    </div>
  )
}

export default SinglePost