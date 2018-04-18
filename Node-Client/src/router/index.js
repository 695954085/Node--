import Vue from 'vue'
import Router from 'vue-router'
import LiuYanBen from '@/components/LiuYanBen'
import login from '@/components/login'
import { isLogin } from '../api/api';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'LiuYanBen',
      component: LiuYanBen
    },
    {
      path: '/liuyanben',
      name: 'LiuYanBen',
      component: LiuYanBen
    }, {
      path: '/login',
      name: "login",
      component: login
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (to.path !== '/login') {
    isLogin().then(value => {
      console.log(value.data);
      let { data } = value;
      if (data.isLogin !== true) {
        next({ path: '/login' });
        return;
      }
      next();
    });
  } else {
    next();
  }
});

export default router;
