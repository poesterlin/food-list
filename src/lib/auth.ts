import { env } from "$env/dynamic/private"
import { jwtVerify, createRemoteJWKSet } from "jose"
import crypto from "crypto"
import { dev } from "$app/environment"

const jwks = createRemoteJWKSet(
    new URL(`${env.TSIDP_ISSUER}/.well-known/jwks.json`)
)

export async function getTailscaleIdToken(code: string) {
    const host = dev ? `http://localhost:5173` : env.URL;

    const response = await fetch(`${env.TSIDP_ISSUER}/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: env.TSIDP_CLIENT_ID,
            client_secret: env.TSIDP_CLIENT_SECRET,
            redirect_uri: `${host}/auth/callback/tailscale`
        })
    })

    if (!response.ok) throw new Error("Token exchange failed")

    const { id_token } = await response.json()

    const verified = await jwtVerify(id_token, jwks)
    return verified.payload
}

export function generateState(): string {
    return crypto.randomBytes(32).toString("hex")
}

export function getTailscaleAuthUrl(state: string): string {
    const host = dev ? `http://localhost:5173` : env.URL;

    const params = new URLSearchParams({
        client_id: env.TSIDP_CLIENT_ID,
        response_type: "code",
        scope: "openid profile email",
        redirect_uri: `${host}/auth/callback/tailscale`,
        state
    })
    return `${env.TSIDP_ISSUER}/authorize?${params}`
}