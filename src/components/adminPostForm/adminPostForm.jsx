"use client"
import { addPost } from '../../lib/action';
import { useFormState} from 'react-dom'

import styles from './adminpost.module.css'

const adminPostForm = ({userId}) => {
  const [state, formAction] = useFormState(addPost, undefined);
  return (
    <form action={formAction} className={styles.form}>
      <h1>Add New Post</h1>
      <input type="hidden" name='userId' value={userId}/>
      <input type="text" name='title' placeholder='Title' />
      <input type="text" name='slug' placeholder='Slug' />
      <input type="text" name='img' placeholder='Image url' />
      <textarea name="desc" placeholder="Description" cols="30" rows={10}></textarea>
      <button>Add Post</button>
      {state?.error}
    </form>
  )
}

export default adminPostForm