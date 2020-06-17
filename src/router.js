import Vue from 'vue';
import Router from 'vue-router';
import NewMovie from './views/movie/New';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/movies/new', name: 'newMovie', component: NewMovie },
	]
});
 