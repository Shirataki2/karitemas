import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Group from '@/components/Group'
import Notification from '@/components/Notification'
import Settings from '@/components/Settings'
import User from '@/components/User'
import Err404 from '@/components/Err404'
import GroupView from '@/components/GroupView'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/group',
      name: 'Group',
      component: Group
    },
    {
      path: '/group/:id',
      name: 'GroupView',
      component: GroupView
    },
    {
      path: '/notification',
      name: 'Notification',
      component: Notification
    },
    {
      path: '/setting',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/404',
      name: 'PageNotFound',
      component: Err404
    },
    {
      path: '*',
      name: 'DidNotMatchAnyCase',
      component: Err404
    }
  ],
  mode: 'history'
})
