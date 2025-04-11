import { getUserRoles } from './userRoles'

const NAMESPACE = 'https://social-news.com'

describe('userRoles', () => {

    test('should return roles array if user has roles claim', () => {
        const user = {
            [`${NAMESPACE}/roles`]: ['Admin', 'Regular']
        }
        const roles = getUserRoles(user)

        expect(roles).toEqual(['Admin', 'Regular'])
    })

    test('should return empty array if user is undefined', () => {
        const roles = getUserRoles(undefined)

        expect(roles).toEqual([])
    })

    test('should return empty array if user has no roles claim', () => {
        const user = {
            name: 'Admin User',
            email: 'admin@example.com'
        }

        const roles = getUserRoles(user)

        expect(roles).toEqual([])
    })
})
