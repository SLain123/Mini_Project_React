class LoadData {
    _swapi = 'https://swapi.dev/api/';

    async getData(url) {
        const request = await fetch(`${this._swapi}${url}`);
        if (!request.ok) {
            throw new Error(`Ошибка при загрузке ${request.url}: ${request.status}`);
        }
        const data = await request.json();
    
        return data;
    }

    getAllUnit(unit) {
        return this.getData(`${unit}/`).then(data => {
            return data.results;
        })
    }

    getUnit(unit, id) {
        return this.getData(`${unit}/${id}`).then(data => {
            return data;
        })
    }
}

export default LoadData;