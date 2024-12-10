import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useGetUserQuery } from "@/features/users/api/users.queries"

export function UserCard({ params }: { params: any }) {
    const userId = params.userId
    const { data: userResponse, isLoading, error } = useGetUserQuery(userId)

    if (isLoading) return <div>Loading...</div> // Aquí deberíamos llamar a un fallback diseñado específicamente para esto o uno genérico

    if (error) return <div>Error loading user</div> // Aquí deberíamos llamar a un fallback diseñado específicamente para esto o uno genérico

    const user = userResponse?.data

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-bold">{user?.email}</h2>
                    <p className="text-gray-600">@{user?.name}</p>
                </CardHeader>
                <CardContent>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Phone:</strong> {user?.phone}</p>
                    <p><strong>Website:</strong> <a href={`https://${user?.website}`} target="_blank" rel="noopener noreferrer">{user?.website}</a></p>
                    <h3 className="font-semibold mt-4">Address</h3>
                    <p>{user?.address.suite}, {user?.address.street}, {user?.address.city}, {user?.address.zipcode}</p>
                    <p><strong>Geo:</strong> {user?.address.geo.lat}, {user?.address.geo.lng}</p>
                    <h3 className="font-semibold mt-4">Company</h3>
                    <p><strong>Name:</strong> {user?.company.name}</p>
                    <p><strong>Catch Phrase:</strong> {user?.company.catchPhrase}</p>
                    <p><strong>BS:</strong> {user?.company.bs}</p>
                </CardContent>
            </Card>
        </div>
    );
}