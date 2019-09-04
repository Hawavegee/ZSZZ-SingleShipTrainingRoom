import Vue from 'vue'
import VueRouter from 'vue-router'

import welcome from './views/welcome.vue';
import home from './views/home.vue';
import vote from './views/vote.vue';

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes: [
        { path: '/', component: welcome },
        { path: '/home', component: home },
        { path: '/vote', component: vote },
    ]
});