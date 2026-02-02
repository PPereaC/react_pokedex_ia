import { useState, useEffect } from 'react'

import PokemonCardComponent from '../components/pokemonCardComponent/pokemonCardComponent';

import {getPokemons} from "../services/pokeApiSerive"
import { Row, Button, Col } from 'react-bootstrap';


function Home() {
    const [pokemons, setPokemons] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const pokemonsPerPage = 9

    useEffect(() => {
        const offset = (currentPage - 1) * pokemonsPerPage
        getPokemons(pokemonsPerPage, offset).then((response) => {
          setPokemons(response.results)
          setTotalCount(response.count)
        });
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / pokemonsPerPage)

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <Row>
                {pokemons.map((pokemon, key) => (
                    <PokemonCardComponent key={key} name={pokemon.name} url={pokemon.url} ></PokemonCardComponent>
                ))}
            </Row>
            <Row className="mt-3 mb-3">
                <Col className="d-flex justify-content-center align-items-center gap-3">
                    <Button 
                        variant="primary" 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 1}
                    >
                        ← Anterior
                    </Button>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Página {currentPage} de {totalPages}
                    </span>
                    <Button 
                        variant="primary" 
                        onClick={handleNextPage} 
                        disabled={currentPage === totalPages}
                    >
                        Siguiente →
                    </Button>
                </Col>
            </Row>
        </>
    )

}

export default Home