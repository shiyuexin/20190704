import axs from 'axios'
import common from './assets/js/common'
import api from '../config/api'
import qs from 'qs'
axs.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default {
    common,
    api,
    get(url,data){
      data.timestamp = Date.parse(new Date());
      return axs.get(url,data);
    },
    post(url,data){
      data.timestamp = Date.parse(new Date());
      data = qs.stringify(data);
      return axs.post(url,data);
    },
    put(url,data){
      data.timestamp = Date.parse(new Date());
      return axs.put(url,data);
    },
    del(url,data){
      data.timestamp = Date.parse(new Date());
      return axs.delete(url,data);
    },
    request(url,data,method){
      data.timestamp = Date.parse(new Date());
      method = method || 'get';
      method = method.toLocaleLowerCase();
      switch(method){
        case 'get':
          return this.get(url,{params:data});
          break;
        case 'post':
          return this.post(url,data);
          break;
        case 'put':
          return this.put(url,data);
          break;
        case 'del':
          return this.del(url,data);
          break;
      }
    }
  }