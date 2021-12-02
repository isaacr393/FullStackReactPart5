import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('testing <BlogForm />', () => {
    let createdBlog = {
        author: 'Jest',
        title:'Jesting',
        url:'sajdlsajldk'
    }

    let handleSubmit = jest.fn()
    let component 

    beforeEach( () => {
        component = render(
            <BlogForm 
                onSubmit={handleSubmit}
            />
        )
    })

    test('Submit should send object in state', () => {
        let tittleInput = component.container.querySelector('#titleInput')
        fireEvent.change(tittleInput, { target: { value: createdBlog.title } })

        let authorInput = component.container.querySelector('#authorInput')
        fireEvent.change(authorInput, { target: { value: createdBlog.author } })

        let urlInput = component.container.querySelector('#urlInput')
        fireEvent.change(urlInput, { target: { value: createdBlog.url } })

        let submitButton = component.container.querySelector('button')
        fireEvent.click(submitButton)

        expect(handleSubmit.mock.calls[0][0]).toEqual(createdBlog)
    })
})
