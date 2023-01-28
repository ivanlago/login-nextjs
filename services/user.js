import jwt from "jsonwebtoken";

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET

function createToken(user) {
    return jwt.sign({name: user.name, email: user.email }, SECRET)
}

export function readToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (err) {
        throw new Error('Token inválido')
    }
}

export function loginToken (data) {
    const user = data;
    const token = createToken(user)
    return token
}
