<template>
  <div class="m-footer">
    <mt-tabbar v-model="selected">
      <mt-tab-item :id=item.id v-for="(item,index) in tabList" :key="index" @click.native="jumpTo(item.path)">
        <img slot="icon" :src="selected === item.id?item.src1:item.src">
        {{item.name}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { Tabbar, TabItem } from 'mint-ui';
export default {
  name:'MFooter',
  data(){
    return {
      tabList:[
        {name:'客户列表',id:'tab1',src:'/static/image/kehu.png',src1:'/static/image/kehu2.png',path:'/CustomerList'},
        {name:'库存查询',id:'tab2',src:'/static/image/kucunguanli.png',src1:'/static/image/kucunguanli2.png',path:'/InventoryList'},
        {name:'我的',id:'tab3',src:'/static/image/My.png',src1:'/static/image/My2.png',path:''}
      ],
      selected:'tab2'
    }
  },
  methods:{
    jumpTo(path){
      console.log(this.selected);
      this.$router.push({path: path}); 
    }
  },
  created(){
    
  },
  mounted(){
  }
}
</script>


