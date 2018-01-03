<template>
  <div class='status'>
    <!-- Users -->
    <div class='status__users'>
      <!-- User count -->
      <div class='status__users__counter'>
        <div class='status__users__counter__header'>
          Active users
        </div>
        <div class='status__users__counter__number'>
          {{main.userList.length}}
        </div>
      </div>
      <!-- User list -->
      <div class='status__users__table'>
        <table>
          <thead class='status__users__table__header'>
            <th class='status__users__table__header__cell'>
              ID
            </th>
            <th class='status__users__table__header__cell'>
              IP
            </th>
            <th class='status__users__table__header__cell'>
              Location
            </th>
            <th class='status__users__table__header__cell'>
              Time on Site
            </th>
          </thead>
          <tbody class='status__users__table__body'>
            <tr v-for='user in main.userList'
                :key='user.id'
                class='status__users__table__body__row'>
              <td class='status__users__table__body__row__cell'>
                {{user.id}}
              </td>
              <td class='status__users__table__body__row__cell'>
                {{user.ip}}
              </td>
              <td class='status__users__table__body__row__cell'>
                {{user.geo.city}}, {{user.geo.country}}
              </td>
              <td class='status__users__table__body__row__cell'>
                132s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Content -->
    <div class='status__content'>
      <!-- Exhibitions -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Exhibitions
        </div>
        <div class='status__content__counter__number'>
          {{main.container.exhibitions.length}}
        </div>
      </div>
      <!-- Works -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Works
        </div>
        <div class='status__content__counter__number'>
          {{main.container.works.length}}
        </div>
      </div>
      <!-- Content units -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Content units
        </div>
        <div class='status__content__counter__number'>
          {{main.container.content.length}}
        </div>
      </div>
    </div>
    <!-- Content2 -->
    <div class='status__content'>
      <!-- Exhibitions -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Exhibitions
        </div>
        <div class='status__content__counter__number'>
          {{main.container.exhibitions.length}}
        </div>
      </div>
      <!-- Works -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Works
        </div>
        <div class='status__content__counter__number'>
          {{main.container.works.length}}
        </div>
      </div>
      <!-- Content units -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Content units
        </div>
        <div class='status__content__counter__number'>
          {{main.container.content.length}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

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
  updated() {
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

@mixin quad {
  width: 50%;
  height: 50%;
  display: flex;
}

@mixin small-type {
  font-size: 14px;
}

@mixin large-type {
  font-size: 48px;
}

.status {
  padding-top: 60px;
  padding-bottom: 60px;
  height: calc(100vh - 120px) !important;
  display: flex;
  flex-wrap: wrap;
  color: $white;

  &__content {
    width: 50%;
    @include quad;

    &__counter {
      background: $black;
      border: 1px solid $white;
      height: 160px;
      padding: 20px;
      margin: 20px;

      &__header {
        @include small-type;
        text-align: center;
      }
      &__number {
        text-align: center;
        @include large-type;
        line-height: 160px;
      }
    }
  }

  &__users {
    @include quad;
    width: 100%;

    &__table {
      border: 1px solid $white;
      padding: 20px;
      margin: 20px;
      max-height: 100%;
      @include small-type;
      overflow-x: hidden;
      overflow-y: scroll;
      @include hide-scroll;

      &__header {
        &__cell {
          padding: 10px;
          border-bottom: 1px solid $white;
        }
      }

      &__body {
        &__row {
          &__cell {
            padding: 20px;
            border-bottom: 1px solid $white;
          }
        }
      }
    }

    &__counter {
      border: 1px solid $white;
      width: 160px;
      height: 160px;
      padding: 20px;
      margin: 20px;
      display: inline-block;

      &__header {
        @include small-type;
        text-align: center;
      }
      &__number {
        text-align: center;
        @include large-type;
        line-height: 160px;
      }
    }
  }
}
</style>
