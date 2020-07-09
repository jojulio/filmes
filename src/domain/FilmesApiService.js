export default class FilmesApiService {

	constructor(resource) {
		this._resource = resource;
		this.link = 'http://127.0.0.1:8000/api';
		this.key = 'abc';
	}

	getGenres() {
		return this._resource.$http.get(`${this.link}/get/genres?apiKey=${this.key}`)
			.then(res => res.json())
			.then (null, err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			});
	}

	saveMovie(data) {
		return this._resource.$http.post(`${this.link}/save/movies?apiKey=${this.key}`, data)
		.then(
			res => {
				console.log(res)
			}, 
			err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			}
			
		)
	}

	getMovies() {
		return this._resource.$http.get(`${this.link}/get/movies?apiKey=${this.key}`)
			.then(res => res.json())
			.then (null, err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			});
	}

	getMovieById(id) {
		return this._resource.$http.get(`${this.link}/get/movies/${id}?apiKey=${this.key}`)
			.then(res => res.json())
			.then (null, err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			});
	}
}