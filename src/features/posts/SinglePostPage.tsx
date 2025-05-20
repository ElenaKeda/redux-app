import { useAppSelector } from '@/app/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const currentPost = useAppSelector(state => selectPostById(state, postId!))

  if (!currentPost) {
    return (
      <section>
        <h2>Current post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{currentPost.title}</h2>
        <p className="post-content">{currentPost.content}</p>
        <Link to={`/editPost/${currentPost.id}`} className="button">
          Edit post
        </Link>
      </article>
    </section>
  )
}
