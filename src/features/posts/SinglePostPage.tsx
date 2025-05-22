import { useAppSelector } from '@/app/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from '@/components/TimeAgo'

export const SinglePostPage = () => {
  const { postId } = useParams()

  const currentPost = useAppSelector((state) => selectPostById(state, postId!))

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
        <div>
          <h2>{currentPost.title}</h2>
          <PostAuthor userId={currentPost.user} />
          <p className="post-content">{currentPost.content}</p>
          <TimeAgo timestamp={currentPost.date} />
        </div>
        <Link to={`/editPost/${currentPost.id}`} className="button">
          Edit post
        </Link>
      </article>
    </section>
  )
}
