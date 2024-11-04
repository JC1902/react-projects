import { Link } from "react-router-dom"

export default function Header() {
  return (
    <>
      <div className="container mx-auto px-4 space-y-4">
        <div className="flex justify-around items-center">
          <Link to="/" >
            <h1 className="text-3xl font-bold text-center my-8">Dragon Ball</h1>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/personajes" >Personajes</Link>
            <Link to="/transformaciones">Transformaciones</Link>
            <Link to="/planetas">Planetas</Link>
          </div>
          <form>
            <input placeholder='Personajes, Planetas, Razas, etc...' className="rounded-md p-1"/>
          </form>
        </div>
      </div>
    </>
  )
}