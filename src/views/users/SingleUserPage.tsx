import { UserCard } from "@/features/users/components/UserCard"


function SingleUserPage({ params }: { params: any }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <section className="flex flex-col justify-between items-center gap-5">
        <h1>hola soy la página del usuario</h1>
        <h2>y me encueentro en la página de usuario único</h2>
      </section>
      <main>
        <UserCard params={params} />
      </main>
      <footer className="flex flex-col justify-between items-center">
        <p>footer</p>
      </footer>
    </div>
  )
}

export default SingleUserPage