describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-submit').click()

      cy.contains('Tester logged in')
    })

    it('fails with incorect crendetials', () => {
      cy.get('#username').type('test')
      cy.get('#password').type('tset')
      cy.get('#login-submit').click()

      cy.get('#errorMessage')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})