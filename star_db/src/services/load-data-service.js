class LoadData {
    _swapi = 'https://swapi.dev/api/';

    _getData = async (url) => {
        const request = await fetch(`${this._swapi}${url}`);
        if (!request.ok) {
            throw new Error(`Ошибка при загрузке ${request.url}: ${request.status}`);
        }
        const data = await request.json();
    
        return data;
    }

    getAllUnit(unit) {
        return this._getData(`${unit}/`).then(data => {
            return data.results.map(data => {

                switch(unit) {
                    case 'planets':
                    return {
                        id: this.getId(data.url),
                        name: data.name
                    };
                    case 'people':
                    return {
                        id: this.getId(data.url),
                        name: data.name
                    };
                    case 'starships':
                    return {
                        id: this.getId(data.url),
                        name: data.name
                    };
                    default: return 'No exist data type';
                }
                
            });
        })
    }

    getId = url => {
        const regExp = /\/([0-9]*)\/$/;
        return url.match(regExp)[1];
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

    getImage = async (unit, id) => {
        const baseURL = 'https://starwars-visualguide.com/assets/img';
        let genURL;
        switch(unit) {
            case 'people':
                genURL = `${baseURL}/characters/${id}.jpg`;
                break;

            case 'planets':
                genURL = `${baseURL}/planets/${id}.jpg`;
                break;
                
            case 'starships':
                genURL = `${baseURL}/starships/${id}.jpg`;
                break;
            
            default: genURL = 'No exist data type';
        }
        
        return await fetch(genURL)
            .then(request => {
                if(!request.ok) {
                    return 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
                } else {
                    return genURL;
                }
            });
        }
}

// const data = new LoadData();

// data._getData(`starships/`).then(data => {
//     console.log(data);
// });

// console.log(data.getId('https://swapi.dev/api/starships/5/'));

export default LoadData;