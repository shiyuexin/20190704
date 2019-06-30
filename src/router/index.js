import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Mine from '@/components/Mine/Mine'
import CustomerList from '@/components/CustomerList/CustomerList' //客户列表
import AddCustomer from '@/components/CustomerList/AddCustomer' //添加&编辑客户
import TrackingRecords from '@/components/CustomerList/TrackingRecords' //跟踪详情



import InventoryList from '@/components/InventoryList/InventoryList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/CustomerList',
      name: 'CustomerList',
      component: CustomerList
    },
    {
      path: '/AddCustomer',
      name: 'AddCustomer',
      component: AddCustomer
    },
    {
      path: '/TrackingRecords',
      name: 'TrackingRecords',
      component: TrackingRecords
    },
    {
      path: '/InventoryList',
      name: 'InventoryList',
      component: InventoryList
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine
    }
  ]
})
