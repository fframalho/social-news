/// <reference types="cypress" />

Cypress.Commands.add('getByTestId', (testId, ...args) => {
    return cy.get(`[data-testid="${testId}"]`, ...args);
})

Cypress.Commands.add('fillInput', (testId, value) => {
    cy.get(`[data-testid="${testId}"]`).clear().type(value);
})

Cypress.Commands.add('chooseImage', (testId, fileName = 'test-image.jpg') => {
    cy.get(`[data-testid="${testId}"]`).selectFile(`cypress/fixtures/${fileName}`, { force: true });
})

Cypress.Commands.add('chooseOption', (testId, valueToSelect) => {
    cy.get(`[data-testid="${testId}"]`).select(valueToSelect);
})
