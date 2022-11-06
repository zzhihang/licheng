<template>
  <div>
    <el-cascader
      :options="orgList"
      :props="{ label: 'orgName', value: 'orgId' }"
      popper-class="customer-cascade"
      filterable
      v-model="value"
    >
      <!--      <template slot-scope="{ node, data }">-->
      <!--        <span class="name" :class="{leaf:!data.children}">{{ data.label }}</span>-->
      <!--        <span class="subtitle" v-if="!node.isLeaf"> 共<span class="count">{{ data.children.length }}</span>家机构 </span>-->
      <!--      </template>-->
    </el-cascader>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PlatformSelect',
  computed: {
    ...mapState('user', ['orgList', 'orgId']),
  },
  data() {
    return {
      value: '',
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.setOrgId(val)
      }
    },
  },
  created() {
    this.value = this.orgId
  },
  methods: {
    ...mapActions('user', ['setOrgId']),
  },
}
</script>

<style lang="scss" scoped>
.el-cascade {
  width: 213px;
}

.name {
  font-size: 14px;
  color: #1890ff;
  font-weight: 400;
  &.leaf {
    color: #646566;
  }
}

.subtitle {
  padding-left: 8px;
  width: 24px;
  font-size: 12px;
  color: #646566;
  font-weight: 400;
  .count {
    color: #1890ff;
  }
}

::v-deep {
  .is-focus .el-input__inner {
    border: 1px solid #4190ff !important;
  }
  .el-input__inner {
    border: 1px solid #4190ff;
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
