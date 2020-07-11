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

		<div class="pagination">
			<button class="btn btn-default" @click="loadMovies(pagination.prev_page_url)" :disabled="!pagination.prev_page_url">
				Anterior
			</button>
			<span>Página {{ pagination.current_page }} de {{pagination.last_page}}</span>
			<button class="btn btn-default" @click="loadMovies(pagination.next_page_url)" :disabled="!pagination.next_page_url">
				Próxima
			</button>
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
			serviceFilmes: new FilmesApiService(this),
            pagination: {}
		}
	},
	created() {
		this.loadMovies();
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
		},
		loadMovies(next) {
			let nextPage = '';
			if (next) {
				nextPage = (next.split('?')[1]);
			}
			this.serviceFilmes
				.getMovies(nextPage)
				.then(res => {
					this.makePagination(res.movies.data);
					this.movies = res.movies.data.data;
				});
		},
		makePagination: function(data){
			let pagination = {
				current_page: data.current_page,
				last_page: data.last_page,
				next_page_url: data.next_page_url,
				prev_page_url: data.prev_page_url
			}

			this.pagination = pagination;
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