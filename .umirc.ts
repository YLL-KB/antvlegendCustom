import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/pieDemoIndex/index' },
    { path: '/index', component: '@/pages/index' },

    // { path: '/g2demo', component: '@/pages/G2Demo/index' },
  ],
  fastRefresh: {},
});
