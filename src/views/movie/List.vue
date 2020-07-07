<template>
	<my-card margin="mt-4 ml-1 mr-1" :col="12">
		<h5 class="card-title">Filmes</h5>
		<div class="row">
			<my-card :col="2" v-for="movie in movies" :key="movie.id" :img="movie.poster_path">
				<h5 class="card-title">{{ movie.title }}</h5>
				<p class="card-text">{{ overviewShort(movie.overview) }}</p>
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
			return (overview.length > 100) ? overview.substring(0,100) + ' ...' : overview;
		}
	},
}
</script>

<style scoped>

</style>