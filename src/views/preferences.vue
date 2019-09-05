<template>
	<div>
		<h1>偏好设置</h1>
		<ul id="preferences">
			<li class="subclass">导航条</li>
			<li class="preference">
				<span>位置</span>
				<span>
					
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	beforeDestroy() {
		this.$emit('setpreferences', this.preferences);
	},
	mounted() {
        
	},
	data() {
		return {
			preferences: {}
		}
	}
}
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
}

// 标题
h1 {
	text-align: center;
	line-height: 5rem;
}

#preferences {
	list-style: none;
	width: 768px;
	margin: 0 auto;
}

.subclass {
	font-size: 1.5rem;
	line-height: 2em;
}

.preference {
	margin: 0 0.5em;
	display: flex;
	justify-content: space-between;
}

// 美化控件
.radio {
	input[type='radio'] {
		display: none;
	}

	label {
		border: 1px solid #ddd;
		padding: 0.25em 0.75em;
	}
}
</style>