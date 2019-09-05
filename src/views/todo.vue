<template>
	<div id="container">
		<h1 id="title">待办事项</h1>
		<ul id="todos">
			<li class="todo" v-for="(t, i) in todos" :key="i">
				<input type="text" v-model="t.ctn" placeholder="输入您的待办事项" @ />
			</li>
		</ul>
	</div>
</template>

<script>
const icon_addtodo = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 1024 1024" t="1567600807701" p-id="8438" version="1.1"><path d="M 696 480 H 544 V 328 c 0 -4.4 -3.6 -8 -8 -8 h -48 c -4.4 0 -8 3.6 -8 8 v 152 H 328 c -4.4 0 -8 3.6 -8 8 v 48 c 0 4.4 3.6 8 8 8 h 152 v 152 c 0 4.4 3.6 8 8 8 h 48 c 4.4 0 8 -3.6 8 -8 V 544 h 152 c 4.4 0 8 -3.6 8 -8 v -48 c 0 -4.4 -3.6 -8 -8 -8 Z" p-id="8439" /><path d="M 512 64 C 264.6 64 64 264.6 64 512 s 200.6 448 448 448 s 448 -200.6 448 -448 S 759.4 64 512 64 Z m 0 820 c -205.4 0 -372 -166.6 -372 -372 s 166.6 -372 372 -372 s 372 166.6 372 372 s -166.6 372 -372 372 Z" p-id="8440" /></svg>';

export default {
	beforeDestroy() {
		this.$emit('resettools');
	},
	mounted() {
		const test = () => {
			alert('ojjk');
		};

		this.toolsetDefault();
	},
	data() {
		return {
			todos: [],
		}
	},
	methods: {
		toolsetDefault() {
			this.$emit('settools', [
				{ name: '新建事项', icon: icon_addtodo, onclick: this.addTodo }
			]);
		},
		toolsetEdit() {
			this.$emit('settools', [
				{ name: '确认', icon: icon_addtodo, onclick: this.addTodo }
			]);
		},
		addTodo() {
			this.todos.push({
				ctn: '',
			});
		},
	}
}
</script>

<style lang="scss" scoped>
* {
	font-family: 'Arial', 'Microsoft YaHei', '黑体', '宋体', sans-serif;
	box-sizing: border-box;
}

#container {
	// padding: 0 10px 0 38px;
	width: 100%;
	box-sizing: border-box;
}

#title {
	text-align: center;
	line-height: 4rem;
}

#todos {
	list-style: none;
}

.todo {
	margin: 1em 0;

	input {
		border: 1px solid #ddd;
		border-radius: 0.2em;
		padding: 0 0.3em;
		width: 100%;
		font-size: 1.1rem;
		line-height: 2.25em;
	}
}
</style>
