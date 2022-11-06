<template>
  <div class="my-table" :class="{ flex: hasPage }">
    <el-table
      ref="elTable"
      v-loading="loading"
      :data="tableData"
      v-bind="$attrs"
      :height="hasPage ? '100%' : $attrs.height"
      v-on="$listeners"
      stripe
    >
      <template v-for="item in columns">
        <el-table-column
          v-if="isShow(item)"
          :key="item.key"
          :prop="item.key"
          :label="item.name"
          :formatter="formatter(item)"
          show-overflow-tooltip
          v-bind="getAttrs(item)"
          v-on="item.listeners"
        >
          <template v-for="slot in item.slots || []" slot-scope="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </el-table-column>
      </template>
      <div slot="empty" class="no-data">
        <svg class="no-data-icon">
          <use xlink:href="#icon-no-data" />
        </svg>
        <div>暂无数据</div>
      </div>
    </el-table>
    <!-- 分页模块 -->
    <el-pagination
      :disabled="loading"
      :background="background"
      :layout="layout"
      v-bind.sync="page.attrs"
      @size-change="onChange"
      @current-change="onChange"
      v-on="page.listeners"
    >
      <span class="el-pagination__total">共<b>{{ page.attrs.total }}</b>条</span>
    </el-pagination>
  </div>
</template>

<script>
import { getData } from '@/api/common'

export default {
  name: 'MyTable',
  inject: { parent: { default: null } },
  inheritAttrs: false,
  props: {
    isFormData: {
      type: Boolean,
      default: false
    },
    render: {
      type: Function,
      default: null
    },
    dictLib: {
      default: null,
      type: Object
    },
    defaultFilter: {
      type: Object,
      default: () => ({})
    },
    filterArr: {
      default: () => [],
      type: Array
    },
    columns: {
      default: () => [],
      type: Array
    },
    list: {
      // 当使用selection-change事件时谨慎使用list，不要在模板中定义数组，这样会导致table setData时数组发声改变，然后会清空选中数据
      default: () => [],
      type: Array
    },
    page: {
      default: () => ({
        attrs: {
          pageSize: 20,
          currentPage: 1,
          total: 0
        }
      }),
      type: Object
    },
    background: {
      default: false,
      type: Boolean
    },
    layout: {
      default: 'slot, sizes, prev, pager, next, jumper',
      type: String
    },
    hasPage: {
      default: true,
      type: Boolean
    },
    url: {
      default: '',
      type: String
    },
    method: {
      type: String,
      default: 'post'
    },
    minWidth: {
      default: 120,
      type: Number
    },
    isIndependent: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filter: {},
      loading: true,
      layout: 'slot, sizes, prev, pager, next, jumper',
      tableData: [],
      pageSize: 10,
      // style control page none
      selectList: []
    }
  },
  computed: {
    showPage() {
      return this.tableData.length
    }
  },
  watch: {
    url: {
      handler(val) {
        if (val) {
          if (this.auto) {
            this.getList()
          } else {
            this.loading = false
          }
        } else {
          this.loading = false
        }
      },
      immediate: true
    },
    list: {
      handler() {
        this.tableData = [...this.list]
      },
      immediate: true
    }
  },
  created() {
    // 判断列表是否是独立的，并且list-page是否已经存在table
    if (this.isIndependent === false && this.parent) {
      if (!this.parent.table) {
        this.parent.table = this
      } else {
        console.error(
          '当前页面已注册过table，当前table无法注册，请设置isIndependent属性或修改页面结构'
        )
      }
    }
  },
  mounted() {},
  methods: {
    getAttrs(item) {
      if (item.attrs && item.attrs.width) {
        return item.attrs
      } else {
        return { minWidth: this.minWidth, ...item.attrs }
      }
    },
    isShow({ show }) {
      if (show instanceof Function) {
        return show(this)
      } else {
        return show !== false
      }
    },
    setFilter(obj, isCover) {
      if (isCover) {
        this.filter = obj
      } else {
        this.filter = { ...this.filter, ...obj }
      }
    },
    getSelection() {
      return (this.$refs.elTable && this.$refs.elTable.selection) || []
    },
    reset() {
      // eslint-disable-next-line vue/no-mutating-props
      this.page.attrs.currentPage = 1
      this.$nextTick(() => {
        this.getList()
      })
    },
    formatter({ dict, attrs = {}, key }) {
      if (attrs.formatter) {
        return (row, column, cellValue, index) =>
          attrs.formatter(row, column, cellValue, index)
      } else if (dict || (this.dictLib && this.dictLib[key])) {
        const d = dict || this.dictLib[key]
        const code = attrs.code || 'value'
        const name = attrs.label || 'label'
        return (row, column, val) =>
          (d.find(
            (item) =>
              item[code] !== undefined && String(item[code]) === String(val)
          ) || { name: '' })[name] || val
      } else {
        return undefined
      }
    },
    getList() {
      if(!this.url){return}
      if (!this.parent) {
        this.loading = false
        return
      }
      this.loading = true
      let data = {
        ...this.defaultFilter,
        ...this.filter,
        ...((this.isIndependent === false &&
            this.parent &&
            this.parent.query &&
            this.parent.query.getData()) ||
          {}),
        pageSize: this.page.attrs.pageSize,
        pageIndex: this.page.attrs.currentPage,
        offset: this.page.attrs.currentPage,
        pageNum: this.page.attrs.currentPage,
        page_size: this.page.attrs.pageSize,
        page_num: this.page.attrs.currentPage
      }
      if (this.isFormData !== false) {
        const formData = new FormData()
        Object.keys(data).forEach((key) => {
          const item = data[key]
          if (Array.isArray(item)) {
            item.forEach((c) => {
              formData.append(key, c)
            })
          } else {
            formData.append(key, item)
          }
        })
        data = formData
      }
      // this.filterArr.map(ele=>{
      //   if(ele.dict&&ele.dict.length&&ele.type=='date-picker'){
      //     ele.dict.map((e,i)=>{
      //       data[e]=data[ele.key][i]
      //     })
      //     delete data[ele.key]
      //   }
      // })
      if (this.$listeners.search) {
        this.$emit('search', data)
      } else if (this.parent) {
        let params = {}
        if (this.method === 'get') {
          params = data
          data = {}
        }
        getData({ url: this.url, data, method: this.method, params })
          .then((res) => {
            this.loading = false
            if (res.code === 200) {
              this.tableData = (this.render && this.render(res)) || res.rows
              // eslint-disable-next-line vue/no-mutating-props
              this.page.attrs.total = res.total || res.rows.length || 0
            } else {
              this.tableData = []
              // eslint-disable-next-line vue/no-mutating-props
              this.page.attrs.total = 0
            }
            this.$emit('finish-load', this.tableData, this.params)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    onChange() {
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.my-table {
  flex: 1;
  background: #fff;

  &.flex {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .no-data {
    font-size: 13px;
    color: #94a5b7;
    letter-spacing: 0;
    text-align: center;
    line-height: 13px;
    font-weight: 400;
  }

  .no-data-icon {
    width: 153px;
    height: 87px;
    margin-bottom: 13px;
  }

  ::v-deep {
    .el-table {
      max-height: 100%;
      flex: 1;

      .el-button {
        font-size: 13px;
      }
    }

    .el-table__empty-block {
      padding-top: 94px;
      align-items: flex-start;
    }
  }

  .total {
    font-weight: bold;
    white-space: pre-line;
  }

  ::v-deep {
    //.el-table__row td {
    //  padding: 0;
    //}
    .el-pagination {
      flex: 0 0 40px;
      padding: 9px;
      font-size: 13px;
      text-align: right;

      .el-pagination__total {
      }
    }
  }
}
</style>
