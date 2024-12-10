import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../services/users.service";

export const useGetUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: 10000, // por defecto se maneja un staleTime corto pero esto debería depender de que tanto cambien los datos, para evitar hacer peticiones recurrentes en datos que cambian poco o nunca
    });
}

export const useGetUserQuery = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
        staleTime: 10000, // por defecto se maneja un staleTime corto pero esto debería depender de que tanto cambien los datos, para evitar hacer peticiones recurrentes en datos que cambian poco o nunca
    });
}