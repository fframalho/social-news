import React from 'react'
import { Auth0Context, User, type Auth0ContextInterface, type GetTokenSilentlyOptions } from '@auth0/auth0-react'

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



export const MockAuth0Provider = (user: User) => {
    const mockAuth0Context: Partial<Auth0ContextInterface> = {
        isAuthenticated: true,
        user: user,
        loginWithRedirect: () => Promise.resolve(),
        logout: () => Promise.resolve(),
        getAccessTokenSilently: mockGetAccessTokenSilently,
    }

    return ({ children }: { children: React.ReactNode }) => (
        <div data-testid="mock-auth-provider">
            <Auth0Context.Provider value={mockAuth0Context as Auth0ContextInterface}>
                {children}
            </Auth0Context.Provider>
        </div>
    );
}