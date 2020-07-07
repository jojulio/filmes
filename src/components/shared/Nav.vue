<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<a class="navbar-brand" href="#">
		<img src="../../assets/logo1.png" width="30" height="30" class="d-inline-block align-top" alt="">
		FILMES
	</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'home' }">Home</router-link>
			</li>
			<li class="nav-item">
				<router-link class="nav-link" :to="{ name: 'listMovie' }">Filmes</router-link>
			</li>
		</ul>
		<div class="form-inline my-2 my-lg-0">
			<input class="form-control mr-sm-2" type="search" placeholder="Digite" aria-label="Search">
			<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Busca</button>
		</div>
	</div>
	</nav>
</template>

<script>
  export default {
  }
</script>

<style scoped>
nav a.nav-link {
    font-weight: bold;
}

nav a.router-link-exact-active {
	color: #fff !important;
}
</style>