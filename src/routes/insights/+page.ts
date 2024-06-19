import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    redirect(302, `/insights/${year}/${month}`);
};