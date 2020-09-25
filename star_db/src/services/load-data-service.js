class LoadData {
    _swapi = 'https://swapi.dev/api/';

    async _getData(url) {
        const request = await fetch(`${this._swapi}${url}`);
        if (!request.ok) {
            throw new Error(`Ошибка при загрузке ${request.url}: ${request.status}`);
        }
        const data = await request.json();
    
        return data;
    }

    getAllUnit(unit) {
        return this._getData(`${unit}/`).then(data => {
            return data.results.map((data, i) => {
                switch(unit) {
                    case 'planets':
                    return {
                        id: i + 1,
                        name: data.name
                    };
                    case 'people':
                    return {
                        id: i + 1,
                        name: data.name
                    };
                    case 'starships':
                    return {
                        id: i + 1,
                        name: data.name
                    };
                    default: return 'No exist data type';
                }
                
            });
        })
    }

    getUnit(unit, id) {
        return this._getData(`${unit}/${id}`).then(data => {
                switch(unit) {
                    case 'planets': 
                    return {
                        id,
                        name: data.name,
                        population: data.population,
                        rotationPeriod: data.rotation_period,
                        diameter: data.diameter,
                        orbitalPeriod: data.orbital_period,
                        gravity: data.gravity,
                        climate: data.climate,
                        terrain: data.terrain
                    };
                    case 'people': 
                    return {
                        id,
                        name: data.name,
                        eyeColor: data.eye_color,
                        birthYear: data.birth_year,
                        gender: data.gender,
                        hairColor: data.hair_color,
                        height: data.height,
                        mass: data.mass,
                        skinColor: data.skin_color
                    };
                    case 'starships': 
                    return {
                        id,
                        name: data.name,
                        model: data.model,
                        cargoCapacity: data.cargo_capacity,
                        consumables: data.consumables,
                        cost: data.cost_in_credits,
                        hyperDriveRating: data.hyperdrive_rating,
                        length: data.length,
                        maxAtmospheringSpeed: data.max_atmosphering_speed,
                        passengers: data.passengers,
                        starshipClass: data.starship_class
                    };
                    default: return 'No exist data type';
                }
            })
    }

    getImage(unit, id) {
        const baseURL = 'https://starwars-visualguide.com/assets/img'
        switch(unit) {
            case('people'):
                return `${baseURL}/characters/${id}.jpg`;

            case 'planets':
                return `${baseURL}/planets/${id}.jpg`;
                
            case 'startships':
                return `${baseURL}/starships/${id}.jpg`;
            
            default: return 'No exist data type';
        }
    }
}

// const dataTest = new LoadData();

// dataTest.getAllUnit('starships').then(p => {
//     console.log(p);
// })

export default LoadData;