describe( 'Blog App', () => {

    beforeEach( () => {
        cy.request('POST','http://localhost:3001/api/testing/clear')
        
        let user = {
            "user": "Isaac",
            "username": "Isaac",
            "password": "123",
        }
        cy.request('POST','http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Should show log in form', () => {        
        cy.get('#usernameInput')
        cy.get('#passwordInput')
        cy.contains('Log in')
    })

    describe('Login', () => {
        
        it('Successfull with rigth credentials', () => {
            cy.get('#usernameInput').type('Isaac')
            cy.get('#passwordInput').type('123')
            cy.contains('Log in').click()

            cy.contains('Isaac logged in')
        })

        it.only('Fails with wrongs credentials', () => {
            cy.get('#usernameInput').type('Isaac')
            cy.get('#passwordInput').type('wrong')
            cy.contains('Log in').click()

            cy.contains('Invalid Credentials')
        })
    })
})