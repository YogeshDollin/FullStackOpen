import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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