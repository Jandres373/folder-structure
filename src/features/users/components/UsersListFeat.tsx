import { Link } from '@tanstack/react-router';
import { useGetUsersQuery } from '../api/users.queries';
import { Card, CardFooter, CardHeader, CardContent } from '@/shared/components/ui/card';

/* 

Una feature debería tener su propio manejo de estado y su propia interaccion con el backend (de ser necesario) a traves de las queries.

Las features son grupos de componentes que tienen una utilidad y que se pueden reutilizar en diferentes partes de la app.
una feature pasa datos a componentes más pequeños, siendo las features las responsables de gestionar la logica y el estado de la app.

*/

export function UsersList() {

    const { data: usersResponse, isLoading, error } = useGetUsersQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users</div>;

    const users = usersResponse ?? []

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <Card key={user.id} className="shadow-lg">
                        <CardHeader>
                            <h2 className="text-lg font-semibold">{user.name}</h2>
                        </CardHeader>
                        <CardContent>
                            <p>Email: {user.email}</p>
                        </CardContent>
                        <CardFooter>
                            <Link to={'/users/$userId'} params={{ userId: String(user.id) }}>Ver usuario</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}