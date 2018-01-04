<template>
  <div class='status'>
    <!-- Users -->
    <div class='status__users'>
      <!-- User count -->
      <div class='status__users__counter'>
        <div class='status__users__counter__header'>
          Active users
        </div>
        <div v-if='main.userList'
             class='status__users__counter__number'>
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
                <span v-if='user.geo.city'>{{user.geo.city}}, </span>
                <span v-if='user.geo.country'>{{user.geo.country}}</span>
              </td>
              <td class='status__users__table__body__row__cell'>
                132s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id='map'
           class='status__users__map' />
    </div>
    <!-- Content -->
    <div class='status__content'>
      <!-- Exhibitions -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Exhibitions
        </div>
        <div v-if='main.container.exhibitions'
             class='status__content__counter__number'>
          {{main.container.exhibitions.length}}
        </div>
      </div>
      <!-- Works -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Works
        </div>
        <div v-if='main.container.works'
             class='status__content__counter__number'>
          {{main.container.works.length}}
        </div>
      </div>
      <!-- Content units -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
          Content
        </div>
        <div v-if='main.container.content'
             class='status__content__counter__number'>
          {{main.container.content.length}}
        </div>
      </div>
      <!-- Activity -->
      <div class='status__content__table'>
        <table>
          <thead class='status__content__table__header'>
            <th class='status__content__table__header__cell'>
              Time
            </th>
            <th class='status__content__table__header__cell'>
              Activity
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
      map: {},
      markers: []
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    clearMarkers() {
      // TODO
      this.markers.map(marker => {
        console.log('marker', marker)
        marker.remove()
      })
      this.markers = []
    }
  },
  mounted() {
    this.$nextTick(() => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNqYnpodnNrcjBmeTYyd3FwbGF5YzBrZmoifQ.ToAF7-pnMxqPA0ZH8ItEjQ'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v9',
        center: [13.404954, 52.520008],
        zoom: 0
      })
      this.main.userList.map(user => {
        new mapboxgl.Marker().setLngLat([user.geo.ll[1], user.geo.ll[0]]).addTo(this.map)
        // if (this.markers.length > 0) {
        //   this.markers[this.markers.length - 1].user = user.id
        // } else {
        //   this.markers[0].user = user.id
        // }
      })
    })
  },
  watch: {
    'main.userList'() {
      // TODO
      this.clearMarkers()
      // TODO
      if (this.main.userList.length > this.markers.length) {
        this.main.userList.map(user => {
          this.markers.push(
            new mapboxgl.Marker().setLngLat([user.geo.ll[1], user.geo.ll[0]]).addTo(this.map)
          )
        })
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

@mixin quad {
  align-content: stretch;
  display: flex;
  // flex-wrap: wrap;
  height: 50%;
  width: 50%;
}

@mixin small-type {
  font-size: 14px;
}

@mixin large-type {
  font-size: 48px;
}

@mixin counter {
  flex: 1 2 200px;
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

@mixin table {
  border: 1px solid $white;
  flex: 1 2 800px;
  margin: 10px;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 10px;

  table {
    width: 100%;
  }

  @include small-type;
  @include hide-scroll;

  &__header {
    &__cell {
      border-bottom: 1px solid $white;
      padding: 10px;
    }
  }

  &__body {
    &__row {
      &__cell {
        border-bottom: 1px solid $white;
        padding: 10px;
      }
    }
  }
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

.status {
  color: $white;
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 80px) !important;
  overflow: hidden;
  padding-top: 60px;
  padding-bottom: 20px;

  &__content {
    @include quad;
    width: 100%;
    &__table {
      @include table;
    }

    &__counter {
      @include counter;
    }
  }

  &__users {
    @include quad;
    width: 100%;

    &__table {
      @include table;
    }

    &__counter {
      @include counter;
    }

    &__map {
      flex: 2 2 400px;
      padding: 10px;
      margin-right: 10px;
      overflow: hidden;
    }
  }
}

.mapboxgl-control-container {
  display: none !important;
}
</style>
