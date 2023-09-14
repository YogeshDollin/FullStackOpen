import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('render blog without details', () => {
    const blog = {
        title: 'Sample',
        author: 'Anony',
        likes: 12,
        url:'sample.com'
    }

    const mockhandler = jest.fn()

    const {container} = render(<Blog blog={blog} removeBlog={mockhandler}/>)

    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Sample Anony')

    expect(element).not.toHaveTextContent('sample.com')
    expect(element).not.toHaveTextContent(`likes ${blog.likes}`)
})

test('clicking the button display blog url and likes', async () => {
    const blog = {
        title: 'Sample',
        author: 'Anony',
        likes: 12,
        url:'sample.com'
    }
    const mockhandler = jest.fn()
    const {container} = render(<Blog blog={blog} removeBlog={mockhandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(container).toHaveTextContent('sample.com')
    expect(container).toHaveTextContent(`likes ${blog.likes}`)
})

test('clicking the remove button calls the handler', async () => {
    const blog = {
        title: 'Sample',
        author: 'Anony',
        likes: 12,
        url:'sample.com'
    }

    const mockhandler = jest.fn()
    const {container} = render(<Blog blog={blog} removeBlog={mockhandler}/>)

    const user = userEvent.setup()

    let button = screen.getByText('view')
    await user.click(button)

    button = screen.getByText('remove')
    await user.click(button)

    expect(mockhandler.mock.calls).toHaveLength(1)
})

test('testing the add blog handling', async () => {
    const mockhandler = jest.fn()
    const {container} = render(<BlogForm addBlog={mockhandler} />)

    const user = userEvent.setup()
    const inputTitle = container.querySelector('input[name="title"]')
    await user.type(inputTitle, 'sample')

    const inputAuthor = container.querySelector('input[name="author"]')
    await user.type(inputAuthor, 'Anony')

    const inputUrl = container.querySelector('input[name="url"]')
    await user.type(inputUrl, 'sample.com')

    const submitButton = container.querySelector('button[type="submit"]')
    await user.click(submitButton)

    expect(mockhandler.mock.calls[0][0]).toEqual({ title: 'sample', author: 'Anony', url: 'sample.com' })
})