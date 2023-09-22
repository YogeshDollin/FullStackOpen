describe('Note app', () => {

  beforeEach(function(){
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Tester',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
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

  it('login fails with wrong password', () => {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('wrong')
    cy.get('#login-submit').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Tester logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      // cy.contains('login').click()
      // cy.get('#username').type('test')
      // cy.get('#password').type('test')
      // cy.get('#login-submit').click()
      // cy.request('POST', 'http://localhost:3000/api/login', {
      //   username: 'test', password: 'test'
      // }).then(response => {
      //   localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      //   cy.visit('http://localhost:3000/')
      // })

      cy.login({ username: 'test', password: 'test' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several note exists', function() {
      beforeEach('and a note exists', function() {
        // cy.contains('new note').click()
        // cy.get('input').type('another note cypress')
        // cy.contains('save').click()
        cy.createNote({
          content: 'first note',
          important: true
        })

        cy.createNote({
          content: 'second note',
          important: true
        })

        cy.createNote({
          content: 'third note',
          important: true
        })
      })

      it('it can be made not important', function() {
        cy.contains('second note')
          .contains('make not important')
          .click()

        cy.contains('show all').click()

        cy.contains('second note')
          .contains('make important')
      })
    })
  })
})