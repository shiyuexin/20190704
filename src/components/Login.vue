<template>
  <div class="login-page">
    <div class="login-content">
      <div class="login-title">鸿懋销售管理系统</div>
      <div class="input-box">
        <div class="input-item user-message"><input @blur.prevent="blur()" v-model="userName" placeholder="请输入用户名"/></div>
        <div class="input-item user-password"><input @blur.prevent="blur()" v-model="password" placeholder="请输入密码"/></div>
      </div>
      <div class="choose-box clear-float">
        <div class="choose-item"><mt-switch v-model="rememberPassword">记住密码</mt-switch></div>
        <div class="choose-item"><mt-switch v-model="automaticLogon">自动登录</mt-switch></div>
      </div>
      <div class="login-btn" @click="jumpTo">登 录</div>
      <div class="forget-password" @click="registerPopupVisible = true">忘记密码</div>
    </div>
    <!-- 忘记密码 弹出层 -->
    <mt-popup v-model="registerPopupVisible" position="right" class="mint-popup-register" :modal="false">
      <div class="m-header clear-float"><div class="title-text">忘记密码</div></div>
      <div class="tel-num">客服电话 135 **** ****</div>
      <div class="commit-btn" @click="registerPopupVisible = false">确定</div>
    </mt-popup>
  </div>
</template>

<script>
import axs from "../axios.service.js";
import { Switch } from "mint-ui";
export default {
  name: "Home",
  data() {
    return {
      userName:'',//用户名
      password:'',//密码
      rememberPassword:false, // 记住密码
      automaticLogon:true,  // 自动登录
      registerPopupVisible:false,//注册弹出
    };
  },
  methods:{
    blur:function(){scrollTo(0, pageYOffset)},
    jumpTo(){
      localStorage.setItem('tab', '');
      this.$router.push({ path: '/CustomerList'}); 
    },
    requestDemo(){
      axs.request(axs.common.getLesson2.url, {
            'birthday':'2019-1-1'
        },axs.common.getLesson2.method).then((data) => {
            if(data.data.status+'' == '200'){       
            }else{
            }
        }).catch(() => {
      });
    }
  },
  created(){
    this.requestDemo();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/mixin.scss";
.login-page { //注释
  position: relative;
  height: 100%; 
  width: 100%;
  .login-content{ 
    position: relative;
    width: 90%;
    height: 100%;
    margin:0 auto;
    .login-title{ //登录页title
      padding-top: 80px;
      text-align: center;
      font-size: 48px;
      color: #222;
      width: 100%;
    }
    .input-box{
      margin-top: 90px;
      width: 100%;
      font-size: 28px;
      line-height: 90px;
      input{font-size: 28px;height: 90px;line-height: 90px;width: 100%;}
      .input-item{
        width: 100%;
        border-bottom:1px solid #e5e5e5;
        height: 90px;
        line-height: 90px;
      }
    }
    .choose-box{
      margin-top: 30px;
      color: #999;
      font-size: 20px;
      .choose-item{
        float: right;
        margin-left: 24px;
      }
    }
    .login-btn{
      width: 100%;
      color: #fff;
      text-align: center;
      height: 90px;
      line-height: 90px;
      font-size: 30px;
      margin-top: 69px;
      background: #26a2ff;
      border-radius: 12px;
    }
    .forget-password{ 
      position: absolute;
      width: 100%;
      bottom: 60px;
      font-size: 28px;
      color: #999;
      text-align: center;
    }
  }
}
.mint-popup-register{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .tel-num{font-size: 32px;color: #222;width: 100%;text-align: center;margin-top: 400px;}
}
</style>
