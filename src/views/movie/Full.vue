<template>
	<my-card class="mt-4" :col="12">
		<div class="row movie-header">
			<div class="col-12">
				<button type="button" class="btn btn-outline-primary float-right" @click="editMovie">Editar</button>
			</div>
			<div class="col-2"></div>
			<div class="col-2">
				<div class="poster">
					<img :src="model.poster_path" class="img-thumbnail">
				</div>
			</div>
			<div class="col-6">
				<h3 class="title">{{ model.title + getYearRelease}}</h3>
				<p class="infos">
					{{ formatDate }} ({{ model.original_language}}) - 
					Título original <span>{{ model.original_title}}</span> - 
					{{ model.runtime + ' minutos'}} 
				</p>
				<h6>Sinopse</h6>
				<p class="overview"> {{model.overview }}</p>

				<p class="genres">{{ formatGenres }}</p>
			</div>
			<div class="col-2"></div>
		</div>
	</my-card>	
</template>

<script>

import Card from '../../components/shared/card/Card';
import FilmesApiService from '../../domain/FilmesApiService';
import UtilsService from '../../domain/UtilsService';

export default {
	components: {
		'my-card' : Card,
	},
	data() {
		return {
			id: this.$route.params.id,
			utilsService : new UtilsService(),
			serviceFilmes: new FilmesApiService(this),
			model: {
				tmdb_id: '',
				imdb_id : '', 
				title: '', 
				original_title: '', 
				original_language: '',
				release_date: '',
				overview: '',
				poster_path: '',
				runtime: '',
				genres: []
			},
		}
	},
	created() {
		this.serviceFilmes
			.getMovieById(this.id)
			.then(res => {
				this.model = res;
			});
	},
	computed: {
		getYearRelease: function () {
			return this.utilsService.getYearRelease(this.model.release_date);
		},
		formatDate: function() {
			return this.utilsService.formatDate(this.model.release_date);
		},
		formatGenres() {
			return this.utilsService.formatGenres(this.model.genres);
		},
	},
	methods: {
		editMovie() {
			this.$router.push('/movies/update/' + this.id);
		}
	},
}
</script>

<style scoped>
	.movie-header {
		align-items: center;
	}
	.infos {
		font-size: 15px;
	}

	.title {
		line-height: 10px;
	}

	.infos span {
		color: #666;
		font-size: 12px;
	}
</style>