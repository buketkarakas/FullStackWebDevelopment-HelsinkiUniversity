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

describe("Getting all blogs", () =>{
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
    
    for(tempBlog of response.body){
      expect(tempBlog.id).toBeDefined()
    }
  })

})

describe("Posting a blog", () => {
  test('a valid blog can be added', async () => {
    const addedUser = await api.post('/api/users')
        .send({ name: 'test123456', username: 'test123456', password: 'test123456' });


    const loggedUser = await api
    .post("/api/login")
    .send({ username: 'test123456', password: 'test123456' })
    .expect(200)
    .expect('Content-type', /application\/json/)

    const newBlog = {
      title: 'my story',
      author: 'Buket Karakaş',
      url: 'wwwwww',
      likes: 85
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${loggedUser.body.token}`)
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
    const addedUser = await api.post('/api/users')
        .send({ name: 'test123456', username: 'test123456', password: 'test123456' });

    const loggedUser = await api
    .post("/api/login")
    .send({ username: 'test123456', password: 'test123456' })
    .expect(200)
    .expect('Content-type', /application\/json/)

    const newBlog = {
      title: 'my toy story',
      author: 'Berk Karakaş',
      url: 'wwwwww'
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${loggedUser.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.likes).toBe(0)
    
  })
  
  test('a blog without title will not be be added', async () => {
    const addedUser = await api.post('/api/users')
        .send({ name: 'test123456', username: 'test123456', password: 'test123456' });

    const loggedUser = await api
    .post("/api/login")
    .send({ username: 'test123456', password: 'test123456' })
    .expect(200)
    .expect('Content-type', /application\/json/)

    const newBlog = {
      author: 'Berk dasd',
      url: 'wwwwww',
      likes: 10
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${loggedUser.body.token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    
  })
  
  test('a blog without url will not be be added', async () => {
    const addedUser = await api.post('/api/users')
        .send({ name: 'test123456', username: 'test123456', password: 'test123456' });

    const loggedUser = await api
    .post("/api/login")
    .send({ username: 'test123456', password: 'test123456' })
    .expect(200)
    .expect('Content-type', /application\/json/)

    const newBlog = {
      title:"Story of my life",
      author: 'Berk dasd',
      likes: 10
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${loggedUser.body.token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    
  })


})



describe("Deleting a blog",  () => {
  test("Inserting and deleting a blog", async () => {
    const addedUser = await api.post('/api/users')
        .send({ name: 'test123456', username: 'test123456', password: 'test123456' });

    const loggedUser = await api
    .post("/api/login")
    .send({ username: 'test123456', password: 'test123456' })
    .expect(200)
    .expect('Content-type', /application\/json/)
    
    const newBlog = {
      title: 'temp blog',
      author: 'Buket Karakaş',
      url: 'wwwwww',
      likes: 85
    }
    let addedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`bearer ${loggedUser.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    console.log(typeof(addedBlog.body.id))
    await api
      .delete(`/api/blogs/${addedBlog.body.id}`)
      .set('Authorization',`bearer ${loggedUser.body.token}`)
      .expect(204)
  })
})

describe("Updating a blog ",  () => {
  test("with new like number and title", async () => {
    const idTobeUpdated = await helper.createNewNote()
    const newBlog = {
      title: 'Updated title',
      author: 'Buket Karakaş',
      url: 'wwwwww',
      likes: 10
    }
    await api
      .put(`/api/blogs/${idTobeUpdated}`)
      .send(newBlog)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    const updated = blogsAtEnd.find(r => r.id == idTobeUpdated)
    expect(updated.title).toBe('Updated title')
    expect(updated.likes).toBe(10)
  })

})



afterAll(() => {
    mongoose.connection.close()
})
