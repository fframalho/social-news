describe('Create Article Test', () => {

    const NAMESPACE_ROLES = "https://social-news.com"

    it('admin user should create article', () => {
        cy.visit('/articles/new-article', {
            onBeforeLoad(win) {
                win.CYPRESS_AUTH_USER = {
                    name: 'Cypress Admin User',
                    email: 'test@cypress.dev',
                    picture: 'https://s.gravatar.com/avatar/4c3d30db18c7e79e27be78c175b7c0a6?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fad.png',
                    [`${NAMESPACE_ROLES}/roles`]: ['Admin']
                }
            }
        })

        cy.getByTestId('add-article-title').should('contain', 'Add article')

        const articleTitle = 'This article is really good.'

        cy.fillInput('article-title', articleTitle)
        cy.fillInput('description-text-area', 'Just a description.')
        cy.chooseImage('article-image', 'penguin.jpg')
        cy.chooseOption('article-category', 'Engineering')
        cy.fillInput('content-text-area', 'This is the content of the article.')
        cy.chooseOption('article-state', 'Published')

        cy.getByTestId('submit-article-button').click()

        // After successfully submiting, we should navigate to /articles/list
        cy.location('pathname').should('eq', '/articles/list')

        // Check new article's title is in the list
        cy.getByTestId('article-info-title')
            .first()
            .should('contain.text', articleTitle)
    })
})
