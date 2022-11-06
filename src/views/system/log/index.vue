<template>
  <list-page class="table-list">
    <query-box :columns="filter"/>
    <my-table ref="table" :columns="tableColumns" url="/lrhealth/empi/mergeConfig/queryByPage"/>
  </list-page>
</template>

<script>

import { tableColumns, filter } from './columns'

export default {
  name: 'config',
  data() {
    return {
      tableColumns,
      filter,
      formData: null,
      showAdd: false,
      showDel: false,
      title: '新增',
      target: null
    }
  },
  watch: {},
  methods: {
  }
}
</script>
