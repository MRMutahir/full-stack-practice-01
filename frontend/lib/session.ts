// import "server-only";
"use server";
import { Env } from "./env";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify, JWTPayload } from "jose";

type SessionPayload = {
    token: string;
    expiresAt: Date;
};

const secretKey = Env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const createSession = async (token: string): Promise<void> => {
    const cookieStore: any = await cookies()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await encrypt({ token, expiresAt });
    console.log('session', session)
    // console.log('cookieStore', cookieStore.)
    console.log('await cookies()', (await cookies()).set({ "name": session }))

    cookies().cookies = { "session": session }
    // ("session", session, {
    //     httpOnly: true,
    //     secure: true,
    //     expires: expiresAt,
    // });
};


const deleteSession = async (): Promise<void> => {
    const cookieStore: any = await cookies()

    cookieStore().delete("session");
};


const encrypt = async (payload: SessionPayload): Promise<string> => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
};


const decrypt = async (
    session: string | undefined = ""
): Promise<JWTPayload | undefined> => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log("Failed to verify session");
        return undefined;
    }
};

export {
    createSession,
    deleteSession,
    encrypt,
    decrypt,
    type SessionPayload
};
