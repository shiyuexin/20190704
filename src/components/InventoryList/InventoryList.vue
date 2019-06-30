<template>
  <div class="customer-list-page">
    <m-footer></m-footer>
  </div>
</template>

<script>
import axs from "../../axios.service";
import MFooter from "../../lib/MFooter";
import { Indicator, Navbar, TabItem } from "mint-ui";
export default {
  components: {MFooter},
  name: "InventoryList",
  data() {
    return {
      
    };
  },
  methods:{},
  created(){}
};
</script>

<style lang="scss" scoped>

</style>
