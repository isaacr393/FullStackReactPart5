import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Tests For <Blog /> Component', ()=> {

    let blog = {
        title: 'Testing with jest',
        author: 'Jest',
        likes: 10,
        user:{
            username: 'Jest'
        }
    }

    let user = {
        username: 'Isaac'
    }

    let handleLike = jest.fn()
    let handleRemove = jest.fn()
    let component = null
    
    beforeEach( () => {
        component = render(
            <Blog blog={blog} user={user} handleRemove={handleRemove} handleLike={handleLike} />
        )
    })

    test('Displays Title and no other content', () => {
        expect( component.container ).toHaveTextContent( blog.title )
    })  

    test('Does not displays  other content', () => {
        let detailsBlock = component.container.querySelector('.DetailsBlogs')

        expect( detailsBlock ).toHaveStyle('display:none')
    })  

    test('Show Details when clicked details', () => {

        let button = component.container.querySelector('.showDetailsButton')
        //component.debug()
        fireEvent.click(button)
        expect( component.container ).toHaveTextContent( blog.likes )
        expect( component.container ).toHaveTextContent( blog.author )
    })  

    test('Like button clicked twice is called twice', () => {
        let button = component.container.querySelector('.likeBlogButton')
        
        fireEvent.click(button)
        fireEvent.click(button)

        expect(handleLike.mock.calls).toHaveLength(2)
    })
})