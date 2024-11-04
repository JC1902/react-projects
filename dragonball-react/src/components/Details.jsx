import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters/3`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      });
  }, [id]);

  return (
    <div className="min-h-screen py-12 px-7">
      {details ? (
        <div className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
          <div className=" p-4 md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-full w-full object-cover"
                src={details.image}
                alt={details.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {details.race}
              </div>
              <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                {details.name}
              </h1>
              <p className="mt-2 text-gray-600">{details.description}</p>
              <p className="mt-2 text-gray-600">
                Planeta de Origen: {details.originPlanet.name}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Cargando los datos del personaje...
        </p>
      )}
    </div>
  );
}
