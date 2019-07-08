<template>
  <div class="assets-detail-page">
    <div class="m-header clear-float">
      <div class="title-text">资产详情</div>
      <div class="icon-box" @click="lockFun">{{isLock?'取消锁定':'锁定'}}</div>
    </div>
    <div class="assets-detail-content">
      <div class="message-box">
        <div class="message-title">VIN码</div>
        <div class="message-conetnt">LG5D5SDS225411111</div>
      </div>
      <div class="message-box">
        <div class="message-title">产品名称</div>
        <div class="message-conetnt">铝合金集装箱运输半挂车（45英尺单轮）</div>
      </div>
      <div class="message-box">
        <div class="message-title">产品型号</div>
        <div class="message-conetnt">MBS9403TJLH</div>
      </div>
      <div class="message-box">
        <div class="message-title">数量</div>
        <div class="message-conetnt">12312312</div>
      </div>
      <div class="message-box">
        <div class="message-title">外形尺寸</div>
        <div class="message-conetnt">13950*2480*1665</div>
      </div>
      <div class="message-box">
        <div class="message-title">VIN码</div>
        <div class="message-conetnt">LG5D5SDS225411111</div>
      </div>
      <div class="message-box">
        <div class="message-title">产品名称</div>
        <div class="message-conetnt">铝合金集装箱运输半挂车（45英尺单轮）</div>
      </div>
      <div class="message-box">
        <div class="message-title">产品型号</div>
        <div class="message-conetnt">MBS9403TJLH</div>
      </div>
      <div class="message-box">
        <div class="message-title">数量</div>
        <div class="message-conetnt">12312312</div>
      </div>
      <div class="message-box">
        <div class="message-title">外形尺寸</div>
        <div class="message-conetnt">13950*2480*1665</div>
      </div>
    </div>
  </div>
</template>

<script>
import axs from "../../axios.service.js";
import { Toast } from "mint-ui";
export default {
  name: "AssetsDetail",
  data() {
    return {
      isLock:this.$route.query.isLock+'' == '1' ? true : false,//锁定标示
    };
  },
  methods:{
    lockFun(){
      if(this.isLock){
        Toast('取消锁定');
      }else{
        Toast('锁定成功');
      }
      this.isLock = !this.isLock;

    }
  },
  created(){

  }
};
</script>

<style lang="scss" scoped>
.assets-detail-page{
  font-size: 28px;
  .message-box{
    width: 92%;
    margin:0 auto;
    height: 90px;
    line-height: 90px;
    border-bottom:1px solid #e5e5e5;
    .message-title{display: inline-block}
    .message-conetnt{
      float: right;width: 70%;text-align: right;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    }
  }
}
</style>
