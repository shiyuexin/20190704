<template>
  <div class="mine-page">
    <div class="m-header clear-float">
      <div class="title-text">我的</div>
    </div>

    <div class="mine-banner">
      <div class="portrait">
        <img src="/static/image/My.png" alt="">
      </div>
      <div class="name">王小姐</div>
      <div class="desc">行政专员</div>
    </div>

    <div class="content">
      <div class="info-li" @click="jumpTo">
        <span class="icon user"></span>
        <span class="info-text">个人信息</span>
      </div>
      <div class="info-li" @click="jumpTo">
        <span class="icon phone"></span>
        <span class="info-text">修改手机号</span>
      </div>
      <div class="info-li" @click="jumpTo">
        <span class="icon pw"></span>
        <span class="info-text">修改密码</span>
      </div>
    </div>

    <div class="foot-out">
      <div class="commit-btn">退出</div>
    </div>

    <m-footer></m-footer>
  </div>
</template>

<script>
import axs from "../../axios.service.js";
import MFooter from "../../lib/MFooter";
export default {
  name: "Mine",
  components: {MFooter},
  data() {
    return {};
  },
  methods:{
    jumpTo(){

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
@import "../../assets/sass/mixin.scss";
.mine-page {
  .mine-banner{
    height: 310px;
    background: #26a2ff;
    margin-top: 2px;
    padding-top: 50px;
    text-align: center;
    .portrait{
      width: 170px;
      height: 170px;
      border-radius: 170px;
      overflow: hidden;
      margin: 0 auto;
      background: #ffffff;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .name{
      margin-top: 20px;
    }
    .name,.desc{
      font-size: 28px;
      line-height: 44px;
      color: #ffffff;
    }
  }
  .content{
    padding: 0 40px;
    .info-li{
      height: 100px;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #e5e5e5;
      position: relative;
      &:before{
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -20px;
        display: block;
        content: '';
        width: 40px;
        height: 40px;
        background: url('../../../static/image/mine-right.png') no-repeat;
        background-size: 100% 100%;
      }
      .icon{
        display: block;
        width: 50px;
        height: 50px;
        background: url('../../../static/image/mine-user.png') no-repeat;
        background-size: 100% 100%;
        &.phone{
          background: url('../../../static/image/mine-phone.png') no-repeat;
          background-size: 100% 100%;
        }
        &.pw{
          background: url('../../../static/image/mine-pw.png') no-repeat;
          background-size: 100% 100%;
        }
      }
      .info-text{
        display: block;
        height: 50px;
        line-height: 54px;
        margin-left: 6px;
      }
    }
  }
}
</style>
