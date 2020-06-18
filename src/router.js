import Vue from 'vue';
import Router from 'vue-router';
import NewMovie from '@/views/movie/New';
import Home from '@/views/home/Home';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/movies/new', name: 'newMovie', component: NewMovie },
		{ path: '/', name: 'home', component: Home },
	]
});
 