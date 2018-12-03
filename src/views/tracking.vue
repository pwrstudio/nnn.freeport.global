<template></template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'tracking',
  computed: {
    ...mapState(['main']),
  },
  watch: {
    'main.container.works'() {
      // Try to find a matching post for the slug
      const matchingWork = this.main.container.works.find(
        w => w.id === this.$route.params.id,
      )

      if (matchingWork) {
        // If found: go to post
        this.$router.push({
          name: 'singleWork',
          params: { hash: matchingWork.hash },
        })
      } else {
        // If not: got to 404 page
        this.$router.push({ name: 'notFound' })
      }
    },
  },
}
</script>
