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
            <!-- <transition-group name="list"> -->
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
            <!-- </transition-group> -->
          </tbody>
        </table>
      </div>
      <div id='map'></div>
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
      <!-- Activity -->
      <div class='status__content__table'>
        <table>
          <thead class='status__content__table__header'>
            <th class='status__content__table__header__cell'>
              ID
            </th>
            <th class='status__content__table__header__cell'>
              IP
            </th>
            <th class='status__content__table__header__cell'>
              Location
            </th>
            <th class='status__content__table__header__cell'>
              Time on Site
            </th>
          </thead>
          <tbody class='status__content__table__body'>
            <tr v-for='user in main.userList'
                :key='user.id'
                class='status__content__table__body__row'>
              <td class='status__content__table__body__row__cell'>
                {{user.id}}
              </td>
              <td class='status__content__table__body__row__cell'>
                {{user.ip}}
              </td>
              <td class='status__content__table__body__row__cell'>
                {{user.geo.city}}, {{user.geo.country}}
              </td>
              <td class='status__content__table__body__row__cell'>
                132s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import mapboxgl from 'mapbox-gl'

export default {
  name: 'statusView',
  components: {},
  data() {
    return {
      map: {}
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    // or "const mapboxgl = require('mapbox-gl');"
    this.$nextTick(() => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNqYnpodnNrcjBmeTYyd3FwbGF5YzBrZmoifQ.ToAF7-pnMxqPA0ZH8ItEjQ'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [13.404954, 52.520008],
        zoom: 0
      })
      let marker = new mapboxgl.Marker().setLngLat([13.404954, 52.520008]).addTo(this.map)
    })
  },
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
  flex-wrap: wrap;
}

@mixin small-type {
  font-size: 14px;
}

@mixin large-type {
  font-size: 48px;
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.list-enter,
.list-leave-to {
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0;
}

#map {
  padding: 10px;
  height: calc(100% -20px);
  width: 20vw;
}

.status {
  padding-top: 60px;
  padding-bottom: 20px;
  height: calc(100vh - 80px) !important;
  display: flex;
  flex-wrap: wrap;
  color: $white;
  overflow: hidden;

  &__content {
    @include quad;
    width: 100%;
    &__table {
      border: 1px solid $white;
      padding: 10px;
      margin: 10px;
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
            padding: 10px;
            border-bottom: 1px solid $white;
          }
        }
      }
    }

    &__counter {
      background: $black;
      border: 1px solid $white;
      padding: 20px;
      margin: 10px;
      position: relative;

      &__header {
        @include small-type;
        text-align: center;
      }
      &__number {
        text-align: center;
        @include large-type;
        @include center;
      }
    }
  }

  &__users {
    @include quad;
    width: 100%;

    &__table {
      border: 1px solid $white;
      padding: 20px;
      margin: 10px;
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
            padding: 10px;
            border-bottom: 1px solid $white;
          }
        }
      }
    }

    &__counter {
      border: 1px solid $white;
      padding: 20px;
      margin: 10px;
      display: inline-block;
      position: relative;

      &__header {
        @include small-type;
        text-align: center;
      }
      &__number {
        text-align: center;
        @include large-type;
        @include center;
      }
    }
  }
}

.mapboxgl-control-container {
  display: none !important;
}
</style>
