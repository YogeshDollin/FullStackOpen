import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
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