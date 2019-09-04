<template>
    <div id="container">
        还没做
    </div>
</template>

<script>
export default {
	data() {
		return {
			navbar: {  // 侧边导航条条
				opened: false,
			}
		}
	},

	methods: {
		switchNavbar() {    // 切换nav弹出状态
			if (this.navbar.opened) { // 关闭
			} else {   //打开
			}
			this.navbar.opened = !this.navbar.opened;
		}
	}
}
</script>

<style lang="scss" scoped>
#container{
    margin: 0 32px;
}
</style>
