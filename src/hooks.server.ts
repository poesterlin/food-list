import { sequence } from "@sveltejs/kit/hooks"
import type { Handle } from "@sveltejs/kit"

const authHandle: Handle = async ({ event, resolve }) => {
    const sessionCookie = event.cookies.get("session")
    
    if (sessionCookie) {
        try {
            event.locals.user = JSON.parse(sessionCookie)
        } catch {
            event.cookies.delete("session", { path: "/" })
        }
    }
    
    return resolve(event)
}

export const handle = sequence(authHandle)