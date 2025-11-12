import { redirect, error } from "@sveltejs/kit"
import { getTailscaleIdToken } from "$lib/auth"
import type { RequestHandler } from "../$types"

export const GET: RequestHandler = async ({ url, cookies }) => {
    const code = url.searchParams.get("code")
    const state = url.searchParams.get("state")
    const storedState = cookies.get("oauth_state")
    const err = url.searchParams.get("error")

    if (err) {
        console.error("OAuth error:", err);
        error(401, "Authentication failed");
    }

    if (!code || state !== storedState) {
        throw new Error("Invalid state or missing code")
    }

    try {
        const claims = await getTailscaleIdToken(code)
        
        cookies.set("session", JSON.stringify({
            sub: claims.sub,
            email: claims.email,
            name: claims.name
        }), {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60
        })

        cookies.delete("oauth_state", { path: "/" })
        redirect(303, "/")
    } catch (error) {
        console.error("Auth error:", error)
        redirect(303, "/login?error=auth_failed")
    }
}