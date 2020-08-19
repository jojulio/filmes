<template>
	<my-card class="mt-4" :col="12">
		<h5 class="card-title">Cadastro de Pessoa</h5>

		<form ref="formContainer" @submit.prevent="save()">
			<div class="form-row">
				<div class="form-group col-md-2">
					<label for="imdb_id">ID IMDB</label>
					<input type="text" class="form-control" v-on:change="loadValuesFromTmdb" v-model="model.imdb_id">
				</div>
			</div>
			<button type="submit" class="btn btn-primary">{{ button }}</button>
		</form>
	</my-card>
</template>

<script>
import Card from '../../components/shared/card/Card';
import TmdbApiService from '../../domain/TmdbApiService';

export default {
	components: {
		'my-card' : Card,
	},
	data() {
		return {
			button: 'Salvar',
			serviceTmdb: new TmdbApiService(this),
			model: {
				imdb_id: ''
			}
		}
	},
	methods: {
		async loadValuesFromTmdb() {
			this.serviceTmdb
				.getByImdbCode(this.model.imdb_id)
				.then(res => {
					console.log(res)
				}, () => {
					//this.loader.hide();
				});
		}
	}
}
</script>

<style scoped>

</style>