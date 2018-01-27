<template>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'tracking',
  computed: {
    ...mapState(['main'])
  },
  watch: {
    'main.container.works'() {
      const matchingWork = this.main.container.works.find(w => w.id === this.$route.params.id)
      if (matchingWork) {
        this.$router.push({name: 'singleWork', params: {hash: matchingWork.hash}})
      }
    }
  }
}
</script>
