// Simple mock auth — no database
const MOCK_USER = {
    email: 'user@example.com',
    password: 'password123',
    name: 'Demo User'
}

function checkCredentials(email, password) {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
        return { email: MOCK_USER.email, name: MOCK_USER.name }
    }
    return null
}

module.exports = { checkCredentials }
