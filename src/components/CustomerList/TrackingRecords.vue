<template>
  <div class="tracking-records-page">
    <div class="m-header clear-float"><div class="title-text">跟踪详情</div></div>
    <div class="tracking-records-content">
      <div class="title-box">
        <div class="title dis-i-b">北京家捷物流有限公司</div>
        <div class="btn-detail c-blue" @click="jumpToDetail">查看详情</div>
      </div>
      <div class="tracking-list">
        <div class="tracking-card" v-for="(item,index) in list" :key="index" :class="{'danger':item.customerLevel=='紧急'}">
          <div class="card-top">
            <div class="charge-person float-l">
              <div class="danger-tip" v-if="item.customerLevel=='紧急'">紧急</div>
              {{item.name}}
            </div>
            <div class="time float-r">{{item.time}}</div>
          </div>
          <div class="more-person" v-if="item.connectPeopleName.length>0">
            @
            <div class="person-tip" v-for="(people,index1) in item.connectPeopleName" :key="index1">{{people}}</div>
          </div>
          <div class="car-message">{{item.descriptiveInformation}}</div>
        </div>
      </div>
    </div>
    <div class="bottom-btn clear-float">
      <div class="btn-primary float-r" @click="openRecord()">录入跟进</div>
      <div class="btn-primary float-r" @click="openAssign()">指派任务</div>
    </div>
    <!-- 录入跟进 弹出层 -->
    <mt-popup v-model="followPopupVisible" position="right" class="mint-popup-follow" :modal="false">
      <div class="m-header clear-float"><div class="title-text">录入跟进</div></div>
      <div class="commit-btn" @click="followPopupVisible= false">提交跟进</div>
      <div class="follow-text"><textarea placeholder="请输入客户跟进内容" v-model="record.descriptiveInformation"></textarea></div>
      <div class="commit-btn" @click="commitRecord()">提交跟进</div>
    </mt-popup>
    <!-- 回复 弹出层 -->
    <mt-popup v-model="reviewPopupVisible" position="right" class="mint-popup-review" :modal="false">
      <div class="m-header clear-float"><div class="title-text">跟踪记录</div></div>
      <div class="tracking-list">
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
        </div>
      </div>
      <div class="follow-text"><textarea placeholder="请输入回复内容"></textarea></div>
      <div class="commit-btn" @click="reviewPopupVisible= false">提交回复</div>
    </mt-popup>
    <!-- 指派任务 弹出层 -->
    <mt-popup v-model="fappointedPopupVisible" position="right" class="mint-popup-fappointed" :modal="false">
      <div class="m-header clear-float"><div class="title-text">跟踪记录</div></div>
      <div class="content">
        <div class="message-box">
          <div class="message-title">任务名称</div>
          <div class="message-conetnt"><input @blur.prevent="blur()" placeholder="请输入任务名称" v-model="assign.taskName"/></div>
        </div>
        <div class="message-box" @click="connectPeople = !connectPeople">
          <div class="message-title">关联人员</div>
          <div class="message-conetnt">
            <span v-for="(item,index) in connectPeopleName" :key="index">{{item}}</span>
          </div>
        </div>
        <div v-show="connectPeople" class="connect-people-list">
          <mt-checklist
          align="right"
            v-model="connectPeopleName"
            :options="connectPeopleArr">
          </mt-checklist>
        </div>
        <div class="message-box" @click="popupVisible = true">
          <div class="message-title">客户级别</div>
          <div class="message-conetnt">{{customerLevel}}</div>
        </div>
        <div class="message-box">
          <div class="message-title">说明信息</div>
          <div class="message-conetnt"><input @blur.prevent="blur()" placeholder="请输入说明信息" v-model="assign.descriptiveInformation"/></div>
        </div>
      </div>
      <div class="commit-btn" @click="commitAssign()">提交</div>
    </mt-popup>
    <mt-popup class="popup-style" v-model="popupVisible" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="popupVisible = false">确定</span>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
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
      followPopupVisible:false,//跟进详情页面显示控制
      reviewPopupVisible:false,//回复详情页面显示控制
      fappointedPopupVisible:false,//指派任务页面显示控制
      popupVisible:false,//客户级别弹窗
      slots:[{values: ['紧急','一般'],defaultIndex:0}],
      customerLevel:'紧急',//客户级别
      connectPeople:false,//关联人员是否显示
      connectPeopleArr:['张三', '李四', '王五'],
      connectPeopleName:[],//关联人员name
      assign:{
        name:'张海鹏-华东区-上海分公司',
        taskName:'', //指派任务名称
        connectPeopleName:[],//指派关联人员
        customerLevel:'',//客户级别
        descriptiveInformation:'',//指派任务说明信息
        time:''
      },
      record:{
        name:'张海鹏-华东区-上海分公司',
        taskName:'', //指派任务名称
        connectPeopleName:[],//指派关联人员
        customerLevel:'',//客户级别
        descriptiveInformation:'',//指派任务说明信息
        time:''
      },
      list:[
        {
        name:'张海鹏-华东区-上海分公司',
        time:'2018-06-22 10:55:36',
        customerLevel:'紧急',
        connectPeopleName:['张三', '李四'],
        descriptiveInformation:'对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。'
      },{
        name:'张海鹏-华东区-上海分公司',
        time:'2018-06-22 10:55:36',
        customerLevel:'',
        connectPeopleName:[],
        descriptiveInformation:'对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。对方总经理见面，午饭，下半年会有计划采购40尺柜，需要紧密跟进。下个月继续拜访。'
      }]
    };
  },
  methods:{
    // 日期格式化
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var h = date.getHours();
      var f = date.getMinutes();
      var s = date.getSeconds();
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d +' '+ h+':'+ f+':'+s;
    },
    blur:function(){scrollTo(0, pageYOffset)},
    // 跳转查看详情
    jumpToDetail(){
      this.$router.push({ path: '/AddCustomer',query:{type:'edit'}});
    },
    // 切换级别
    onValuesChange(picker, values) {
      this.customerLevel = values[0];
      this.assign.customerLevel = values[0];
    },
    // 打开跟踪记录
    openAssign(){
      this.fappointedPopupVisible = true;
      this.assign.taskName = '';
      this.assign.connectPeopleName = this.connectPeopleName = ['张三'];
//      this.assign.customerLevel = this.customerLevel = '紧急';
      this.assign.descriptiveInformation = '';
    },
    //提交跟踪记录
    commitAssign(){
      this.fappointedPopupVisible = false;
      this.assign.connectPeopleName = this.connectPeopleName;
      this.assign.time = this.formatDate(new Date());
      let assign = JSON.parse(JSON.stringify(this.assign));
      this.list.push(assign);
    },
    //打开录入跟进
    openRecord(){
      this.followPopupVisible = true;
      this.record.descriptiveInformation = '';
      this.record.time = '';
    },
    // 提交录入跟进
    commitRecord(){
      this.followPopupVisible = false;
      this.record.time = this.formatDate(new Date());
      let record = JSON.parse(JSON.stringify(this.record));
      this.list.push(record);
    }
  },
  created(){}
};
</script>

<style lang="scss" scoped>
.tracking-records-page{
  .tracking-records-content{
    width: 100%;
    box-sizing: border-box;
    padding: 0 3% 120px 3%; 
    overflow-y:scroll;
    .title-box{
      width: 100%;
      height: 100px;
      line-height: 100px;
      font-size: 34px;
      color: #222;
      .btn-detail{font-size: 24px;float: right;}
    }
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
        .person-tip{display: inline-block;color: #222;background: #f2f2f2;height: 40px;line-height: 40px;border-radius: 5px;margin-left: 8px;width: 80px;text-align: center;border:2px solid #999;}
      }
      .charge-person{
        .danger-tip{display: none;color: #fff;background: red;height: 50px;line-height: 50px;border-radius: 5px;margin-right: 8px;width: 70px;text-align: center;}
      }
      .car-message{
        width: 94%;
        padding: 15px 3%;
        border: 2px solid #e5e5e5;
        border-radius: 10px;
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
  .bottom-btn{
    position: fixed;
    background: #fff;
    border-top: 2px solid #e5e5e5;
    width: 94%;
    bottom: 0;
    height: 80px;
    padding-top: 20px;
    margin: 0 3%;
  }
  // 跟进弹出层样式
  .mint-popup-follow,.mint-popup-review,.mint-popup-fappointed{
    width: 100%;
    height: 100%;
    background-color: #fff;
    .follow-text{
      width: 94%;
      height: 300px;
      margin: 20px 3%;
      textarea{border: 1px solid #e5e5e5;width: 100%;height: 100%;font-size: 28px;line-height: 40px;color: #222;}
    }
    .tracking-list{width: 94%; margin: 0 3%;}
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
      .connect-people-list{
        width: 92%;
        margin:0 auto;
        font-size: 50px;
      }
    }
  }
  .popup-style{width: 100%;}

}
</style>
