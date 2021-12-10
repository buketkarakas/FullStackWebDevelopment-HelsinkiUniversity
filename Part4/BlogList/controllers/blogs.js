require('express-async-errors')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    if(!request.body.title || !request.body.url)
      response.status(400).json({ error: 'title or url is missing' })
    else{
      const user = await User.findById(request.body.user)
      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
      })
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      await user.save()
      response.status(201).json(result)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(blog){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
  response.status(200).end()

})

module.exports = blogsRouter