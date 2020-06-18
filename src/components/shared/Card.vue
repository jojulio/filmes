<template>
	<div class="row" :class="margin">
		<div :class="formatCol">
			<div class="card">
				<div class="card-body">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		margin: String,
		col: Number,
	},
	computed: {
		formatCol: function () {
			return `col-${ this.col }`;
		}
	}
}
</script>

<style>
</style>