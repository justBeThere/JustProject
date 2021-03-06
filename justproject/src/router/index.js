import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import Home from '@/components/Home'
import ProjectList from '@/components/ProjectList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test/:id',
      name: 'foo',
      component: Test
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/ProjectList',
          name: 'ProjectList',
          component: ProjectList,
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
})
