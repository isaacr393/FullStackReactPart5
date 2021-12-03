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

        it('Fails with wrongs credentials', () => {
            cy.get('#usernameInput').type('Isaac')
            cy.get('#passwordInput').type('wrong')
            cy.contains('Log in').click()

            cy.contains('Invalid Credentials')
        })
    })

    describe('when logged in ', () => {
        beforeEach( () => {
            cy.get('#usernameInput').type('Isaac')
            cy.get('#passwordInput').type('123')
            cy.contains('Log in').click()

            // CREATE THE BLOG
            cy.contains('Create Blog').click()

            cy.get('#titleInput').type('From Cypress')
            cy.get('#authorInput').type('Isaac')
            cy.get('#urlInput').type('miaddress@mail.com')

            cy.contains('Submit').click()
                        
        })

        it('A blog can be created', () => {
            cy.contains('Create Blog').click()

            cy.get('#titleInput').type('From Cypress')
            cy.get('#authorInput').type('Isaac')
            cy.get('#urlInput').type('miaddress@mail.com')

            cy.contains('Submit').click()

            cy.contains('From Cypress')
        })

        it('A blog can be liked', () => {            

            cy.contains('Details').click()
            cy.contains('like').click()

            cy.contains('Blog Liked')
        })

        it('A blog can be deleted', () => {            
            cy.contains('Details').click()
            cy.contains('Delete').click()
            cy.get('html')
            .should('not.contain', 'From Cypress')

        })

        it.only('Blogs are ordered by likes', () => {
            cy.get('#titleInput').type('From Cypress 2')
            cy.get('#authorInput').type('Isaac 2')
            cy.get('#urlInput').type('miaddress2@mail.com')

            cy.contains('Submit').click()

            /* cy.contains('Details').click()
            cy.contains('like').click()         */    
            cy.get('.blogContainer').should('have.length', 2)
            cy.get('.blogContainer').eq(1)
            .contains('Details').click()
            cy.get('.blogContainer').eq(1)
            .contains('like').click()

            
            cy.get('.blogContainer').eq(0)
            .get('.DetailsBlogs .likesAmount')
            .should('contain','1')
            
        })
    })
})