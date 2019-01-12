<template>
<div>
	<SubmenuView></SubmenuView>

	<div class="container col-9 col-mx-auto">
		<div class="columns">

			<div id="content" class="column col-9">
				<ArticleView>
				</ArticleView>
				<ArticleView>
				</ArticleView>
			</div>

			<div id="sidebar" class="column col-3 hide-md">
				<SidebarBlock></SidebarBlock>
			</div>

		</div>
	</div>
</div>

</template>

<script>
const ArticleView = require('./../components/article.vue')
const SidebarBlock = require('./../components/sidebar-block.vue')
const SubmenuView = require('./../components/submenu.vue')

module.exports = {
	components: {
		ArticleView,
		SidebarBlock,
		SubmenuView
	}
}
</script>

