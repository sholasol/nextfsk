import {addPost, deletePost} from '../../lib/action'

const ServerTestPage = () => {
    // const actionInComponent = async () => {
    //     "use server"
    //     console.log("Say Hello")
    // }
  return (
    <div>
        <form action={addPost}>
            <input type='text' placeholder='title' name='title'/><br/>
            <input type='text' placeholder='desc' name='desc'/><br/>
            <input type='text' placeholder='slug' name='slug'/><br/>
            <input type='text' placeholder='userId' name='userId'/><br/>
            <button>Create Post</button>
        </form>


        <form action={deletePost}>
            <input type='text' name='id' placeholder='PostId'/>
            <button>Delete Post</button>
        </form>
    </div>
  )
}

export default ServerTestPage