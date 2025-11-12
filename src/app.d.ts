// See https://kit.svelte.dev/docs/types#app

import { DB } from "./lib/db";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DB
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
