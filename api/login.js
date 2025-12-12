const { checkCredentials } = require('../server/auth')

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ success: false, message: 'Method not allowed' })
    }

    const { email, password } = req.body || {}
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    const user = checkCredentials(email, password)
    if (user) {
        return res.status(200).json({ success: true, user })
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' })
}
