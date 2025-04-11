import React from 'react'
import { Auth0Context, type Auth0ContextInterface, type GetTokenSilentlyOptions } from '@auth0/auth0-react'

const NAMESPACE = "https://social-news.com"

// Create a mock function that matches the expected overloads
const mockGetAccessTokenSilently = ((
    options?: GetTokenSilentlyOptions & { detailedResponse?: boolean }
) => {
    if (options?.detailedResponse) {
        const response = {
            access_token: 'fake-access-token',
            id_token: 'fake-id-token',
            expires_in: 3600,
        };
        return Promise.resolve(response);
    }

    return Promise.resolve('fake-access-token');
}) as Auth0ContextInterface['getAccessTokenSilently'];

const mockAuth0Context: Partial<Auth0ContextInterface> = {
    isAuthenticated: true,
    user: {
        name: 'Cypress Test User',
        email: 'test@cypress.dev',
        picture: 'https://s.gravatar.com/avatar/4c3d30db18c7e79e27be78c175b7c0a6?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fad.png',
        [`${NAMESPACE}/roles`]: [ 'Admin' ]
    },
    loginWithRedirect: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    getAccessTokenSilently: mockGetAccessTokenSilently,
};


export const MockAuth0Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div data-testid="mock-auth-provider">
            <Auth0Context.Provider value={mockAuth0Context as Auth0ContextInterface}>
                {children}
            </Auth0Context.Provider>
        </div>
    );
}