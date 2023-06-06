import * as dotenv from 'dotenv'

dotenv.config({
    path:'src/config/.env'
}) 

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL

export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

export const COOKIE_SECRET = process.env.COOKIE_SECRET

export const COOKIE_NAME = process.env.COOKIE_NAME

export const SESSION_SECRET = process.env.SESSION_SECRET