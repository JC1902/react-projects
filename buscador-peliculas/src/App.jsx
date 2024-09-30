import { useEffect, useState, useRef, useCallback } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [ search, updateSearch ] = useState('')
  const [ error, setError ] = useState(null)
  const isFirstInput = useRef(true)

  useEffect( () => {
    if ( isFirstInput.current ) {
      isFirstInput.current = search === ''
      return
    }

    if ( search === '' ) {
      setError('No se puede buscar una película sin título')
      return
    }

    setError( null )
  }, [search] )
  
  return { search, updateSearch, error }
}

function App() {
  const [ sort, setSort ] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback( debounce( search => {
    getMovies({ search })
  }, 300 ), [getMovies] )

  const handleSort = () => {
    setSort( !sort )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()
    /*
    const { query } = Object.fromEntries( 
      new window.FormData( event.target ) 
    )
    */
    getMovies( { search } )
  }

  const handleChange = ( event ) => {
    const newSearch = event.target.value
    updateSearch( newSearch )
    debouncedGetMovies( newSearch )
  }

  return (
    <>
      <div className='page' onSubmit={handleSubmit}>

        <header>
          <h1>Buscador de películas</h1>
          <form className='form'>
            <input onChange={handleChange} value={ search } name='query' placeholder='Avengers, Star Wars, The Matrix...'/>
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{color: 'red'}}>{error}</p>}
        </header>

        <main>
          {
            loading ? <p>Cargando....</p> : <Movies movies={movies}/>
          }
        </main>

      </div>
    </>
  )
}

export default App
