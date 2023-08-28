import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    render(<Note note={note}/>)
    const element = screen.getByText('Component testing is done with react-testing-library')
    screen.debug(element)
    expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = jest.fn()

    render(<Note note={note} toggleImportance={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('make not important')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders content', async () => {
    const note = {
        content: 'Does not work anymore :(',
        important: true
    }

    render(<Note note={note}/>)

    // getByText() will not work when we want to look for an element that contains 'Text' because it will return element when element have exact save value 'Text'
    // instead screen.getByText('Does not work anymore :(', {exact: false}) extra parameter can be used
    // const element = screen.getByText('Does not work anymore :(')

    //below  is used to look for 'Text' containing element, unlike getByText it returns promise
    const element = await screen.findByText('Does not work anymore :(')

    expect(element).toBeDefined()
})

test('does not render this', () => {
    const note = {
        content: 'This is a reminder',
        important: true
    }

    render(<Note note={note} />)

    // queryByText returns element instead causing exception when element is not found
    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
})