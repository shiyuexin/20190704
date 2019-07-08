<template>
  <div class="add-customer-page">
    <div class="add-customer-content">
      <div class="message-box">
        <div class="message-title">客户名称</div>
        <div class="message-conetnt"><input @blur.prevent="blur()" v-model="customerName" placeholder="请输入客户名称"/></div>
      </div>
      <div class="message-box" @click="popupVisible = true">
        <div class="message-title">客户级别</div>
        <div class="message-conetnt">{{customerLevel}}</div>
      </div>
      <div class="message-box">
        <div class="message-title">目标客户</div>
        <div class="message-conetnt"><mt-switch v-model="targetCustomer"></mt-switch></div>
      </div>
      <div class="message-box" @click="isPicker = true">
        <div class="message-title">省市区</div>
        <div class="message-conetnt">{{initial.first}}{{initial.second}}{{initial.third}}</div>
      </div>
      <div class="message-box">
        <div class="message-title">详细地址</div>
        <div class="message-conetnt"><input @blur.prevent="blur()" v-model="address" placeholder="请输入详细地址"/></div>
      </div>
      <div class="message-box n-border">
        <div class="message-title">联系人</div>
        <div class="message-conetnt c-blue" @click="addPeoplePopupVisible = true">新增联系人</div>
      </div>
      <div class="contacts-list">
        <div class="contacts-card">
          <div class="contacts-top">
            <div class="contacts-left">
              <div>张海-男-销售部-销售经理</div>
              <div>159-213-0045</div>
            </div>
            <div class="call-image"></div>
          </div>
          <div class="contacts-bottom">
            <div class="bottom-left"><mt-switch v-model="defaultContact">设为默认</mt-switch></div>
            <div class="bottom-right"><div @click="addPeoplePopupVisible = true">编辑</div> | <div>删除</div></div>            
          </div>
        </div>
      </div>
    </div>
    <mt-popup class="popup-style" v-model="popupVisible" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="popupVisible = false">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <!-- 新增/编辑联系人 -->
    <mt-popup v-model="addPeoplePopupVisible" position="right" class="add-people-popup-follow" :modal="false">
      <div class="m-header clear-float"><div class="title-text">新增联系人</div></div>
      <div class="content">
        <div class="message-box">
          <div class="message-title">姓名</div>
          <div class="message-conetnt"><input @blur.prevent="blur()" placeholder="请输入联系人姓名"/></div>
        </div>
        <div class="message-box" @click="sexPopupVisible = true">
          <div class="message-title">性别</div>
          <div class="message-conetnt">{{newPeopleSex}}</div>
        </div>
        <div class="message-box">
          <div class="message-title">职位</div>
          <div class="message-conetnt"><input @blur.prevent="blur()" placeholder="请输入联系人职位"/></div>
        </div>
        <div class="message-box">
          <div class="message-title">部门</div>
          <div class="message-conetnt"><input @blur.prevent="blur()" placeholder="请输入联系人部门"/></div>
        </div>
        <div class="message-box">
          <div class="message-title">手机号</div>
          <div class="message-conetnt"><input @blur.prevent="blur()" placeholder="请输入联系人手机号"/></div>
        </div>
      </div>
      <mt-popup class="popup-style" v-model="sexPopupVisible" position="bottom">
        <div class="picker-toolbar">
          <span class="mint-datetime-action mint-datetime-cancel" @click="sexPopupVisible = false">取消</span>
          <span class="mint-datetime-action mint-datetime-confirm" @click="sexPopupVisible = false">确定</span>
        </div>
        <mt-picker :slots="sexSlots" @change="changeSex"></mt-picker>
      </mt-popup>
      <div class="commit-btn" @click="addPeoplePopupVisible= false">保存</div>
    </mt-popup>
    <CascadingPicker 
        v-model="isPicker"
        :data="addressData"
        :initial="initial"
        closeOnClickModal
        @ok="selectAddress"
        @cancel="cancelAddress"
    />
  </div>
</template>

<script>
import axs from "../../axios.service.js";
import Vue from 'vue'
import CascadingPicker from 'cascading-picker'
import 'cascading-picker/dist/CascadingPicker.css'
import addressData from 'cascading-picker/dist/AddressData'
Vue.use(CascadingPicker);
export default {
  name: "EditTel",
  data() {
    return {
      type:this.$route.query.type || 'add',//类型 默认添加
      customerName:'',//客户名称
      customerLevel:'',//客户级别
      popupVisible:false,//级别弹窗
      slots:[{values: ['一级','二级'],defaultIndex:0}], 
      targetCustomer:false,//目标客户
      address:'',//详细地址
      defaultContact:false,//默认联系人
      addPeoplePopupVisible:false,//新增编辑联系人弹窗控制
      sexPopupVisible:false,//性别选择框显示控制
      sexSlots:[{values: ['男','女'],defaultIndex:0}], 
      newPeopleSex:'男',
      isPicker: false,
      addressData: addressData,
      initial: {
          first: '北京市',
          second: '东城区',
          third: ''
      }
    };
  },
  methods:{
    blur:function(){scrollTo(0, pageYOffset)},
    // 切换级别
    onValuesChange(picker, values) {
      this.customerLevel = values[0];
    },
    // 切换性别
    changeSex(picker, values){
      this.newPeopleSex = values[0];
    },
    // 选择地址
    selectAddress(res) {
      this.addressProvice = res.first+','+res.second+','+res.third;
      this.initial.first = res.first;
      this.initial.second = res.second;
      this.initial.third = res.third;
    },
    // 取消选择地址
    cancelAddress() {   
      console.log('你取消了地址选择器')
    }
  },
  created(){

  }
};
</script>

<style lang="scss" scoped>
.add-customer-page{
  font-size: 28px;
  .message-box{
    width: 92%;
    margin:0 auto;
    height: 90px;
    line-height: 90px;
    border-bottom:1px solid #e5e5e5;
    .message-title{display: inline-block}
    .message-conetnt{
      float: right;width: 50%;text-align: right;
      input{text-align: right;font-size: 28px;}
    }
    .mint-switch{float: right;margin-top: 22.5px;}
  }
  .n-border{border-bottom:none;}
  .contacts-list{
    width: 92%;
    margin: 0 auto;
    .contacts-card{
      border: 2px solid #e5e5e5;
      border-radius: 20px;
      margin-bottom: 25px;
      .contacts-top{
        line-height: 80px;
        font-size: 26px;
        border-bottom: 1px solid #e5e5e5;
        .contacts-left{width: 60%;margin: 0 5%;display: inline-block;}
        .call-image{
          float: right;
          background: url('../../../static/image/dianhua.png')no-repeat;
          background-size: 100% 100%;
          width: 64px;
          height: 64px;
          margin: 48px;
        }
      }
      .contacts-bottom{
        height: 80px;
        line-height: 80px;
        .bottom-left{
          width: 60%;
          margin:0 5%;
          display: inline-block;
        }
        .bottom-right{float: right;margin-right:5%; div{display: inline-block}}
      }
    }
  }
  .popup-style{width: 100%;}
  .popup-style .sex-btn-box{text-align: right;padding: 3px 10px;}
}
.add-people-popup-follow{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .content{
    font-size: 30px;
    .message-box{
      width: 92%;
      margin:0 auto;
      height: 90px;
      line-height: 90px;
      border-bottom:1px solid #e5e5e5;
      .message-title{display: inline-block}
      .message-conetnt{
        float: right;width: 50%;text-align: right;
        input{text-align: right;font-size: 28px;}
      }
    }
  }
}


</style>
