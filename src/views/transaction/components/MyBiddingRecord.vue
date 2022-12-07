<template>
  <div class="data-table">
    <el-table
      :data="data"
      empty-text="暂无竞价记录"
      style="width: 100%">
      <el-table-column
        label="采购商"
        align="center"
        header-align="center"
        prop="companyName">
      </el-table-column>
      <el-table-column
        label="竞价单价"
        prop="price">
      </el-table-column>
      <el-table-column
        label="数量"
        prop="name">
      </el-table-column>
      <el-table-column
        label="时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="状态"
        align="status"
        prop="name"
      >
        <template slot="header" slot-scope="scope">
          <span>状态</span>
          <el-tooltip effect="light" placement="top-end">
            <p style="width: 336px;line-height: 26px;font-size: 14px;" slot="content">竞拍状态为'当前有效'时，表示该条竞拍暂时领先其他人，如果竞拍已经结束，则用户可以购买该条竞拍数量；竞拍状态为'当前部分有效'时，表示该条竞拍有效数量超过竞拍总数如果竞拍已经结束，则用户可购买其中部分数量；竞拍状态为'无效'时，表示用户出价低于竞拍底价或者出价低于其他用户的出价，如果竞拍已经结束，则用户不能购买该条竞拍数量。</p>
            <i class="el-icon-question" style="margin-left: 4px;font-size: 16px;cursor: pointer"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="有效数量"
        prop="validNum">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [{
        name: '采购商',
        key: 'id',
      },{
        name: '竞拍单价',
        key: 'title',
      },{
        name: '数量',
        key: 'type',
      },{
        name: '时间',
        key: 'method',
      },{
        name: '状态',
        key: 'goodsName',
      },{
        name: '有效数量',
        key: 'goodsNum',
      }],
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
