import { primaryColor } from '../src/defaultSettings';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'en-US',
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{ path: '/user', component: './Welcome' }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/dashboard/analysis' },
        // dashboard
        {
          path: '/dashboard',
          name: 'Dashboard',
          icon: 'home',
          routes: [
            {
              path: '/dashboard/analysis',
              name: 'Analysis',
              component: './Dashboard/Analysis'
            },
            {
              path: '/dashboard/advancedprofile',
              // name: 'Test/Profile',
              component: './Dashboard/AdvancedProfile'
            },

          ],
        },
      ],
    },
  ],
  disableRedirectHoist: true,

  /**
   * webpack
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },

  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};

