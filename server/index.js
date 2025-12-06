const express = require('express')
const cors = require('cors')
const { checkCredentials } = require('./auth')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/login', (req, res) => {
    const { email, password } = req.body || {}
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password required' })
    }

    const user = checkCredentials(email, password)
    if (user) {
        return res.json({ success: true, user })
    }
    return res.status(401).json({ success: false, message: 'Invalid email or password' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Auth server listening on http://localhost:${PORT}`))
