import jwt from 'jsonwebtoken'

export default function() {
    return {
        getpayload : getpayload,
        createToken : createToken,
        verifyToken : verifyToken,
        parsePostgreSQLTimestamp : parsePostgreSQLTimestamp
    }

    function getpayload(req) {
        let cookie = req.cookies['customcookie']
        let tokens = cookie.split('.')
        let payload = JSON.parse(Buffer.from(tokens[1], 'base64').toString('utf8'))
        return payload
    }

    function createToken(payload) {
        return jwt.sign(payload, 'keyboardcat', { expiresIn: '1h' })
    }

    function verifyToken(token) {
        if (token != null) {
            return jwt.verify(token, 'keyboardcat')
        } else {
            return null
        }
    }

    function parsePostgreSQLTimestamp(timestamp) {
        return timestamp.toISOString().replace('T', ' ').replace('Z', '').slice(0, 16)
    }
}