export const permission = {
  methods: {
    hasPermission(value) {
      const all_permission = '*:*:*'
      const permissions = this.$store.state.user.permissions
      if (value && value instanceof Array && value.length > 0) {
        const permissionFlag = value

        return permissions.some(permission => {
          return all_permission === permission || permissionFlag.includes(permission)
        })
      }
      return false
    }
  }
}
