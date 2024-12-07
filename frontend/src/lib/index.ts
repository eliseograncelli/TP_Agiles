import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { Api } from './api';

export const api = new Api(PUBLIC_BACKEND_URL);
