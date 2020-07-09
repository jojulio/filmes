import Vue from 'vue';
import Router from 'vue-router';
import NewMovie from '@/views/movie/New';
import ListMovie from '@/views/movie/List';
import FullMovie from '@/views/movie/Full';
import Home from '@/views/home/Home';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/movies', name: 'listMovie', component: ListMovie },
		{ path: '/movies/new', name: 'newMovie', component: NewMovie },
		{ path: '/movies/:id', name: 'FullMovie', component: FullMovie },
		{ path: '/', name: 'home', component: Home },
	]
});
 