import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	return fetch('/api/recipes?' + url.searchParams.toString()).then((r) => r.json());
};
