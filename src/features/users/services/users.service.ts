import { User } from "../types/user.types"
import { logger } from "@/utils/logger/logger";
import { fetchData } from "@/utils/fetch_data/fetcher";

export async function getUsers() {
    return await fetchData.get<User[]>('/users');
}

export async function getUser(id: number) {
    logger.success(`obteniendo datos del usuario con id ${id}`)
    return await fetchData.get<User>(`/users/${id}`);
}