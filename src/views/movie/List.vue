<template>
	<my-card class="mt-4" :col="12">
		<div class="row">
			<div class="col-12">
				<router-link class="btn btn-outline-primary float-right" :to="{ name: 'newMovie' }">Novo</router-link>
			</div>
		</div>
		<h5 class="card-title">Filmes</h5>

		<div class="row">
			<my-card class="movie mb-4" :col="2" v-for="movie in movies" :key="movie.id" :img="movie.poster_path" @click.native="openMovie(movie.id)">
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
import UtilsService from '../../domain/UtilsService';

export default {
	components: {
		'my-card' : Card,
	},
	data() {
		return {
			movies: [],
			utilsService: new UtilsService(),
			serviceFilmes: new FilmesApiService(this)
		}
	},
	created() {
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
			return this.utilsService.getYearRelease(date);
		},
		formatGenres(genres) {
			return this.utilsService.formatGenres(genres);
		},
		openMovie(id) {
			this.$router.push('/movies/' + id);
		}
	},
}
</script>

<style scoped>
.title {
    height: 48px;
}

.genres {
    height: 48px;
}

.overview {
    height: 96px;
}

</style>