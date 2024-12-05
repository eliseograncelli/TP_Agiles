import { redirect } from '@sveltejs/kit';

export const ssr = false;

export const load = async () => {
	return redirect(302, '/create-game');
};
