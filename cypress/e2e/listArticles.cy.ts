describe('Create Article Test', () => {

    const NAMESPACE_ROLES = "https://social-news.com"

    it('regular user should not see DRAFT articles', () => {
        cy.intercept('GET', '/articles.json').as('getArticles')

        cy.visit('/', {
            onBeforeLoad(win) {
                win.CYPRESS_AUTH_USER = {
                    name: 'Cypress Regular User',
                    email: 'regular@cypress.dev',
                    picture: '',
                    [`${NAMESPACE_ROLES}/roles`]: ['Regular']
                }
            }
        })

        cy.wait('@getArticles').its('response.statusCode').should('eq', 304)
        cy.wait(5000)

        // Check article DRAFT 2 from pre-loaded list (articles.json) does not appear
        cy.getByTestId('article-info-title').each(($element) => {
            cy.wrap($element).should('not.contain.text', 'Big company announcement DRAFT 2')
        })
    })
})
