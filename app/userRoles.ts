import type { User } from "@auth0/auth0-react"

const NAMESPACE = "https://social-news.com"

export function getUserRoles(user: User | undefined): string[] {
    return user?.[`${NAMESPACE}/roles`] || []
}
