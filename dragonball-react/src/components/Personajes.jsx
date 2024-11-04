import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { container, item } from "../const";
import { Link } from "react-router-dom";

export default function Personajes({ tipo }) {
  const [ characters, setCharacters ] = useState([]);

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/${tipo}`)
      .then( res => res.json() )
      .then( data => {
        setCharacters(data.items);
      } )
  }, [tipo]);

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <AnimatePresence>
          <motion.div
            key={tipo}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" 
            variants={container} 
            initial="hidden"
            animate="visible"
          >
            {characters.length > 0 ? (
              characters.map((character) => (
                <motion.div 
                  key={character.id} 
                  className="flex flex-col items-center"
                  variants={item}
                >
                  <div className="w-64 h-96 rounded-lg shadow-lg mb-4 bg-gradient-to-br from-slate-400 to-lime-50 to-90%">
                    <Link to={`/personajes/${character.id}`} >
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-contain object-center hover:scale-125 duration-300"
                      />
                    </Link>
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold text-lg">{character.name}</h2>
                    <p className="text-gray-600">
                      {character.race ? character.race : (character.isDestroyed ? "Destruido" : "No destruido")}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-xl">
                Cargando a los datos...
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}