import jwt from 'jsonwebtoken'
export function generateAccessToken(payload: any){
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET!,{expiresIn:'15m'})
}

export function generateRefreshToken(payload: any){
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'15m'})
}
