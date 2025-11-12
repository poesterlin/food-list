// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				sub: string;
				email?: string;
				name?: string;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Session {
			user: {
				id: string;
				name: string;
				email: string;
				image?: string;
			};
			accessToken?: string;
		}
	}
}

export { };
