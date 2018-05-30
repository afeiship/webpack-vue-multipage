export default class {

  static VERSION = '__BUILD_VERSION__';
  static STORE_PREFIX = 'vue-multipage';
  static IMG_URL = 'http://testimg.demo.cn';
  static MONKEY_BUSY_MSG = '程序猿开紧张开发中...';
  static DATE_FORMAT = {
    datetime: 'YYYY-MM-DD HH:mm:ss',
    date: 'YYYY-MM-DD'
  };

  static APIS = {
    baseUrl: '',
    items: {
      '/admin': {
        'login': ['post', '/adminUser/login']
      }
    }
  };

}



