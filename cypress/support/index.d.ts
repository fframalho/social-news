declare namespace Cypress {
    interface Chainable {
        getByTestId(testId: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLElement>>

        fillInput(testId: string, value: string): Chainable<JQuery<HTMLElement>>
        chooseImage(testId: string, fileName: string): Chainable<JQuery<HTMLElement>>
        chooseOption(testId: string, valueToSelect: string): Chainable<JQuery<HTMLElement>>

    }
}
