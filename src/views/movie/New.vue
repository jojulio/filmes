<template>
	<my-card class="mt-4" :col="12">
    <h5 class="card-title">{{ cardTitle }}</h5>
    
    <form ref="formContainer" @submit.prevent="save()">
      <div class="row">
        <div class="col-9">
          <div class="form-row">

            <my-input-group classGroup="form-group col-md-2" id="title" label="ID IMDB" :data="model.imdb_id" :callback="loadValuesFromTmdb" />
            <my-input-group classGroup="form-group col-md-5" id="title" label="Título" :data="model.title" />
            <my-input-group classGroup="form-group col-md-5" id="originalTitle" label="Título original" :data="model.original_title" />
            <my-input-group classGroup="form-group col-md-4" id="originalLanguage" label="Linguagem" :data="model.original_language" />
            <my-input-group classGroup="form-group col-md-4" id="releaseDate" label="Data de estreia" :data="model.release_date" />
            <my-input-group classGroup="form-group col-md-4" id="runtime" label="Duração" :data="model.runtime" type="number" />
            <my-input-group classGroup="form-group col-md-12" id="overview" label="Sinopse" :data="model.overview" type="textarea" rows=8 />


            <div class="form-group col-md-12">
              <label for="genres">Gêneros</label>
              <multiselect v-model="model.genres" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Selecione" label="name" track-by="name">
              </multiselect>
            </div>
          </div>
        </div>
        <div class="col-3">
            <my-input-group classGroup="form-group col-md-12" id="posterPath" label="Poster" :data="model.poster_path" />
            <div class="form-group col-md-12 img-poster">
              <img :src="model.poster_path">
            </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">{{ button }}</button>
    </form>
  </my-card>
</template>

<script>

import Card from '../../components/shared/Card';
import InputGroup from '../../components/shared/InputGroup';
import TmdbApiService from '../../domain/TmdbApiService';
import FilmesApiService from '../../domain/FilmesApiService';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    'my-card' : Card,
    'multiselect': Multiselect,
    'my-input-group': InputGroup,
  },
  data() {
    return {
      id: this.$route.params.id,
      serviceFilmes: new FilmesApiService(this),
      serviceTmdb: new TmdbApiService(this),
      button: 'Salvar',
      model: {
        id: '',
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
      genresTmdb: [],
      cardTitle: 'Cadastro de filmes',
    }
  },
	methods: {
		async loadValuesFromTmdb(imdb_id) {
      this.model.imdb_id = imdb_id;
      this.loader = this.$loading.show({
        container: this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        opacity: 1,
      });

      await this.serviceTmdb
        .getByImdbCode(this.model.imdb_id)
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
        }, () => {
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
      this.serviceFilmes
        .saveMovie(this.model)
        .then(res => {
          if(res.status) {
            this.$notify({
              type: 'success',
              title: 'Informação',
              text: 'Salvo com sucesso'
            });

            this.$router.push('/movies/' + parseInt(res.movie_id));
          } else {
            this.$notify({
              type: 'warn',
              title: 'Informação',
              text: 'Não foi possível ' + this.button.toLowerCase()
            });
          }
        }, () => {
            this.$notify({
              type: 'warn',
              title: 'Informação',
              text: 'Não foi possível ' + this.button.toLowerCase()
            });
        });
    }
  },
  created: function(){
      this.getGenres();

      if (this.id) {
        this.button = 'Atualizar';
        this.serviceFilmes
          .getMovieById(this.id)
          .then(res => {
            this.model = res;
          });
      }
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
