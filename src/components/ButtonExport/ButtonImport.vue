<template>
  <div style="display: inline-block">
    <el-upload
      name="file"
      :show-upload-list="false"
      :customRequest="customRequest"
    >
      <el-button type="primary">
        <slot></slot>
      </el-button>
    </el-upload>
  </div>
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
    },
    data() {
      return {

      }
    },
    methods: {
      async customRequest(file) {
        const formData = new FormData()
        formData.append('file', file.file)
        const result = await this.$http.post(this.url, formData, {
          contentType: false,
          processData: false,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        if(result.success){
          this.$message.success(result.msg);
          this.$emit('importSuccess')
        }else{
          this.$message.error(result.msg);
        }
      },
    }

  }
</script>
