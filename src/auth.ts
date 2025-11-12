import { SvelteKitAuth } from "@auth/sveltekit"
import { env } from "$env/dynamic/private"

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        {
            id: "tailscale",
            name: "Tailscale",
            type: "oidc",
            issuer: env.TSIDP_ISSUER,
            clientId: env.TSIDP_CLIENT_ID,
            clientSecret: env.TSIDP_CLIENT_SECRET,
            wellKnown: `${env.TSIDP_ISSUER}/.well-known/openid-configuration`,
        }
    ],
    secret: env.AUTH_SECRET,
    trustHost: true
});
