import { useQuery } from "@tanstack/react-query";

const getRandomNumberFromApi = async():Promise<number> => {
    const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new');
    const numberString = await res.text();

    // Simulamos un error
    //throw new Error('Error de prueba');

    //con el + convertimos el string en number
    return +numberString;
}


export const App = () => {

    const query = useQuery(
        ['randomNumber'],
        getRandomNumberFromApi
    );

  return (
    <div className="App-header">
        {
            query.isFetching
            ? (<h2>Cargando...</h2>)
            : (<h2>Numero Aleatorio: {query.data}</h2>)
        }

        {
            !query.isLoading && query.isError && (<h3>{`${ query.error }`}</h3>)
        }

        <button 
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            >
                {
                    query.isFetching
                    ? 'Cargando...'
                    : 'Refrescar'
                }
            </button>
            
    </div>
  )
}
