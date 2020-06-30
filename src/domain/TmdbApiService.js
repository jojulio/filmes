export default class TmdbApiService {

	constructor(resource) {
		this._resource = resource;
		this.link = 'https://api.themoviedb.org/3';
		this.key = '99036d33394962b8dcb1c61dde34edf3';
	}

	getFilmByImdbCode(code) {
		return this._resource.$http.get(`${this.link}/find/${code}?api_key=${this.key}&language=pt-BR&external_source=imdb_id`)
			.then(res => res.json())
			.then (null, err => {
				console.log(err);
				throw new Error('Não foi possível carregar dados do IMDB');
			});
	}
}