import Config from './config';
import Http from './http';
import httpConfig from 'http-rest-config';

export default nx.declare({
  statics: {
    init() {
      httpConfig(this, Http, Config.APIS);
    }
  }
});
