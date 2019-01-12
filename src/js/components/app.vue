<template>
	<div>
		<HeaderComponent></HeaderComponent>

		<router-view></router-view>
	</div>
</template>

<script>
const VueRouter = require('vue-router')
const HeaderComponent = require('./header.vue')

module.exports = {
	components: {
		HeaderComponent
	}
}
</script>
