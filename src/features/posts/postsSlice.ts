import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: string
  title: string
  content: string
}

const initialState: Post[] = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string) {
        return {
          payload: { id: nanoid(), title, content },
        }
      },
    },
    editPost(state, action: PayloadAction<Post>) {
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
