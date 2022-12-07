<template>
  <el-form ref="searchForm" class="search-form">
    <el-row :gutter="30">
      <template v-for="(item, index) in list">
        <el-col :md="item.type === FORM_TYPE.DATEPICKER_RANGE ? 12 : 8" :sm="24" :key="index">
          <el-form-item :label="item.label">
            <el-select v-if="item.type === 'select'"
                       v-model="queryParams[item.field]"
                       :placeholder="`请选择${item.label}`"
            >
              <el-option
                v-for="(child, index) in item.options"
                :key="index"
                :value="child.value"
                :label="child.label"
              >
                {{ child.label }}
              </el-option>
            </el-select>

            <el-date-picker
              v-else-if="item.type === 'datepicker'"
              type="date"
              @change="onDatePickerChange($event, item.field)"
              v-model="queryParams[item.field]"
              placeholder="选择日期">
            </el-date-picker>

            <el-date-picker
              v-else-if="item.type === 'datepicker_range'"
              v-model="queryParams[item.field]"
              type="daterange"
              range-separator="至"
              @change="onDatePickerRangeChange($event, item.field)"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>

            <el-input v-else v-model="queryParams[item.field]" :placeholder="`请输入${item.label}`"/>
          </el-form-item>
        </el-col>
      </template>
      <el-col :md="24" :sm="24" class="action-box">
        <div>
          <slot></slot>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          <el-button icon="el-icon-refresh-left" style="margin-left: 15px" @click="reset">清空</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { formatDate } from "@utils/time";
import {FORM_TYPE} from "@utils/const";

export default {
  name: 'SearchForm',
  props: {
    list: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      queryParams: {},
      FORM_TYPE: FORM_TYPE
    }
  },
  methods: {
    reset() {
      this.queryParams = {};
      this.$emit('search', {});//重置查询条件同时重置表格
    },
    search() {
      const params = this.queryParams
      this.$emit('search', params)
    },
    onDatePickerChange(e, field){
      this.queryParams[field] = formatDate(e)
    },
    onDatePickerRangeChange(e, field) {
      if (e) {
        e[0] = formatDate(e[0]);
        e[1] = formatDate(e[1])
      }
      this.queryParams[field] = e
    }
  },
  watch: {
    list: {
      handler() {
        const queryParams = {}
        this.list.forEach(item => {
          if (item.type === 'dateRange') {
            queryParams[item.field] = [];
          } else {
            queryParams[item.field] = ''
          }
        })
        this.queryParams = queryParams
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.search-form {
  background: rgba(244, 247, 252, 0.75);
  border-radius: 5px;
  padding: 15px 30px;
  .el-button{
    border-radius: 8px;
  }
}

.action-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
}

.el-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  ::v-deep .el-form-item__label {
    flex-shrink: 0;
  }
}
</style>
