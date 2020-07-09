<template>
	<div :class="formatCol">
		<div class="card">
			<img v-if="img" class="card-img-top" :src="img" alt="Card image cap">
			<div class="card-body">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		margin: String,
		col: Number,
		img: String
	},
	computed: {
		formatCol: function () {
			return `col-${ this.col }`;
		}
	}
}
</script>

<style scoped>
	img {
		width: 100%;
	}

	.movie {
		cursor: pointer;
	}

	.movie img {
		transition: all .5s;
	}

	.movie:hover img{
		opacity: 0.2;
	}
</style>