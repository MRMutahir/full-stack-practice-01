import { Env } from "./env"

const BASE_URL = `${Env.BACKEND_URL}/v1/api`


const REGISTER_URL = `${BASE_URL}/auth/register`

const LOGIN_URL = `${BASE_URL}/auth/login`

const CHECK_LOGIN = `${BASE_URL}/auth/check-login`


const POSTS_REGISTER = `${BASE_URL}/posts/register`




export {
    BASE_URL,
    REGISTER_URL,
    LOGIN_URL,
    CHECK_LOGIN,
    POSTS_REGISTER
}