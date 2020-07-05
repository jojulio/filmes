<template>
  <my-card margin="mt-4 ml-1 mr-1" :col="12">
    <notifications position="bottom left" />
    <h5 class="card-title">Cadastro de filmes</h5>
    
    <form ref="formContainer" @submit.prevent="save()">
      <div class="row">
        <div class="col-9">
          <div class="form-row">

            <div class="form-group col-md-2">
              <label for="imdb_id">ID IMDB</label>
              <input type="text" class="form-control" v-on:change="loadValuesFromTmdb" v-model="model.imdb_id" >
            </div>

            <div class="form-group col-md-5">
              <label for="title">Título</label>
              <input type="text" class="form-control" v-model="model.title">
            </div>

            <div class="form-group col-md-5">
              <label for="title">Título original</label>
              <input type="text" class="form-control" v-model="model.original_title"> 
            </div>

            <div class="form-group col-md-4">
              <label for="original_language">Linguagem</label>
              <input type="text" class="form-control" v-model="model.original_language">
            </div>

            <div class="form-group col-md-4">
              <label for="release_date">Data de estreia</label>
              <input type="date" class="form-control" v-model="model.release_date">
            </div>

            <div class="form-group col-md-4">
              <label for="runtime">Duração</label>
              <input type="number" class="form-control" v-model="model.runtime">
            </div>

            <div class="form-group col-md-12">
              <label for="overview">Sinopse</label>
              <textarea class="form-control" rows="8" v-model="model.overview"></textarea>
            </div>
            <div class="form-group col-md-12">
              <label for="genres">Gêneros</label>
              <multiselect v-model="model.genres" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Selecione" label="name" track-by="name">
              </multiselect>
            </div>
          </div>
        </div>
        <div class="col-3">
            <div class="form-group col-md-12">
              <label for="poster_path">Poster</label>
              <input type="text" class="form-control" v-model="model.poster_path">
            </div>
            <div class="form-group col-md-12 img-poster">
              <img :src="model.poster_path">
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
import FilmesApiService from '../../domain/FilmesApiService';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    'my-card' : Card,
    'multiselect': Multiselect
  },
  data() {
    return {
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
      fullPage: true,
      loader: '',
      options: [],
      genresTmdb: []
    }
  },
	methods: {
		async loadValuesFromTmdb() {
      this.loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        opacity: 1,
      });

      this.serviceTmdb = new TmdbApiService(this);
      await this.serviceTmdb
        .getFilmByImdbCode(this.model.imdb_id)
        .then(res => {
          if (res.movie_results.length > 0) {
            const movie = res.movie_results[0];
            
            this.model.tmdb_id = movie.id;
            this.model.title = movie.title;
            this.model.original_title = movie.original_title;
            this.model.original_language = movie.original_language;
            this.model.release_date = movie.release_date;
            this.model.overview = movie.overview;
            this.model.poster_path = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'+movie.poster_path;
            
            this.getFullInfoFromTmdb();
          } else {
            for (let prop in this.model) {
              if (prop !== 'imdb_id') {
                this.model[prop] = '';
              }
            }

            this.$notify({
              type: 'warn',
              title: 'Informação',
              text: 'Não encontrado na base de dados do IMDB'
            });
            
            this.loader.hide();
          }
        })
        .then(null, () => {
            this.loader.hide();
        });
        
    },    
    async getFullInfoFromTmdb() {
      await this.serviceTmdb
        .getFullInfoByTmdbId(this.model.tmdb_id)
        .then(res => {
            this.model.runtime = res.runtime;
            this.genresTmdb = res.genres;
            this.prepareGenres();
        });

        this.loader.hide();
    },
    getGenres() {
      this.serviceFilmes = new FilmesApiService(this);

      this.serviceFilmes
        .getGenres()
        .then(res => {
          if (res.status) {
            this.options = res.genres;
          }
        });
    },
    prepareGenres() {
      if (this.genresTmdb) {
        let newGenres = [];
        for (let i = 0; i < this.genresTmdb.length; i++) {
          const option = this.options.find(x => x.name === this.genresTmdb[i].name)
          let genre = {'id' : option.id, 'name' : this.genresTmdb[i].name };
          newGenres.push(genre);
        }
        this.model.genres = newGenres;
      }
    },
    save() {
      console.log(this.model)
      this.serviceFilmes
        .saveMovie(this.model)
        .then(res => {
          console.log(res)
        }, () => {
            this.$notify({
              type: 'warn',
              title: 'Informação',
              text: 'Não foi possível salvar'
            });
        });
    }
  },
  created: function(){
      this.getGenres();
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.img-poster {
  height: 415px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.img-poster img {
  width: 100%;
}
</style>
