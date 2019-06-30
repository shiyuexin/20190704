<template>
  <div class="tracking-records-page">
    <div class="m-header clear-float"><div class="title-text">跟踪详情</div></div>
    <div class="tracking-records-content">
      <div class="title-box">
        <div class="title dis-i-b">北京家捷物流有限公司</div>
        <div class="btn-detail c-blue" @click="jumpToDetail">查看详情</div>
      </div>
      <div class="tracking-list">
        <div class="tracking-card">
          <div class="card-top">
            <div class="charge-person float-l">张海鹏-华东区-上海分公司</div>
            <div class="time float-r">2018-06-22 10:55:36</div>
          </div>
          <div class="car-message">
            对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。
            对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。
          </div>
        </div>
        <div class="tracking-card danger">
          <div class="card-top">
            <div class="charge-person float-l"><div class="danger-tip">紧急</div>张海鹏-华东区-上海分公司</div>
            <div class="time float-r">2018-06-22 10:55:36</div>
          </div>
          <div class="more-person">@<div class="person-tip">张三</div><div class="person-tip">李四</div></div>
          <div class="car-message">
            对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。
            对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。
          </div>
          <div class="review-btn c-blue">回复</div>
        </div>
      </div>
    </div>
    <div class="bottom-btn clear-float">
      <div class="btn-primary float-r" @click="followDetail">录入跟进</div>
      <div class="btn-primary float-r">指派任务</div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="right"
      popup-transition="popup-fade">
      <div class="popup-page">123</div>
    </mt-popup>
  </div>
</template>

<script>
import axs from "../../axios.service.js";
import { MessageBox } from "mint-ui";
export default {
  name: "TrackingRecords",
  data() {
    return {
      popupVisible:false
    };
  },
  methods:{
    // 跳转查看详情
    jumpToDetail(){
      this.$router.push({ path: '/AddCustomer',query:{type:'edit'}}); 
    },
    followDetail(){
      this.popupVisible = true;
    }
  },
  created(){}
};
</script>

<style lang="scss" scoped>
.tracking-records-page{
  .tracking-records-content{
    width: 94%;
    margin:0 auto;
    .title-box{
      width: 100%;
      height: 100px;
      line-height: 100px;
      font-size: 34px;
      color: #222;
      .btn-detail{font-size: 24px;float: right;}
    }
    .tracking-list{
      width: 100%;
      .tracking-card{
        border-top: 2px dashed #e5e5e5;
        padding-top:10px;
        margin-bottom: 30px;
        .card-top{
          width: 100%;
          line-height: 60px;
          height: 60px;font-size: 26px;color: #999;
          .time{font-size: 24px;}
        } 
        .more-person{
          margin: 15px;
          .person-tip{display: none;color: #222;background: #f2f2f2;height: 40px;line-height: 40px;border-radius: 5px;margin-left: 8px;width: 80px;text-align: center;border:2px solid #999;}
        }
        .charge-person{
          .danger-tip{display: none;color: #fff;background: red;height: 50px;line-height: 50px;border-radius: 5px;margin-right: 8px;width: 70px;text-align: center;}
        }
        .car-message{
          width: 94%;
          padding: 15px 3%;
          border: 2px solid #e5e5e5;
          background: #f2f2f2;
          color: #222;
        }
        .review-btn{float: right;height: 50px;line-height: 50px;}
      }
      .danger{
        .charge-person{
          .danger-tip{display: inline-block;}
        }
        .more-person{
          .person-tip{display: inline-block;}
        }
        .car-message{
          background: #ffe4e2;
        }
      }
    }
  }
  .bottom-btn{
    position: fixed;
    border-top: 2px solid #e5e5e5;
    width: 94%;
    bottom: 0;
    height: 80px;
    padding-top: 20px;
    margin: 0 3%;
  }
  .popup-page{
    height: 100%;
    width: 100%;
    background: #fff;
  }
}
</style>
