const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")



beforeEach(async () => {
    await Blog.deleteMany({})
    
    for(let blog of helper.initialBlogs){
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id property', async () => {
  const response = await api.get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  for(blog of response.body){
    expect(blog.id).toBeDefined()
  }
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'my story',
    author: 'Buket Karakaş',
    url: 'wwwwww',
    likes: 85
  }

  await apivalid
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'my story'
  )
})

test('a blog without likes can be added', async () => {
  const newBlog = {
    title: 'my toy story',
    author: 'Berk Karakaş',
    url: 'wwwwww'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
  
})

afterAll(() => {
    mongoose.connection.close()
})
