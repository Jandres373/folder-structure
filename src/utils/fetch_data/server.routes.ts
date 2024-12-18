/**
 * Definición de rutas del servidor con sus parámetros
 */
export const SERVER_ROUTES = {
    BASE_URL: "https://jsonplaceholder.typicode.com",
    PATHS: {
        login: "/auth/login",
        register: "/auth/register",
        user_paths: {
            users: "/users",
            user: (id: string | number) => `/users/${id}` // Ruta dinámica
        }
    }
};

/**
 * Verifica si una ruta es válida (está registrada en SERVER_ROUTES)
 */
export function isValidPath(path: string): boolean {
    const staticPaths = [
        SERVER_ROUTES.PATHS.login,
        SERVER_ROUTES.PATHS.register,
        SERVER_ROUTES.PATHS.user_paths.users
    ];

    // Verifica rutas estáticas
    if (staticPaths.includes(path)) return true;

    // Verifica rutas dinámicas (por ejemplo, /users/123)
    const dynamicPathPatterns = [
        /^\/users\/\d+$/, // Patrón para rutas de usuario específico (d+$ indica que debe ser un número) si se quisiera un string se usaria: /^\/users\/\w+$/
    ];

    return dynamicPathPatterns.some(pattern => pattern.test(path));
}