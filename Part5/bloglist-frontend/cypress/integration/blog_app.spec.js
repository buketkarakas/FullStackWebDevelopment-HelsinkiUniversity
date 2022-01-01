// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Blog app', function() {
  const user = {
    "blogs": [],
    "username": "test",
    "name": "Buket Karakas",
    "password": "test"
 }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('[data-testid="login-form"]').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials and logout', function () {
      cy.get('[data-testid="username"]').type(user.username)
      cy.get('[data-testid="password"]').type(user.password)
      cy.get('[data-testid="login-button"]').click()
      cy.get('[data-testid="login-form"]').should('not.exist')
      cy.get('[data-testid="title-blogs"]').should('have.text', 'blogs')
      cy.get('[data-testid="logout-button"]').click()
      cy.get('[data-testid="login-form"]').should('be.visible')
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-testid="username"]').type('blahblahblah')
      cy.get('[data-testid="password"]').type('wrong-password')
      cy.get('[data-testid="login-button"]').click()
      cy.get('[data-testid="message"]').should('have.text', 'Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(async function () {
      const response = await cy.request('POST', 'http://localhost:3003/api/login', {
        username: user.username, password: user.password
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
            
    })

    it('A blog can be created', function () {
        cy.get('[data-testid="toggle-button"]').click()
        cy.get('[data-testid="title"]').type('This is title')
        cy.get('[data-testid="author"]').type('Author Author')
        cy.get('[data-testid="url"]').type('www.hello.com')
        cy.get('[data-testid="createBlog"]').click()

        cy.get('[data-testid="message"]').should('have.text', 'a new blog This is title by Author Author added')
    })

    it('blogs can be liked', function() {
      cy.get('[data-testid="toggle-button"]').click()
      cy.get('[data-testid="title"]').type('test')
      cy.get('[data-testid="author"]').type('test test')
      cy.get('[data-testid="url"]').type('http://example.com')
      cy.get('[data-testid="createBlog"]').click()

      cy.contains('test')
      cy.get('[data-testid="viewButton"]').click()
      cy.get('[data-testid="likeButton"]').click()
      cy.get('[data-testid="likes"]').contains('0')
      cy.get('[data-testid="likeButton"]').click()
      cy.get('[data-testid="likes"]').contains('1')
    })

    it('deleting blog', function () {
      cy.get('[data-testid="toggle-button"]').click()
      cy.get('[data-testid="title"]').type('This is title')
      cy.get('[data-testid="author"]').type('Author Author')
      cy.get('[data-testid="url"]').type('www.hello.com')
      cy.get('[data-testid="createBlog"]').click()
      cy.get('[data-testid="viewButton"]').click()
      cy.get('[data-testid="removeButton"]').click()
      cy.on('windows:confirm', () => true)
    })

    it('are blogs sorted', function () {
      cy.handleCreateBlog({
        title: 'Fullstack',
        author: 'buket',
        url: 'hahahaha.org',
        likes: 12,
      })
      cy.handleCreateBlog({
        title: 'network',
        author: 'berk',
        url: 'network.org',
        likes: 151,
      })
      cy.handleCreateBlog({
        title: 'clala',
        author: 'baba',
        url: 'clala.org',
        likes: 62,
      })

      cy.get('.blog>.titleAndAuthor').should((items) => {
        console.log(items)
        expect(items[0].innerHTML).to.contain('network berk')
        expect(items[1].innerHTML).to.contain('clala baba')
        expect(items[2].innerHTML).to.contain('Fullstack buket')
      })
    })

})
    

})