import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { editPost, Post } from './postsSlice'

interface EditPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface EditPostFormElements extends HTMLFormElement {
  readonly elements: EditPostFormFields
}

export const EditPostForm = () => {
  const { postId } = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentPost = useAppSelector((state) => state.posts.find((post) => post.id === postId))

  if (!currentPost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onSavePostClicked = (e: React.FormEvent<EditPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    if (title && content) {
      dispatch(editPost({ id: currentPost.id, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit post</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Post title:</label>
        <input type="text" id="postTitle" name="postTitle" defaultValue={currentPost.title} required />

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue={currentPost.content} required />

        <button>Save post</button>
      </form>
    </section>
  )
}
