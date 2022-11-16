<template>
  <div class="data-table">
    <el-table
      :data="data"
      stripe
      style="width: 100%">
      <template v-for="item in columns">
        <el-table-column
          :key="item.key"
          :prop="item.key"
          :label="item.name"
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
      :total="total"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>

</template>

<script>
import Vue from 'vue';
import {getData} from "@/api/common";

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
  },
  data() {
    return {
      data: [],
      params: {},
      total: 0
    }
  },
  methods: {
    load(params = {}) {
      this.params = params;
      this.getList();
    },
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
    getList() {
      if (!this.url) {
        return
      }
      this.loading = true
      let data = this.params, params = {};
      if (this.method === 'get') {
        params = data
        data = {}
      }
      getData({url: this.url, data, method: this.method, params})
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.data = res.rows;
            this.total = res.total;
          } else {
            this.tableData = []
            this.page.attrs.total = 0
          }
        })
        .finally(() => {
          this.loading = false
        })
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