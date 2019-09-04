<template>
	<div>
		<nav>
			<ul>
				<li @click="toggleNavbar">
					<a>
						<img src="./views/icons/menu.svg" alt="菜单" title="菜单" />
						<span v-if="navbar.opened">菜单</span>
					</a>
				</li>
				<li v-for="(l, i) in navbar.navLinks" :key="i">
					<router-link :to="l.url">
						<img :src="l.icon" :alt="l.title" :title="l.title" />
						<span v-if="navbar.opened">{{l.title}}</span>
					</router-link>
				</li>
			</ul>
		</nav>
		<router-view></router-view>
	</div>
</template>

<script>
import smile from './views/icons/smile.svg';
import vote from './views/icons/vote.svg';

export default {
	data() {
		return {
			navbar: {
				opened: false,
				autoCloseTimer: undefined,
				// 侧边导航按钮
				navLinks: [
					{ title: '欢迎页', icon: smile, url: '/' },
					{ title: '投票系统', icon: vote, url: '/vote' },
				],
			},
		}
	},
	methods: {
		toggleNavbar() {
			this.navbar.opened = !this.navbar.opened;
			if (this.navbar.autoCloseTimer) clearTimeout(this.navbar.autoCloseTimer);
			if (this.navbar.opened) {
				this.navbar.autoCloseTimer = setTimeout(() => this.navbar.opened = false, 15000);
			}
		}
	}
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}

nav {
	$nav-icon-size: 32px;

	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;

	ul {
		list-style: none;
	}

	img {
		width: $nav-icon-size;
		height: $nav-icon-size;
	}

	li {
		cursor: pointer;
		font-weight: bold;
		filter: drop-shadow(1px 1px 1px white);
	}

	a {
		float: left;
		text-decoration: none;
		color: inherit;
		margin: 0.15em 0;

		> * {
			vertical-align: middle;
		}
	}

	&.opened {
		width: auto;
	}
}
</style>