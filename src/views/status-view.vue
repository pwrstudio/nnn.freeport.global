<template>
  <div class='status'>
    <!-- User count -->
    <div class='status__counter'>
      <div class='status__counter__header'>
        Active users
      </div>
      <div class='status__counter__number'>
        {{main.userList.length}}
      </div>
    </div>
    <!-- User list -->
    <table class='status__table'>
      <thead class='status__table__header'>
        <th class='status__table__header__cell'>
          ID
        </th>
        <th class='status__table__header__cell'>
          IP
        </th>
        <th class='status__table__header__cell'>
          Location
        </th>
        <th class='status__table__header__cell'>
          Time on Site
        </th>
      </thead>
      <tbody class='status__table__body'>
        <tr v-for='user in main.userList'
            :key='user.id'
            class='status__table__body__row'>
          <td class='status__table__body__row__cell'>
            {{user.id}}
          </td>
          <td class='status__table__body__row__cell'>
            {{user.ip}}
          </td>
          <td class='status__table__body__row__cell'>
            {{user.geo.city}}, {{user.geo.country}}
          </td>
          <td class='status__table__body__row__cell'>
            {{user.time}}
            <!-- <vue-countdown-2 v-if='user.time'
                             :deadline="user.time"
                             format="%ss" /> -->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Exhibitions -->
    <div class='status__counter'>
      <div class='status__counter__header'>
        Exhibitions
      </div>
      <div class='status__counter__number'>
        {{main.container.exhibitions.length}}
      </div>
    </div>
    <!-- Works -->
    <div class='status__counter'>
      <div class='status__counter__header'>
        Works
      </div>
      <div class='status__counter__number'>
        {{main.container.works.length}}
      </div>
    </div>
    <!-- Content units -->
    <div class='status__counter'>
      <div class='status__counter__header'>
        Content units
      </div>
      <div class='status__counter__number'>
        {{main.container.content.length}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// import VueCountdown2 from 'vue-countdown-2'

export default {
  name: 'statusView',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {},
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.status {
  display: flex;
  flex-wrap: wrap;

  &__counter {
    background: white;
    height: 200px;
    padding: 20px;
    margin: 20px;

    &__header {
      text-align: center;
    }
    &__number {
      text-align: center;
      font-size: 52px;
      line-height: 200px;
    }
  }

  &__table {
    background: white;
    padding: 20px;
    margin: 20px;

    &__header {
      &__cell {
        padding: 10px;
        border-bottom: 1px solid black;
      }
    }

    &__body {
      &__row {
        &__cell {
          padding: 20px;
          border-bottom: 1px solid black;
        }
      }
    }
  }
}
</style>
