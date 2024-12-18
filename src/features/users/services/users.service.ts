import { User } from "../types/user.types"
import { logger } from "@/utils/logger/logger";
import { fetchData } from "@/utils/fetch_data/fetcher";
import { errorHandler } from "@/utils/error_handler/error.handler";
import { SERVER_ROUTES } from "@/utils/fetch_data/server.routes";

export async function getUsers() {
    try {
        return await fetchData.get<User[]>(SERVER_ROUTES.PATHS.user_paths.users);
    } catch (error) {
        errorHandler.handle(
            error as Error,
            'OPERATION',
            {
                layer: 'UsersService',
                method: 'GET',
                message: 'error getting users',
            }
        );
        throw error;
    }
}

export async function getUser(id: number) {
    logger.success(`obteniendo datos del usuario con id ${id}`)
    try {
        return await fetchData.get<User>(SERVER_ROUTES.PATHS.user_paths.user(id));
    } catch (error) {
        errorHandler.handle(
            error as Error,
            'OPERATION',
            {
                layer: 'UsersService',
                method: 'GET',
                message: 'error getting user',
                userId: id
            }
        );
        throw error;
    }
}