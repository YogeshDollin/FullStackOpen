describe('Note app', () => {

  beforeEach(function(){
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Tester',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', () => {
    cy.contains('Notes')
    cy.contains('Note app, by Yogesh Dollin')
  })

  it('login form can be opened', () => {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test')
    cy.get('#login-submit').click()

    cy.contains('Tester logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-submit').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach('and a note exists', function() {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made not important', function() {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })
  })
})