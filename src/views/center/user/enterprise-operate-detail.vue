<template>
  <div class="w">
    <preview-render :list="list"
                    :data-source="dataSource"
    ></preview-render>
  </div>
</template>

<script>
import PreviewRender from "@components/PreviewRender/PreviewRender";
import {ENTERPRISE_OPERATE_MODEL} from "@views/center/user/model/enterprise-model";
import {getEnterpriseOperate} from "@/api/user/user";

export default {
  components: {
    PreviewRender,
  },
  data() {
    return {
      list: ENTERPRISE_OPERATE_MODEL,
      dataSource: {}
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getData()
  },
  methods: {
    async getData() {
      const {data} = await getEnterpriseOperate(this.id)
      this.dataSource = data;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
