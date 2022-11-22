<template>
  <div class="data-table">
    <el-table
      :data="data"
      stripe
      style="width: 100%"
    >
      <template v-for="item in columns">
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :label="item.name"
          :width="item.width || 150"
          :fixed="item.key === 'operate' ? 'right' : false"
          align="center"
          :formatter="formatter(item)"
          show-overflow-tooltip
        >
          <template v-for="slot in item.slots || []" slot-scope="scope">
            <slot :name="slot" v-bind="scope"/>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      class="table-pager"
      background
      layout="prev, pager, next"
      :disabled="loading"
      :page-size="pageSize"
      :total="total"
      :hide-on-single-page="true"
      @size-change="onPageChange"
      @current-change="onPageChange"
    >
    </el-pagination>
  </div>

</template>

<script>
import Vue from 'vue';
import {getData} from "@/api/common";
import {URL_PREFIX} from "@utils/const";

export default {
  name: 'DataTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Array,
      default: () => []
    },
    url: {
      default: '',
      type: String
    },
    method: {
      type: String,
      default: 'get'
    },
    pageSize: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      data: [],
      params: {},
      total: 0,
      pageNum: 1,
      loading: false,
    }
  },
  methods: {
    formatter(item) {
      return (row, column, val) => {
        if (item.dict) {
          return (item.dict.find(
            (item) =>
              item.value !== undefined && String(item.value) === String(val)
          ) || {name: ''}).label || val
        }
        return val;
      }
    },
    load(params){ //带条件查询的话从1开始
      this.pageNum = 1;
      this.getList(params)
    },
    getList: function (query) {
      if (!this.url) {
        return
      }
      this.loading = true
      this.params = Object.assign({}, this.params, {pageNum: this.pageNum, pageSize: this.pageSize}, query);
      let data = this.params, params = {};
      if (this.method === 'get') {
        params = data
        data = {}
      }
      getData({url: URL_PREFIX + this.url, data, method: this.method, params})
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.data = res.rows;
            this.total = res.total;
          } else {
            this.data = []
            this.total = 0
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onPageChange(pageNum){
      this.pageNum = pageNum;
      this.getList();
    }
  },
  watch: {
    url: {
      handler(val) {
        if (val) {
          this.getList()
        } else {
          this.loading = false
        }
      },
      immediate: true
    },
  },
}
</script>

<style lang="scss" scoped>
.data-table {
  margin-bottom: 30px;

  ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
    background: rgba(244, 247, 252, 0.75);
  }
  ::v-deep .el-table td.el-table__cell,{
    border-bottom: none;
  }

  ::v-deep .el-table .el-table__header-wrapper th{
    background: rgba(36,104,242,0.1);;
    color: #2468F2;
  }
}

.table-pager {
  margin: 30px auto 0;
  text-align: center;
}
</style>
