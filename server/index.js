const express = require('express')
const cors = require('cors')
const { checkCredentials } = require('./auth')

const app = express()
app.use(cors())
app.use(express.json())

// Health / root route so browser GET / doesn't return "Cannot GET /"
app.get('/', (req, res) => {
    res.send('Auth server running')
})

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
const server = app.listen(PORT, () => console.log(`Auth server listening on http://localhost:${PORT}`))

server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Use a different PORT or stop the process using it.`)
        process.exit(1)
    }
    console.error('Server error:', err)
    process.exit(1)
})
