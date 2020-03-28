const host = '10.0.2.2', port = "3000";

export const backend_url = `http://${host}${port ? `:${port}` : ""}/`;
export const api_url = `${backend_url}user/`;
export const defaultProfile = `${backend_url}uploads/images/default.png`;
