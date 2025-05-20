import React from 'react'

import { useAppDispatch } from '@/app/hooks'

import { addPost } from './postsSlice'

interface AddPostFormFields extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement
  postContent: HTMLTextAreaElement
}

interface AddPostFormElements extends HTMLFormElement {
  readonly elements: AddPostFormFields
}

export const AddPostForm = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<AddPostFormElements>) => {
    e.preventDefault()

    const { elements } = e.currentTarget
    const title = elements.postTitle.value
    const content = elements.postContent.value

    dispatch(addPost(title, content))

    e.currentTarget.reset()
  }

  return (
    <section>
      <h2>Add a new post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post title:</label>
        <input type="text" id="postTitle" defaultValue="" required />

        <label htmlFor="postContent">Content:</label>
        <textarea id="postContent" name="postContent" defaultValue="" required />

        <button>Save post</button>
      </form>
    </section>
  )
}
