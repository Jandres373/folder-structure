import { UserCard } from "@/features/users/components/UserCard"


function SingleUserPage({ params }: { params: any }) {
  return (
    <div>
      <h1>hola soy la página del usuario</h1>
      <section>
        <UserCard params={params} />
      </section>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  )
}

export default SingleUserPage