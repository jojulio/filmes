<template>
	<div :class="classGroup">
		<label :for="id">{{ label }}</label>
		<input v-if="type !== 'textarea'" :type="type" :class="classInput" v-on:change="changeValue" v-model="data" />
		<textarea v-else :type="type" :class="classInput" v-on:change="changeValue" v-model="data" :rows="rows" />
	</div>
</template>

<script>
export default {
	props: {
		classGroup: String,
		type: {
			type: String,
			default: 'text'
		},
		classInput: {
			type: String,
			default: 'form-control'
		},
		id: String,
		label: String,
		model: String,
		callback: Function,
		data: String,
		rows: String, 
	},
	data() {
		return {
			value: this.data || ''
		}
	},
    methods: {
		changeValue() {
			if (this.callback) {
				return this.callback(this.data);
			}
		}
    }
	
}
</script>

<style scoped>

</style>