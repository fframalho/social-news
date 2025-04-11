import { render, screen } from '@testing-library/react'
import TextArea from './TextArea'

const TEXTAREA_LABEL = 'Label'
const TEXTAREA_ID ='text-area'

describe('TextArea', () => {

    test('should have label', () => {
        render(
            <TextArea
                id={ TEXTAREA_ID }
                label={ TEXTAREA_LABEL }
                rows={ 3 }
            />
        )
        
        expect(screen.getByTestId(`${TEXTAREA_ID}-label`)).toHaveTextContent(TEXTAREA_LABEL)

    })

    test('should have value passed as prop', () => {
        const textAreaValue = 'This is a test value for the textarea'

        render(
            <TextArea
                id={ TEXTAREA_ID }
                label={ TEXTAREA_LABEL }
                rows={ 3 }
                value={ textAreaValue } 
            />
        )
        
        expect(screen.getByTestId('text-area')).toHaveTextContent(textAreaValue)

    })

    test('should have empty content', () => {
        render(
            <TextArea 
                id={ TEXTAREA_ID }
                label={ TEXTAREA_LABEL }
                rows={ 3 }
            />
        )
        
        expect(screen.getByTestId('text-area')).toHaveTextContent('')

    })
})
