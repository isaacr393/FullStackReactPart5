describe( 'Blog App', () => {

    beforeEach( () => {
        cy.request('POST','http://localhost:3001/api/testing/clear')
        cy.visit('http://localhost:3000')
    })

    it('Should show log in form', () => {        
        cy.get('#usernameInput')
        cy.get('#passwordInput')
        cy.contains('Log in')
    })
})