export const USERS = 'api/users';
export const USERS_ROUTE = `${USERS}/userList`;
export const NEW_USER_ROUTE = `${USERS}/create`;
export const getUserWithIdRoute = (id: string) => `${USERS}/${id}`;
export const editUserWithIdRoute = (id: string) => `${USERS}/update/${id}`;
export const deleteUserWithIdRoute = (id: string) => `${USERS}/delete/${id}`;