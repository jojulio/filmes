<template>
	<my-card class="mt-4" :col="12">
		<h5 class="card-title">Filmes</h5>

		<div class="row">
			<my-card class="movie" :col="2" v-for="movie in movies" :key="movie.id" :img="movie.poster_path" @click.native="openMovie(movie.id)">
				<h5 class="card-title title">{{ movie.title + getYearRelease(movie.release_date)}}</h5>
				<p class="card-text overview">{{ overviewShort(movie.overview) }}</p>
				<p class="card-text genres">{{ formatGenres(movie.genres) }}</p>
			</my-card>
		</div>
	</my-card>
</template>

<script>
import Card from '../../components/shared/Card';
import FilmesApiService from '../../domain/FilmesApiService';

export default {
	components: {
		'my-card' : Card,
	},
	data() {
		return {
			movies: [],
		}
	},
	created() {
		this.serviceFilmes = new FilmesApiService(this);
		this.serviceFilmes
			.getMovies()
			.then(res => {
				this.movies = res.movies;
			});
	},
	methods: {
		overviewShort(overview) {
			return (overview.length > 100) ? overview.substring(0, 100) + ' ...' : overview;
		},
		getYearRelease(date) {
			let d = date.split('-');

			return ` (${d[0]})`;
		},
		formatGenres(genres) {
			let genresFormatted = '';

			for (let i = 0; i < genres.length; i++) {
				genresFormatted = (genresFormatted ? genresFormatted + ' | ' : '') + genres[i].name;
			}

			return genresFormatted;
		},
		openMovie(id) {
			console.log(id)
			//this.$router.push('/movies/' + id);
		}
	},
}
</script>

<style>
.title {
    height: 48px;
}

.genres {
    height: 48px;
}

.overview {
    height: 96px;
}

.movie {
    transition: all .5s;
}

.movie:hover .card-body{
	background: #f1f1f1;
}
.movie:hover img{
    opacity: 0.2;
}
</style>