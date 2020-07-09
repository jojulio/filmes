export default class UtilsService {

	getYearRelease(date) {
		let d = date.split('-');

		return ` (${d[0]})`;
	}

	formatDate(date) {
		let d = date.split('-');
		
		return ` ${d[2]}/${d[1]}/${d[0]}`;
	}

	formatGenres(genres) {
		let genresFormatted = '';

		for (let i = 0; i < genres.length; i++) {
			genresFormatted = (genresFormatted ? genresFormatted + ' | ' : '') + genres[i].name;
		}

		return genresFormatted;
	}

}