import { useState, useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters () {
  const { filters, setFilters } = useFilters()

  const [ minPrice, setMinPrice ] = useState(0)

  const minPriceFilterId = useId()
  const categoryFilterId = useId()


  const handleChangeMinPrice = ( event ) => {
    setFilters( prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = ( event ) => {
    //! Estamos pasando la función de actualizar estado
    //! nativa de React a un componente hijo
    setFilters( prevState => ({
      ...prevState,
      category: event.target.value
    }) )
  }

  return (
    <>
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio</label>
        <input
          type="range"
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={ filters.minPrice }
        />
        <span>${ filters.minPrice }</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='groceries'>Comestibles</option>
          <option value='beauty'>Belleza</option>
          <option value='fragrances'>Fragancias</option>
        </select>
      </div>
    </section>
    </>
  )
}