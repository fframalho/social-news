describe('Create Article Test', () => {

    it('shows protected content when "logged in"', () => {
        cy.visit('/articles/new-article')

        cy.getByTestId('add-article-title').should('contain', 'Add article')

        const articleTitle = 'This article is really good.'

        cy.fillInput('article-title', articleTitle);
        cy.fillInput('description-text-area', 'Just a description.');
        cy.chooseImage('article-image', 'penguin.jpg');
        cy.chooseOption('article-category', 'Engineering');
        cy.fillInput('content-text-area', 'This is the content of the article.');
        cy.chooseOption('article-state', 'Published')

        cy.getByTestId('submit-article-button').click()

        // After successfully submiting, we should navigate to /articles/list
        cy.location('pathname').should('eq', '/articles/list');

        // Check new article's title is in the list
        cy.getByTestId('article-info-title')
            .first()
            .should('contain.text', articleTitle);
    })
})
