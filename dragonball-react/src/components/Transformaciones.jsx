import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion";
import { item, container } from "../const";

export default function Transformaciones() {

  const [ transformaciones, setTransformaciones ] = useState([]);

  useEffect(() => {
    fetch('https://dragonball-api.com/api/transformations')
      .then( res => res.json() )
      .then( data => {
        setTransformaciones( data );
      } )
  }, [])

  console.log( transformaciones )

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {transformaciones.length > 0 ? (
              transformaciones.map((transformacion) => (
                <motion.div
                  key={ transformacion.id }
                  className="flex flex-col items-center"
                  variants={item}
                >
                  <div className="w-64 h-96 rounded-lg shadow-lg mb-4 bg-gradient-to-br from-slate-400 to-lime-50 to-90%">
                    <img
                      src={ transformacion.image }
                      alt={ transformacion.name }
                      className="w-full h-full object-contain object-center hover:scale-125 duration-300"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="font-semibold text-lg">
                      { transformacion.name }
                    </h2>
                    <p className="text-gray-600">
                      {transformacion.ki}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-xl"> 
                Cargando los datos...
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}