import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../services/users.service";

export const useGetUsersQuery = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
    });
}

export const useGetUserQuery = (id: number) => {
    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
    });
}