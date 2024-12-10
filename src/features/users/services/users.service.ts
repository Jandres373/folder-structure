import { Fetcher } from "@/utils/fetch_data/fetcher";
import { User } from "../types/user.types";
import { logger } from "@/utils/logger/logger";

const fetchData = new Fetcher({
    baseURL: 'https://jsonplaceholder.typicode.com', // esto debería venir de una variable de entorno
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getUsers() {
    return await fetchData.get<User[]>('/users');
}

export async function getUser(id: number) {
    logger.info(`obteniendo datos del usuario con id ${id}`)
    return await fetchData.get<User>(`/users/${id}`);
}