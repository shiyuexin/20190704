<template>
  <div class="customer-list-page">
    <div class="m-header clear-float">
      <div class="title-text">客户列表</div>
      <div class="icon-box">
        <router-link :to="{path:'/AddCustomer',query:{type:'add'}}"><div class="icon add-icon"></div></router-link>
        <div class="icon search-icon" @click="searchShow=!searchShow"></div>
      </div>
    </div>
    <div class="search-box" v-if="searchShow" ><input @blur.prevent="blur()" v-model="searchText" placeholder="请输入搜索关键字"/></div>
    <!-- 列表内容 -->
    <div class="customer-list-content"> 
      <!-- 列表tab -->
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="(item,index) in dataArr" :key="index" :id=item.id>{{item.name}}</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item,index) in dataArr" :key="index" :id=item.id>
          <!-- 无数据 -->
          <div class="no-data" v-if="item.list.length<1"></div>
          <!-- 数据列表 -->
          <div class="data-list" v-else>
            <!-- 单个card -->
            <div class="item-card" v-for="(card,index1) in item.list" :key="index1" :class="{'b-l-orange':card.status=='1','b-l-blue':card.status=='2','b-l-green':card.status=='3',}">
              <!-- card title -->
              <div class="card-title" @click="jumpToEdit">
                <div class="card-box">
                  <div class="company-name">{{card.companyName}}</div>
                  <div class="card-status" :class="{'c-orange':card.status=='1','c-blue':card.status=='2','c-green':card.status=='3',}">{{card.statusText}}</div>
                </div>
              </div>
              <div class="card-content">
                <div class="detail">{{card.detail}}</div>
                <div class="btn" @click="jumpToFollowDetail">跟进详情</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <m-footer></m-footer>
  </div>
</template>

<script>
import axs from "../../axios.service.js";
import MFooter from "../../lib/MFooter";
import { Indicator, Navbar, TabItem } from "mint-ui";
export default {
  components: {MFooter},
  name: "CustomerList",
  data() {
    return {
      selected:'0',
      searchText:'',//搜索条件
      searchShow:false,//搜索是否显示
      dataArr:[
        // status 1-待开发 2-开发中 3-已完成
        {name:'全部',id:'0',list:[
          {companyName:'北京捷达物流有限公司',status:'1',statusText:'待开发',detail:"战略客户-目标-公海"},
          {companyName:'北京捷达物流有限公司',status:'2',statusText:'开发中',detail:"战略客户-目标-公海"},
          {companyName:'北京捷达物流有限公司',status:'3',statusText:'已完成',detail:"战略客户-目标-公海"}
        ]},
        {name:'待开发',id:'1',list:[
          {companyName:'北京捷达物流有限公司',status:'1',statusText:'待开发',detail:"战略客户-目标-公海"},
        ]},
        {name:'开发中',id:'2',list:[
          {companyName:'北京捷达物流有限公司',status:'2',statusText:'开发中',detail:"战略客户-目标-公海"},
        ]},
        {name:'已完成',id:'3',list:[
          {companyName:'北京捷达物流有限公司',status:'3',statusText:'已完成',detail:"战略客户-目标-公海"}
        ]}
      ]
    };
  },
  methods:{
    blur:function(){scrollTo(0, pageYOffset)},
    //跳转编辑页面
    jumpToEdit(){
      this.$router.push({ path: '/AddCustomer',query:{type:'edit'}}); 
    },
    //跳转跟踪详情
    jumpToFollowDetail(){
      this.$router.push({ path: '/TrackingRecords'}); 
    }
  },
  created(){}
};
</script>

<style lang="scss" scoped>
.customer-list-content{
  .no-data{
    height: 400px;
    width: 400px;
    position: relative;
    top: 60px;
    left: 50%;
    margin-left: -200px;
    background: url('../../../static/image/wushuju.png')no-repeat;
    background-size: 100% 100%;
  }
  .data-list{
    width: 92%;
    margin:0 auto;
    .item-card{
      width: 100%;
      margin-top: 20px;
      border-left: 8px solid orange;
      border-top: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      .card-title{
        width: 100%;
        background: #f2f2f2;
        .card-box{
          width: 96%;
          margin: 0 auto;
          height: 96px;
          line-height: 96px;
          .company-name{display: inline-block;}
          .card-status{float: right;}
        }
      }
      .card-content{
        width: 96%;
        margin: 0 auto;
        height: 96px;
        line-height: 96px;
        .detail{display: inline-block;color: #999;}
        .btn{
          float: right;
          height: 60px;
          line-height: 60px;
          margin: 18px 0;
          padding: 0 10px;
          border:1px solid #e5e5e5;
          border-radius:4px !important;
        }
      }
    }
  }
}
</style>
