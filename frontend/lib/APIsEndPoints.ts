import { Env } from "./env"

const BASE_URL = `${Env.BACKEND_URL}/v1/api`


const REGISTER_URL = `${BASE_URL}/auth/register`

const LOGIN_URL = `${BASE_URL}/auth/login`



export {
    BASE_URL,
    REGISTER_URL,
    LOGIN_URL
}