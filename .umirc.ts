import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    // { path: '/g2demo', component: '@/pages/G2Demo/index' },

  ],
  fastRefresh: {},
});
