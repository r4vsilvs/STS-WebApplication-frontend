// Central API base URL — all axios calls use this.
// Change the value in .env (VITE_BACKEND_URL) to switch environments.
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default BASE_URL;
