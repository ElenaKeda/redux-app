import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

export interface Post {
  id: string
  title: string
  content: string
  user: string
  date: string
}

type EditPostType = Pick<Post, 'id' | 'title' | 'content'>

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0', date: sub(new Date(), { minutes: 10 }).toISOString() },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId, date: new Date().toISOString() },
        }
      },
    },
    editPost(state, action: PayloadAction<EditPostType>) {
      const { id, title, content } = action.payload
      const currentPost = state.find((post) => post.id === id)

      if (currentPost) {
        currentPost.title = title
        currentPost.content = content
      }
    },
  },
  selectors: {
    selectAllPosts: (postsState) => postsState,
    selectPostById: (postsState, postId: string) => postsState.find((post) => post.id === postId),
  },
})

export const { addPost, editPost } = postsSlice.actions
export const { selectAllPosts, selectPostById } = postsSlice.selectors
export const postsReducer = postsSlice.reducer
