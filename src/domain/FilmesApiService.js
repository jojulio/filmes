export default class FilmesApiService {

	constructor(resource) {
		this.http = resource.$http;
		this.link = 'http://127.0.0.1:8000/api';
		this.key = 'abc';
	}

	getGenres() {
		return this.http.get(`${this.link}/get/genres?apiKey=${this.key}`)
			.then(res => res.json(), err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			});
	}

	saveMovie(data) {
		if (data.id) {
			return this.http.put(`${this.link}/update/movie/${data.id}?apiKey=${this.key}`, data)
				.then(res => res.json(), 
					err => {
						console.log(err);
						throw new Error('Não foi possível carregar');
					}
				)
		} else {
			return this.http.post(`${this.link}/save/movies?apiKey=${this.key}`, data)
				.then(res => res.json(), 
					err => {
						console.log(err);
						throw new Error('Não foi possível carregar');
					}
				)
		}
	}

	getMovies() {
		return this.http.get(`${this.link}/get/movies?apiKey=${this.key}`)
			.then(res => res.json())
			.then (null, err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			});
	}

	getMovieById(id) {
		return this.http.get(`${this.link}/get/movies/${id}?apiKey=${this.key}`)
			.then(res => res.json())
			.then (null, err => {
				console.log(err);
				throw new Error('Não foi possível carregar');
			});
	}
}