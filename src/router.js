import Vue from 'vue'
import VueRouter from 'vue-router'

import preferences from './views/preferences.vue';
import welcome from './views/welcome.vue';
import home from './views/home.vue';
import vote from './views/vote.vue';
import todo from './views/todo.vue';

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: welcome },
        { path: '/preferences', component: preferences },
        { path: '/home', component: home },
        { path: '/vote', component: vote },
        { path: '/todo', component: todo },
    ]
});