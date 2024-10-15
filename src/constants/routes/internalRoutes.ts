export enum InternalRoute {
  'MAIN_TAB' = 'MAIN_TAB',
  'API_TAB' = 'API_TAB',
  'TEST_TAB' = 'TEST_TAB',
}

export enum MainTabRoute {
  'API_TAB' = 'API_TAB',
  'TEST_TAB' = 'TEST_TAB',
}

export const MainTabMap = {
  [MainTabRoute.API_TAB]: {
    key: MainTabRoute.API_TAB,
    name: '接口管理',
  },
  [MainTabRoute.TEST_TAB]: {
    key: MainTabRoute.TEST_TAB,
    name: '自动化测试',
  },
};
