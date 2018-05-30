import nx from 'next-js-core2';
import NxAxios from 'next-axios';

const Http = nx.declare({
  extends: NxAxios,
  methods: {
    setRequestInterceptor: function () {
      this.axios.interceptors.request.use((config) => {
        config.data = nx.param(config.data);
        return config;
      });
    },
    contentType: function () {
      return nx.contentType('urlencoded');
    },
    toData: function (inResponse) {
      return inResponse.data.data;
    },
    error: function (inError) {
      const {data} = inError.response;
      // AppBase.$.error = data;
      // AppBase.notify(data.errorMessage, 'error');
    }
  }
});

export default Http.getInstance();