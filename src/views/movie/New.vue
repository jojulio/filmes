<template>
  <my-card margin="mt-4 ml-1 mr-1" :col="12">
    <h5 class="card-title">Cadastro de filmes</h5>
    
    <form>
      <div class="row">
        <div class="col-9">
          <div class="form-row">

            <div class="form-group col-md-2">
              <label for="imdb_id">ID IMDB</label>
              <input type="text" class="form-control" name="imdb_id" v-model="imdb" v-on:change="loadValuesFromTMDB">
            </div>

            <div class="form-group col-md-5">
              <label for="title">Título</label>
              <input type="text" class="form-control" name="title">
            </div>

            <div class="form-group col-md-5">
              <label for="title">Título original</label>
              <input type="text" class="form-control" name="original_title">
            </div>

            <div class="form-group col-md-4">
              <label for="original_language">Linguagem</label>
              <input type="text" class="form-control" name="original_language">
            </div>

            <div class="form-group col-md-4">
              <label for="release_date">Data de estreia</label>
              <input type="date" class="form-control" name="release_date">
            </div>

            <div class="form-group col-md-4">
              <label for="duration">Duração</label>
              <input type="number" class="form-control" name="duration">
            </div>

            <div class="form-group col-md-12">
              <label for="overview">Sinopse</label>
              <textarea class="form-control" name="overview" rows="8"></textarea>
            </div>
          </div>
        </div>
        <div class="col-3">
            <div class="form-group col-md-12">
              <label for="poster_path">Poster</label>
              <input type="text" class="form-control" name="poster_path" v-model="poster">
            </div>
            <div class="form-group col-md-12 img-poster">
              <img :src="poster">
            </div>
        </div>
      </div>
      
     
      <button type="submit" class="btn btn-primary">Salvar</button>
    </form>
  </my-card>
</template>

<script>

import Card from '../../components/shared/Card';

export default {
  components: {
    'my-card' : Card
  },
  data() {
    return {
      poster : '',
      imdb: ''
    }
  },
	methods: {
		loadValuesFromTMDB() {
      console.log(this.imdb);

      this.$http.get('https://api.themoviedb.org/3/find/tt7286456?api_key=99036d33394962b8dcb1c61dde34edf3&language=pt-BR&external_source=imdb_id')
      .then(response => {
        console.log(response)
      }, err => {
				console.log(err);
				throw new Error('Não foi possível obter as fotos');
      });

		}
	}
}
</script>

<style>
.img-poster {
  height: 324px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.img-poster img {
  width: 100%;
}
</style>
