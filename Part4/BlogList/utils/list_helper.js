var _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let likes = 0
    blogs.forEach(element => {
        likes = likes + element.likes
    });
    return likes
}

const favoriteBlog = (blogs) => {
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    const result = {
        title: blogs[0].title,
        author: blogs[0].author,
        likes: blogs[0].likes
    }
    return result
}

const mostBlogs = (blogs) => {
    const authorsObj = _.countBy(blogs, 'author')
    let authorArray = []
    _.forIn(authorsObj, function(value, key){
        authorArray=authorArray.concat({
            author: key,
            blogs: value
        })
    })
    authorArray.sort((author1,author2) => author2.blogs - author1.blogs)
    return authorArray[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}