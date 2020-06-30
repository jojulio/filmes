<template>
  <my-card margin="mt-4 ml-1 mr-1" :col="12">

    <h5 class="card-title">Cadastro de filmes</h5>
    
    <form>
      <div class="row">
        <div class="col-9">
          <div class="form-row">

            <div class="form-group col-md-2">
              <label for="imdb_id">ID IMDB</label>
              <input type="text" class="form-control" v-model="imdb" >
            </div>

            <div class="form-group col-md-5">
              <label for="title">Título</label>
              <input type="text" class="form-control" v-model="title">
            </div>

            <div class="form-group col-md-5">
              <label for="title">Título original</label>
              <input type="text" class="form-control" v-model="original_title"> 
            </div>

            <div class="form-group col-md-4">
              <label for="original_language">Linguagem</label>
              <input type="text" class="form-control" v-model="original_language">
            </div>

            <div class="form-group col-md-4">
              <label for="release_date">Data de estreia</label>
              <input type="date" class="form-control" v-model="release_date">
            </div>

            <div class="form-group col-md-4">
              <label for="duration">Duração</label>
              <input type="number" class="form-control">
            </div>

            <div class="form-group col-md-12">
              <label for="overview">Sinopse</label>
              <textarea class="form-control" rows="8" v-model="overview"></textarea>
            </div>
          </div>
        </div>
        <div class="col-3">
            <div class="form-group col-md-12">
              <label for="poster_path">Poster</label>
              <input type="text" class="form-control" v-model="poster">
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
import TmdbApiService from '../../domain/TmdbApiService';

export default {
  components: {
    'my-card' : Card
  },
  data() {
    return {
      imdb : '', 
      title: '', 
      original_title: '', 
      original_language: '',
      release_date: '',
      overview: '',
      poster: '',
      isLoading: false,
      fullPage: true
      
    }
  },
	methods: {
		loadValuesFromTmdb() {
      this.service = new TmdbApiService(this);
      this.service
        .getFilmByImdbCode(this.imdb)
        .then(res => {
          if (res.movie_results.length > 0) {
            const movie = res.movie_results[0];
            
            this.title = movie.title;
            this.original_title = movie.original_title;
            this.original_language = movie.original_language
            this.release_date = movie.release_date
            this.overview = movie.overview
            this.poster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+movie.poster_path;
          } else {
            console.log('não encontrado')
          }
        }); 
		}
  },
  watch: {
    imdb: function () {
      const self = this;
      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });

      setTimeout(function () { 
        self.loadValuesFromTmdb();
        loader.hide();
      }, 1000);
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
