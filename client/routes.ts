/**
 * Array of routes that accessible publicly
 * Does not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    '/dashboard',
    '/settings',
    '/about'
]

export const protectedRoutes = [
    "/profile"
]

/**
 * Array of routes that are used for authentication
 * These will redirect logged in to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/sign-in',
    '/auth/sign-up'
]

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/'