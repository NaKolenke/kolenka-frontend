<template>
	<div>
		<HeaderComponent></HeaderComponent>
		
		<div class="container">
			<div class="columns">

				<div id="content" class="column col-9">
					<router-view></router-view>
				</div>

				<div id="sidebar" class="column col-3 hide-md">
					{{message}}
				</div>

			</div>
		</div>
	</div>
</template>

<script>
const VueRouter = require('vue-router')
const HeaderComponent = require('./header.vue')

module.exports = {
	components: {
		HeaderComponent
	},
	data () {
		return {
			message: 'hello'
		}
	}
}
</script>
