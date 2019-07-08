<template>
  <div class="add-customer-page">
    <div class="m-header clear-float">
      <div class="title-text">个人信息</div>
    </div>
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
    <div class="commit-btn" @click="saveMessage">保存</div>
  </div>
</template>

<script>
import axs from "../../axios.service.js";
import Vue from 'vue'
export default {
  name: "AddUser",
  data() {
    return {
      sexPopupVisible:false,//性别选择框显示控制
      sexSlots:[{values: ['男','女'],defaultIndex:0}],
      newPeopleSex:'男',
      isPicker: false
    };
  },
  methods:{
    blur:function(){scrollTo(0, pageYOffset)},
    // 切换性别
    changeSex(picker, values){
      this.newPeopleSex = values[0];
    },
    //保存
    saveMessage(){
      this.$router.push({ path: '/Mine'});
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
