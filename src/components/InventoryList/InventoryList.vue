<template>
  <div class="customer-list-page">
    <div class="m-header clear-float">
      <div class="title-text">库存列表</div>
      <div class="icon-box">
        <div class="icon search-icon" @click="searchShow=!searchShow"></div>
      </div>
    </div>
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
                  <div class="company-name">{{card.name}}</div>
                  <div class="icon icon-lock" v-if="card.isLock"></div>
                </div>
              </div>
              <div class="card-content">
                <div class="detail" v-for="(item,index) in card.detail" :key="index">{{item}}</div>
              </div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <m-footer></m-footer>
    <!-- 搜索 弹出层 -->
    <mt-popup v-model="searchShow" position="right" class="mint-popup-search" :modal="false">
      <div class="m-header clear-float"><div class="title-text">资产查询</div></div>
      <div class="search-list">
        <div class="message-box" @click="chooseItem(1)">
          <div class="message-title">资产类型</div>
          <div class="message-conetnt">{{assetsType}}</div>
        </div>
        <div class="message-box" @click="chooseItem(2)">
          <div class="message-title">产品型号</div>
          <div class="message-conetnt">{{productNum}}</div>
        </div>
        <div class="message-box" @click="chooseItem(3)">
          <div class="message-title">轮胎</div>
          <div class="message-conetnt">{{tyre}}</div>
        </div>
        <div class="message-box" @click="chooseItem(4)">
          <div class="message-title">车轴</div>
          <div class="message-conetnt">{{axle}}</div>
        </div>
        <div class="message-box" @click="chooseItem(5)">
          <div class="message-title">支腿</div>
          <div class="message-conetnt">{{outrigger}}</div>
        </div>
        <div class="message-box" @click="chooseItem(6)">
          <div class="message-title">纵梁形式</div>
          <div class="message-conetnt">{{longitudinalBeam}}</div>
        </div>
        <div class="message-box" @click="chooseItem(7)">
          <div class="message-title">大区</div>
          <div class="message-conetnt">{{largeArea}}</div>
        </div>
        <div class="message-box" @click="chooseItem(8)">
          <div class="message-title">仓库</div>
          <div class="message-conetnt">{{warehouse}}</div>
        </div>
      </div>
      <div class="commit-btn" @click="searchShow= false">查询</div>
    </mt-popup>
    <mt-popup class="popup-style" v-model="popupVisible" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible=false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="popupVisible=false">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
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
        // status 1-半挂车 2-集装箱 3-仓栅车     
        // isLock 1锁定 2未锁定
        {name:'全部',id:'0',list:[
          {name:'铝合金集装箱运输半挂车',isLock:'1',status:'1',statusText:'半挂车',detail:["产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH"]},
          {name:'铝合金集装箱',isLock:'2',status:'3',statusText:'仓栅车',detail:["车轴：BPW 10吨","产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH"]},
        ]},
        {name:'半挂车',id:'1',list:[
          {name:'铝合金集装箱运输半挂车',isLock:'1',status:'1',statusText:'半挂车',detail:["产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH"]},
        ]},
        {name:'集装箱',id:'2',list:[]},
        {name:'仓栅车',id:'3',list:[
          {name:'铝合金集装箱',status:'3',isLock:'2',statusText:'仓栅车',detail:["车轴：BPW 10吨","产品型号：MBS9403TJZLH","产品型号：MBS9403TJZLH"]},
        ]}
      ],
      currentNum:-1,//区分类型
      popupVisible:false,
      slots:[{values: [],defaultIndex:0}],

      assetsType:'全部',//资产类型
      slots1:[{values: ['全部','半挂车','集装箱','仓栅车','其他'],defaultIndex:0}],

      productNum:'全部型号',//产品型号
      slots2:[{values: ['全部型号','1231','12'],defaultIndex:0}], 

      tyre:'1',//轮胎
      slots3:[{values: ['1','2','3'],defaultIndex:0}], 

      axle:'全部',//车轴
      slots4:[{values: ['全部'],defaultIndex:0}],

      outrigger:'全部',//支腿
      slots5:[{values: ['全部'],defaultIndex:0}],

      longitudinalBeam:'全部',//纵梁形式
      slots6:[{values: ['全部'],defaultIndex:0}],

      largeArea:'上海区',//大区
      slots7:[{values: ['上海区','北京区'],defaultIndex:0}],

      warehouse:'全部',//仓库
      slots8:[{values: ['全部','上海','北京'],defaultIndex:0}],
    };
  },
  methods:{
    //跳转详情页
    jumpToEdit(){
      this.$router.push({ path: '/AssetsDetail',query:{type:'edit'}}); 
    },
    //选择类型方法
    chooseItem(type){
      this.popupVisible = true;
      this.currentNum = type;
      this.slots = JSON.parse(JSON.stringify(this['slots'+type]));
    },
    // 选项切换
    onValuesChange(picker, values) {
      if(this.currentNum<0){return}
      let cSolts = this['slots'+this.currentNum];
      cSolts[0].defaultIndex = cSolts[0].values.findIndex((item)=>{
        return item == values[0];
      });
      switch (this.currentNum){
        case 1:
          this.assetsType = values[0];
          break;
        case 2:
          this.productNum = values[0];
          break;
        case 3:
          this.tyre = values[0];
          break;
        case 4:
          this.axle = values[0];
          break;
        case 5:
          this.outrigger = values[0];
          break;
        case 6:
          this.longitudinalBeam = values[0];
          break;
        case 7:
          this.largeArea = values[0];
          break;
        case 8:
          this.warehouse = values[0];
          break;
      }
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
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-left: 8px solid orange;
      border-top: 2px solid #e5e5e5;
      border-right: 2px solid #e5e5e5;
      border-bottom: 2px solid #e5e5e5;
      .card-title{
        width: 100%;
        background: #f2f2f2;
        .card-box{
          width: 96%;
          margin: 0 auto;
          height: 96px;
          line-height: 96px;
          .company-name{display: inline-block;}
          .icon-lock{
            float: right;
            height: 46px;
            width: 46px;
            margin-top: 25px;
            background: url('../../../static/image/buoumaotubiao32.png')no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .card-content{
        width: 96%;
        margin: 0 auto;
        line-height: 58px;
        .detail{color: #999;}
      }
    }
  }
}
.popup-style{
  width: 100%;
}
.mint-popup-search{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .message-box{
    width: 92%;
    margin:0 auto;
    height: 90px;
    line-height: 90px;
    border-bottom:1px solid #e5e5e5;
    .message-title{display: inline-block}
    .message-conetnt{
      float: right;width: 50%;text-align: right;
    }
  }
}
</style>
