<template>
  <div>
    <publish-list-card v-for="(item, index) in data"
                       :key="index"
                       v-bind="$attrs"
                       :title="item.title"
                       :id="item.id"
                       :company="item.company"
                       :time="item.postTime"
                       @click.native="$emit('onCardClick', item.id)"
    ></publish-list-card>
    <my-pager style="text-align: center" @current-change="onPageChange" :total="total"></my-pager>
  </div>
</template>

<script>
import PublishListCard from "@views/logistics/components/PublishListCard";
import MyPager from "@components/mine/MyPager/MyPager";
import request from "@utils/request";

export default {
  components: {
    PublishListCard,
    MyPager
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      data: [],
      pageNum: 1,
      total: 0
    }
  },
  created() {
    this.getList();
  },
  methods: {
    onPageChange(pageNum){
      this.pageNum = pageNum
      this.getList()
    },
    async getList() {
      const result = await request({
        url: this.url,
        method: 'get',
        params: {pageNum: this.pageNum, pageSize: 10}
      });
      if(result.code === 200){
        this.data = result.rows;
        this.total = result.total
      }else{
        this.$message.error(result.msg);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .publish-card{
    margin-bottom: 20px;
  }
</style>
