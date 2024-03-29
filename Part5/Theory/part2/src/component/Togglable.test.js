import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Togglable from './Togglable'
import userEvent from '@testing-library/user-event'

describe('<Togglable />', () => {
    let container

    beforeEach(() => {
        container = render(
        <Togglable buttonLabel='show...'>
            <div className='testDiv'>
                togglable Content
            </div>
        </Togglable>).container
    })

    test('render its children', async () => {
        await screen.findAllByText('togglable Content')
    })

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('togglable content can be close', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('show...')
        await user.click(button)

        const closeButton = screen.getByText('cancel')
        await user.click(closeButton)

        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')

    })
})