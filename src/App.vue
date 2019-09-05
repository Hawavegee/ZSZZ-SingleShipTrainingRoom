<template>
	<div>
		<!-- 侧边导航条条 -->
		<nav :class="['navbar_'+preferences.settings.navbar.pos.value]">
			<ul :style="{fill: navbar.opened ? undefined : 'rgba(0,0,0,0.4)'}">
				<!-- 切换列表详情显示 -->
				<li @click="toggleNavbar" title="菜单">
					<a>
						<div v-html="navbar.icon_menu"></div>
						<span v-if="navbar.opened">菜单</span>
					</a>
				</li>
				<!-- 偏好设置 -->
				<li @click="preferences.setting = !preferences.setting" title="偏好设置">
					<a>
						<div v-html="navbar.icon_preferences"></div>
						<span v-if="navbar.opened">偏好设置</span>
					</a>
				</li>
				<!-- 页面切换功能 -->
				<li v-for="(l, i) in navbar.navLinks" :key="'link'+i" :title="l.title" @click="preferences.setting=false">
					<router-link :to="l.url">
						<div v-html="l.icon"></div>
						<span v-if="navbar.opened">{{l.title}}</span>
					</router-link>
				</li>
				<!-- 快捷按钮 -->
				<hr v-if="navbar.tools.length > 0" />
				<li v-for="(t, i) in navbar.tools" :key="'tool'+i" :title="t.name" @click="t.onclick">
					<a>
						<div v-html="t.icon"></div>
						<span v-if="navbar.opened">{{t.name}}</span>
					</a>
				</li>
			</ul>
		</nav>
		<!-- 偏好设置 -->
		<div v-if="preferences.setting">
			<h1>偏好设置</h1>
			<ul id="preferences" v-for="(sc, scInnerName) in preferences.settings" :key="'sc'+scInnerName">
				<!-- 子类别 -->
				<li class="subclass">
					<span>{{ preferences._subclassNames[scInnerName] }}</span>
					<ul v-for="(p, pInnerName) in sc" :key="'p'+scInnerName+pInnerName">
						<!-- 设置项 -->
						<li class="preference">
							<span>{{ p.name }}</span>
							<div class="radio" v-if="p.type==='radio'">
								<div
									class="radio_options"
									:class="{radio_option_selected: innerName === p.value}"
									v-for="(showName, innerName) in p.options"
									:key="'p_'+scInnerName+pInnerName+innerName"
									@click="p.value=innerName"
								>{{ showName }}</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 页面内容 -->
		<router-view
			v-else
			@settools="setTools"
			@resettools="resetTools"
			@getpreferences="getPreferences"
			@setpreferences="setPreferences"
		></router-view>
	</div>
</template>

<script>
// 图标集
const icon_menu = '<svg stroke-width="1%" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 784H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zM904 472H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"/></svg>'
const icon_preferences = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" t="1567641806377" p-id="8572" version="1.1"><path d="M 924.8 625.7 l -65.5 -56 c 3.1 -19 4.7 -38.4 4.7 -57.8 s -1.6 -38.8 -4.7 -57.8 l 65.5 -56 c 10.1 -8.6 13.8 -22.6 9.3 -35.2 l -0.9 -2.6 c -18.1 -50.5 -44.9 -96.9 -79.7 -137.9 l -1.8 -2.1 c -8.6 -10.1 -22.5 -13.9 -35.1 -9.5 l -81.3 28.9 c -30 -24.6 -63.5 -44 -99.7 -57.6 l -15.7 -85 c -2.4 -13.1 -12.7 -23.3 -25.8 -25.7 l -2.7 -0.5 c -52.1 -9.4 -106.9 -9.4 -159 0 l -2.7 0.5 c -13.1 2.4 -23.4 12.6 -25.8 25.7 l -15.8 85.4 c -35.9 13.6 -69.2 32.9 -99 57.4 l -81.9 -29.1 c -12.5 -4.4 -26.5 -0.7 -35.1 9.5 l -1.8 2.1 c -34.8 41.1 -61.6 87.5 -79.7 137.9 l -0.9 2.6 c -4.5 12.5 -0.8 26.5 9.3 35.2 l 66.3 56.6 c -3.1 18.8 -4.6 38 -4.6 57.1 c 0 19.2 1.5 38.4 4.6 57.1 L 99 625.5 c -10.1 8.6 -13.8 22.6 -9.3 35.2 l 0.9 2.6 c 18.1 50.4 44.9 96.9 79.7 137.9 l 1.8 2.1 c 8.6 10.1 22.5 13.9 35.1 9.5 l 81.9 -29.1 c 29.8 24.5 63.1 43.9 99 57.4 l 15.8 85.4 c 2.4 13.1 12.7 23.3 25.8 25.7 l 2.7 0.5 c 26.1 4.7 52.8 7.1 79.5 7.1 c 26.7 0 53.5 -2.4 79.5 -7.1 l 2.7 -0.5 c 13.1 -2.4 23.4 -12.6 25.8 -25.7 l 15.7 -85 c 36.2 -13.6 69.7 -32.9 99.7 -57.6 l 81.3 28.9 c 12.5 4.4 26.5 0.7 35.1 -9.5 l 1.8 -2.1 c 34.8 -41.1 61.6 -87.5 79.7 -137.9 l 0.9 -2.6 c 4.5 -12.3 0.8 -26.3 -9.3 -35 Z M 788.3 465.9 c 2.5 15.1 3.8 30.6 3.8 46.1 s -1.3 31 -3.8 46.1 l -6.6 40.1 l 74.7 63.9 c -11.3 26.1 -25.6 50.7 -42.6 73.6 L 721 702.8 l -31.4 25.8 c -23.9 19.6 -50.5 35 -79.3 45.8 l -38.1 14.3 l -17.9 97 c -28.1 3.2 -56.8 3.2 -85 0 l -17.9 -97.2 l -37.8 -14.5 c -28.5 -10.8 -55 -26.2 -78.7 -45.7 l -31.4 -25.9 l -93.4 33.2 c -17 -22.9 -31.2 -47.6 -42.6 -73.6 l 75.5 -64.5 l -6.5 -40 c -2.4 -14.9 -3.7 -30.3 -3.7 -45.5 c 0 -15.3 1.2 -30.6 3.7 -45.5 l 6.5 -40 l -75.5 -64.5 c 11.3 -26.1 25.6 -50.7 42.6 -73.6 l 93.4 33.2 l 31.4 -25.9 c 23.7 -19.5 50.2 -34.9 78.7 -45.7 l 37.9 -14.3 l 17.9 -97.2 c 28.1 -3.2 56.8 -3.2 85 0 l 17.9 97 l 38.1 14.3 c 28.7 10.8 55.4 26.2 79.3 45.8 l 31.4 25.8 l 92.8 -32.9 c 17 22.9 31.2 47.6 42.6 73.6 L 781.8 426 l 6.5 39.9 Z" p-id="8573" /><path d="M 512 326 c -97.2 0 -176 78.8 -176 176 s 78.8 176 176 176 s 176 -78.8 176 -176 s -78.8 -176 -176 -176 Z m 79.2 255.2 C 570 602.3 541.9 614 512 614 c -29.9 0 -58 -11.7 -79.2 -32.8 C 411.7 560 400 531.9 400 502 c 0 -29.9 11.7 -58 32.8 -79.2 C 454 401.6 482.1 390 512 390 c 29.9 0 58 11.6 79.2 32.8 C 612.3 444 624 472.1 624 502 c 0 29.9 -11.7 58 -32.8 79.2 Z" p-id="8574" /></svg>';
const icon_smile = '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M336 421m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"  /><path d="M688 421m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"  /><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m263 711c-34.2 34.2-74 61-118.3 79.8C611 874.2 562.3 884 512 884c-50.3 0-99-9.8-144.8-29.2-44.3-18.7-84.1-45.6-118.3-79.8-34.2-34.2-61-74-79.8-118.3C149.8 611 140 562.3 140 512s9.8-99 29.2-144.8c18.7-44.3 45.6-84.1 79.8-118.3 34.2-34.2 74-61 118.3-79.8C413 149.8 461.7 140 512 140c50.3 0 99 9.8 144.8 29.2 44.3 18.7 84.1 45.6 118.3 79.8 34.2 34.2 61 74 79.8 118.3C874.2 413 884 461.7 884 512s-9.8 99-29.2 144.8c-18.7 44.3-45.6 84.1-79.8 118.2z"  /><path d="M664 533h-48.1c-4.2 0-7.8 3.2-8.1 7.4C604 589.9 562.5 629 512 629s-92.1-39.1-95.8-88.6c-0.3-4.2-3.9-7.4-8.1-7.4H360c-4.6 0-8.2 3.8-8 8.4 4.4 84.3 74.5 151.6 160 151.6s155.6-67.3 160-151.6c0.2-4.6-3.4-8.4-8-8.4z"  /></svg>';
const icon_vote = '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M280 752h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8zM472 472h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v184c0 4.4 3.6 8 8 8zM664 544h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v256c0 4.4 3.6 8 8 8z"  /><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32z m-40 728H184V184h656v656z"  /></svg>';
const icon_todo = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" t="1567597220500" p-id="8304" version="1.1"><path d="M 832 64 H 192 c -17.7 0 -32 14.3 -32 32 v 832 c 0 17.7 14.3 32 32 32 h 640 c 17.7 0 32 -14.3 32 -32 V 96 c 0 -17.7 -14.3 -32 -32 -32 Z m -40 824 H 232 V 687 h 97.9 c 11.6 32.8 32 62.3 59.1 84.7 c 34.5 28.5 78.2 44.3 123 44.3 s 88.5 -15.7 123 -44.3 c 27.1 -22.4 47.5 -51.9 59.1 -84.7 H 792 v -63 H 643.6 l -5.2 24.7 C 626.4 708.5 573.2 752 512 752 s -114.4 -43.5 -126.5 -103.3 l -5.2 -24.7 H 232 V 136 h 560 v 752 Z" p-id="8305" /><path d="M 320 341 h 384 c 4.4 0 8 -3.6 8 -8 v -48 c 0 -4.4 -3.6 -8 -8 -8 H 320 c -4.4 0 -8 3.6 -8 8 v 48 c 0 4.4 3.6 8 8 8 Z M 320 501 h 384 c 4.4 0 8 -3.6 8 -8 v -48 c 0 -4.4 -3.6 -8 -8 -8 H 320 c -4.4 0 -8 3.6 -8 8 v 48 c 0 4.4 3.6 8 8 8 Z" p-id="8306" /></svg>';

export default {
	created() {
		// 删除后无法保存偏好设置
		addEventListener('beforeunload', () => this.$destroy());

		if (this.preferences.usable) {
			const setDefault = () => {
				this.preferences.settings = {
					navbar: {
						pos: { value: 'topleft', name: '位置', type: 'radio', options: { topleft: '左', topright: '右' } }
					}
				};
				console.log('setdefault');
			};
			const json_settings = localStorage.getItem('preferences');
			// 首次使用
			if (json_settings === null) {
				setDefault()
			} else {
				try {
					this.preferences.settings = JSON.parse(json_settings);
				} catch{
					setDefault();
				}
			}
		} else setDefault();
	},
	beforeDestroy() {
		if (this.preferences.usable) {
			localStorage.setItem('preferences', JSON.stringify(this.preferences.settings));
		}
	},
	data() {
		return {
			navbar: {
				opened: false,
				autoCloseTimer: undefined,
				// 侧边导航按钮
				icon_menu,
				icon_preferences,
				navLinks: [
					{ title: '欢迎页', icon: icon_smile, url: '/' },
					{ title: '待办事项', icon: icon_todo, url: '/todo' },
					{ title: '投票系统', icon: icon_vote, url: '/vote' },
				],
				tools: [],
			},
			// 偏好设置
			preferences: {
				usable: localStorage !== undefined,
				setting: false,
				_subclassNames: {
					navbar: '导航条'
				},
				settings: undefined
			}
		}
	},
	methods: {
		toggleNavbar() {
			this.navbar.opened = !this.navbar.opened;
			if (this.navbar.autoCloseTimer) clearTimeout(this.navbar.autoCloseTimer);
			if (this.navbar.opened) {
				this.navbar.autoCloseTimer = setTimeout(() => this.navbar.opened = false, 10000);
			}
		},
		// 给子页面提供工具
		setTools(tools) {
			this.navbar.tools = tools;
		},
		resetTools() {
			this.navbar.tools = [];
		},
		getPreferences() {
			return this.preferences;
		},
		setPreferences(preferences) {
			this.preferences = preferences;
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

	ul {
		list-style: none;
	}

	li {
		cursor: pointer;
		font-weight: bold;
		filter: drop-shadow(1px 1px 1px white);

		div {
			width: $nav-icon-size;
			height: $nav-icon-size;
		}
	}

	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: inherit;
		margin: 0.15em 0;
	}

	hr {
		margin: 0.2em 0.05em;
	}

	&.opened {
		width: auto;
	}
}

.navbar_topleft {
	left: 0;
	top: 0;
}

.navbar_topright {
	right: 0;
	top: 0;

	a {
		flex-direction: row-reverse;
	}
}

// -------- 偏好设置 --------
// 标题
h1 {
	text-align: center;
	line-height: 5rem;
}

#preferences {
	padding: 0 36px;
	list-style: none;
	max-width: 768px;
	margin: 0 auto;

	ul {
		list-style: none;
	}
}

.subclass {
	> span {
		font-size: 1.5rem;
		line-height: 2em;
	}
}

.preference {
	margin: 0 0.5em;
	display: flex;
	justify-content: space-between;
}

// 美化控件
.radio {
	border: 1px solid #ccc;
	border-radius: 0.2em;
}

.radio_options {
	display: inline-block;
	padding: 0.25em 0.75em;
	cursor: pointer;
}

.radio_options:not(.radio_option_selected):hover {
	background-color: #eee;
}

.radio_options:not(:last-child) {
	border-right: 1px solid #ccc;
}

.radio_option_selected {
	background-color: #629aef;
	color: white;
}
</style>