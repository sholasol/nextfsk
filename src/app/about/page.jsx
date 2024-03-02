import Image from "next/image"
import styles from './about.module.css'

const About = () => {
  return (
    <>
      <div>About</div>
      <div className={styles.imgContainer}>
          <Image src="/about.png" width={500} height={500} alt="about-us"/>
      </div>
    </>
    
  )
}

export default About