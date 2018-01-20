<template>
  <div class='status'>
    <!-- Content -->
    <div class='status__content'>
      <!-- User count -->
      <div class='status__users__counter'>
        <div class='status__users__counter__header'>
        </div>
        <div v-if='main.userList'
             class='status__users__counter__number'>
          <!-- {{main.userList.length}} -->
        </div>
      </div>
      <!-- Exhibitions -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
        </div>
        <div v-if='main.container.exhibitions'
             class='status__content__counter__number'>
          <!-- {{main.container.exhibitions.length}} -->
        </div>
      </div>
      <!-- Works -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
        </div>
        <div v-if='main.container.works'
             class='status__content__counter__number'>
          <!-- {{main.container.works.length}} -->
        </div>
      </div>
      <!-- Content units -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
        </div>
        <div v-if='main.container.content'
             class='status__content__counter__number'>
          <!-- {{main.container.content.length}} -->
        </div>
      </div>
    </div>
    <!-- Users -->
    <div class='status__users'>
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
            <statusUserRow v-for='user in main.userList'
                :key='user.id' 
                :user='user'/>
          </tbody>
        </table>
      </div>
      <div id='map'
           class='status__users__map' />
    </div>
    <div class='status__third'>
      <!-- User count -->
      <div class='status__users__counter'>
        <div class='status__users__counter__header'>
        </div>
        <div v-if='main.userList'
             class='status__users__counter__number'>
          <!-- {{main.userList.length}} -->
        </div>
      </div>
      <!-- Exhibitions -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
        </div>
        <div v-if='main.container.exhibitions'
             class='status__content__counter__number'>
          <!-- {{main.container.exhibitions.length}} -->
        </div>
      </div>
      <!-- Works -->
      <div class='status__content__counter'>
        <div class='status__content__counter__header'>
        </div>
        <div v-if='main.container.works'
             class='status__content__counter__number'>
          <!-- {{main.container.works.length}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import mapboxgl from 'mapbox-gl'
import statusUserRow from '@/components/status-user-row'

export default {
  name: 'statusView',
  components: {
    statusUserRow
  },
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
        marker.remove()
      })
      this.markers = []
    }
  },
  mounted() {
    this.$nextTick(() => {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNpbTJmMWYwazAwbXV2a201dHV4M3Q0MTEifQ.haMHeGT4HNA8zI2S0BDgGg'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/pwrstudio/cjckofn6i05vq2sqw7rfll80o',
        center: [13.404954, 52.520008],
        zoom: 0
      })
      this.main.userList.map(user => {
        var el = document.createElement('div')
        el.className = 'marker'
        new mapboxgl.Marker(el).setLngLat([user.geo.ll[1], user.geo.ll[0]]).addTo(this.map)
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
          var el = document.createElement('div')
          el.className = 'marker'
          this.markers.push(
            new mapboxgl.Marker(el).setLngLat([user.geo.ll[1], user.geo.ll[0]]).addTo(this.map)
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
  height: 50%;
  width: 50%;
  overflow: hidden;
}

@mixin small-type {
  font-size: 14px;
}

@mixin large-type {
  font-size: 14px;
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

@mixin small-counter {
  flex: 1 1 100px;
  background: $black;
  border: 1px solid $white;
  padding: 20px;
  margin: 10px;
  position: relative;

  &__header {
    @include small-type;
    text-align: center;
    text-decoration: underline;
  }
  &__number {
    text-align: center;
    @include small-type;
  }
}

@mixin table {
  border: 1px solid $white;
  flex: 1 1 500px;
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
}

.status {
  color: $white;
  height: calc(100vh - 60px) !important;
  overflow: hidden;
  padding-top: 60px;
  padding-bottom: 20px;

  &__content {
    @include quad;
    width: 100%;
    height: 10%;
    &__table {
      @include table;
    }

    &__counter {
      @include small-counter;
    }
  }

  &__users {
    @include quad;
    width: 100%;
    height: 60%;

    &__table {
      @include table;
      @include screen-size('small') {
        display: none;
      }
    }

    &__counter {
      @include counter;
    }

    &__map {
      flex: 1 2 500px;
      padding: 0px;
      margin: 10px;
      overflow: hidden;
      border: 1px solid $white;
    }
  }

  &__third {
    @include quad;
    width: 100%;
    height: 30%;

    &__table {
      @include table;
    }

    &__counter {
      @include counter;
    }

    &__map {
      flex: 1 2 500px;
      padding: 0px;
      margin: 10px;
      overflow: hidden;
      border: 1px solid $white;
    }
  }
}
</style>
