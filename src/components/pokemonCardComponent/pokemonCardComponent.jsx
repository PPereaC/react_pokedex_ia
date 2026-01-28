import "./pokemonCardComponent.css"
import { Col } from "react-bootstrap"
import {getPokemonDetails} from "../../services/pokeApiSerive"
import {formatPokedexPosition} from "../../services/helperService"
import { useState, useEffect } from "react";

function PokemonCardComponent({name, url}){

    const [hp, setHp] = useState(0);
    const [pokedexPosition, setPokedexPosition] = useState("");
    const [pokemonImage, setPokemonImage] = useState("");
    const [types, setTypes] = useState([]);
    const [attack, setAttack] = useState(0);
    const [defense, setDefense] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        getPokemonDetails(url).then((response) => {
            setHp(response.stats[0].base_stat);
            setPokedexPosition(formatPokedexPosition(response.order));
            setPokemonImage(response.sprites.other['official-artwork'].front_default);
            setTypes(response.types);
            setAttack(response.stats[1].base_stat);
            setDefense(response.stats[2].base_stat);
            setSpeed(response.stats[5].base_stat);
            setWeight((response.weight / 10).toFixed(1));
            setHeight((response.height / 10).toFixed(1));
        });
    }, [url]);

    const getCardColor = () => {
        if (!types.length) return '#A8A878';
        const type = types[0].type.name;
        const colors = {
            fire: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            water: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
            grass: 'linear-gradient(135deg, #81C784 0%, #66BB6A 100%)',
            electric: 'linear-gradient(135deg, #FFD54F 0%, #FFC107 100%)',
            psychic: 'linear-gradient(135deg, #F48FB1 0%, #EC407A 100%)',
            ice: 'linear-gradient(135deg, #80DEEA 0%, #4DD0E1 100%)',
            dragon: 'linear-gradient(135deg, #7E57C2 0%, #673AB7 100%)',
            dark: 'linear-gradient(135deg, #757575 0%, #616161 100%)',
            fairy: 'linear-gradient(135deg, #F8BBD0 0%, #F06292 100%)',
            normal: 'linear-gradient(135deg, #BDBDBD 0%, #9E9E9E 100%)',
            fighting: 'linear-gradient(135deg, #E57373 0%, #EF5350 100%)',
            flying: 'linear-gradient(135deg, #90CAF9 0%, #64B5F6 100%)',
            poison: 'linear-gradient(135deg, #BA68C8 0%, #AB47BC 100%)',
            ground: 'linear-gradient(135deg, #D4A373 0%, #C49A6C 100%)',
            rock: 'linear-gradient(135deg, #A1887F 0%, #8D6E63 100%)',
            bug: 'linear-gradient(135deg, #AED581 0%, #9CCC65 100%)',
            ghost: 'linear-gradient(135deg, #9575CD 0%, #7E57C2 100%)',
            steel: 'linear-gradient(135deg, #B0BEC5 0%, #90A4AE 100%)',
        };
        return colors[type] || colors.normal;
    };

    return (
        <>
            <Col lg={4} md={6} className="mb-4">
                <div className="pokemon-card-main" style={{ background: getCardColor() }}>
                    <div className="card-shine"></div>
                    <div className="pokemon-card-container">
                        <div className="pokemon-card-header">
                            <h3 className="pokemon-name">{name}</h3>
                            <div className="pokemon-stats-header">
                                <span className="hp-label">HP {hp}</span>
                                <span className="pokedex-number">#{pokedexPosition}</span>
                            </div>
                        </div>
                        
                        <div className="type-badges-container">
                            {types.map((type, index) => (
                                <span key={index} className={`type-pill type-${type.type.name}`}>
                                    {type.type.name.toUpperCase()}
                                </span>
                            ))}
                        </div>
                        
                        <div className="pokemon-card-image-container">
                            <div className="image-frame">
                                <div className="pokeball-bg"></div>
                                {pokemonImage && (
                                    <img src={pokemonImage} alt={name} className="pokemon-image" />
                                )}
                            </div>
                        </div>
                        
                        <div className="pokemon-info-bar">
                            <div className="info-item">
                                <span className="info-label">Weight</span>
                                <span className="info-value">{weight} kg</span>
                            </div>
                            <div className="info-divider"></div>
                            <div className="info-item">
                                <span className="info-label">Height</span>
                                <span className="info-value">{height} m</span>
                            </div>
                        </div>
                        
                        <div className="pokemon-card-abilities">
                            <h4 className="abilities-title">STATS</h4>
                            <div className="ability-item">
                                <div className="ability-info">
                                    <span className="ability-name">⚔️ Attack</span>
                                </div>
                                <div className="stat-bar-container">
                                    <div className="stat-bar" style={{ width: `${(attack / 150) * 100}%` }}></div>
                                </div>
                                <span className="ability-power">{attack}</span>
                            </div>
                            <div className="ability-item">
                                <div className="ability-info">
                                    <span className="ability-name">🛡️ Defense</span>
                                </div>
                                <div className="stat-bar-container">
                                    <div className="stat-bar" style={{ width: `${(defense / 150) * 100}%` }}></div>
                                </div>
                                <span className="ability-power">{defense}</span>
                            </div>
                            <div className="ability-item">
                                <div className="ability-info">
                                    <span className="ability-name">⚡ Speed</span>
                                </div>
                                <div className="stat-bar-container">
                                    <div className="stat-bar" style={{ width: `${(speed / 150) * 100}%` }}></div>
                                </div>
                                <span className="ability-power">{speed}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default PokemonCardComponent