import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'Berk Türetken',
    url: 'www.lalaland.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogInfo =  component.getByTestId('blogInfo')

  const url = await component.queryByTestId('url')
  const likes = await component.queryByTestId('likes')
  const removeButton = await component.queryByTestId('remove')

  expect(blogInfo).toHaveTextContent(
    'This is a test blog'
  )

  expect(url).toBeNull()
  expect(likes).toBeNull()
  expect(removeButton).toBeNull()
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'This is a test blog',
    author: 'Berk Türetken',
    url: 'www.lalaland.com',
    likes: 0
  }
  const component = render(
    <Blog blog={blog}/>
  )

  const blogInfo = component.getByTestId('blogInfo')
  const buttonView = component.getByTestId('viewButton')

  expect(blogInfo).toHaveTextContent(
    'This is a test blog'
  )


  fireEvent.click(buttonView)

  const url = component.getByTestId('url')
  const likes = component.getByTestId('likes')
  const buttonLike = component.getByTestId('likeButton')
  const buttonRemove = component.getByTestId('removeButton')


  expect(url).toHaveTextContent('www.lalaland.com')
  expect(likes).toHaveTextContent('0')
  expect(buttonLike).toBeDefined()
  expect(buttonRemove).toBeDefined()
})

test('counts like button clicks', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'Berk Türetken',
    url: 'www.lalaland.com',
    likes: 0
  }
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeClick={mockHandler}/>
  )

  const blogInfo = component.getByTestId('blogInfo')
  const buttonView = component.getByTestId('viewButton')

  expect(blogInfo).toHaveTextContent(
    'This is a test blog'
  )


  fireEvent.click(buttonView)

  const buttonLike = component.getByTestId('likeButton')

  await fireEvent.click(buttonLike)
  await fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('tests blog creation form', async () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm handleCreateBlog={createBlog}/>
  )

  const titleInput = component.getByTestId('title')
  fireEvent.change(titleInput, { target: { value: 'Title1' } })
  const authorInput = component.getByTestId('author')
  fireEvent.change(authorInput, { target: { value: 'Author1' } })
  const urlInput = component.getByTestId('url')
  fireEvent.change(urlInput, { target: { value: 'Url1' } })

  fireEvent.click(component.getByTestId('createBlog'))

  expect(createBlog).toBeCalledWith(
    'Title1',
    'Author1',
    'Url1'
  )
})