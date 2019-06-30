<template>
  <div class="add-customer-page">
    <div class="m-header clear-float">
      <div class="title-text">{{type=='add'?'新增客户':'编辑客户'}}</div>
      <div class="icon-box">
        <router-link to='/CustomerList'>{{type=='add'?'保存':'修改'}}</router-link>
      </div>
    </div>
    <div class="add-customer-content">
      <div class="message-box">
        <div class="message-title">客户名称</div>
        <div class="message-conetnt"><input v-model="customerName" placeholder="请输入客户名称"/></div>
      </div>
      <div class="message-box" @click="popupVisible = true">
        <div class="message-title">客户级别</div>
        <div class="message-conetnt">{{customerLevel}}</div>
      </div>
      <div class="message-box">
        <div class="message-title">目标客户</div>
        <div class="message-conetnt"><mt-switch v-model="targetCustomer"></mt-switch></div>
      </div>
      <div class="message-box">
        <div class="message-title">省市区</div>
        <div class="message-conetnt"></div>
      </div>
      <div class="message-box">
        <div class="message-title">详细地址</div>
        <div class="message-conetnt"><input v-model="address" placeholder="请输入详细地址"/></div>
      </div>
      <div class="message-box n-border">
        <div class="message-title">联系人</div>
        <div class="message-conetnt c-blue">新增联系人</div>
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
            <div class="bottom-right"><div>编辑</div> | <div>删除</div></div>            
          </div>
        </div>
      </div>
    </div>
    <mt-popup class="popup-style" v-model="popupVisible" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible=false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="getBabySex">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import axs from "../../axios.service.js";
export default {
  name: "AddCustomer",
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
    };
  },
  methods:{
    // 切换级别
    onValuesChange(picker, values) {
      this.customerLevel = values[0];
    },
    // 获取级别
    getBabySex(){
      this.popupVisible = false;
    }, 
  },
  created(){}
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
</style>
