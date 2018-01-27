<template>
  <div class='status'>
    <!-- 1 ROW -->
    <!-- 1 ROW -->
    <!-- 1 ROW -->
    <div class='status__first'>
      <!-- IPFS -->
      <div class='status__first__box'>
        <div class="status__first__box__label">
          <i class="material-icons">flag</i>
        </div>
        <span class='status__first__box__info'
              v-html='main.rootHash' />
      </div>
      <!-- Ethereum-->
      <div class='status__first__box'>
        <div class="status__first__box__label">
          <i class=" material-icons">lock_outline</i>
        </div>
        <span class='status__first__box__info'
              v-html='"0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A"' />
      </div>
      <!-- Last update -->
      <div class='status__first__box'>
        <div class="status__first__box__label">
          <i class="material-icons">query_builder</i>
        </div>
        <span class='status__first__box__info'
              v-html='formatDate(main.container.updated)' />
      </div>
    </div>
    <!-- 2 ROW -->
    <!-- 2 ROW -->
    <!-- 2 ROW -->
    <div class='status__users'>
      <!-- User list -->
      <div class='status__users__table'>
        <table>
          <thead class='status__users__table__header'>
            <th class='status__users__table__header__cell'></th>
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
                           :user='user' />
          </tbody>
        </table>
      </div>
      <div id='map'
           class='status__users__map' />
    </div>
    <!-- 3 ROW -->
    <!-- 3 ROW -->
    <!-- 3 ROW -->
    <div class='status__third'>
      <!-- Log-->
      <div class='status__third__table'>
        <table>
          <tbody class='status__third__table__body'>
            <statusLogRow v-for='msg in main.log'
                          :key='makeId()'
                          :msg='msg' />
          </tbody>
        </table>
      </div>
      <!-- Works/exhibitions list-->
      <div class='status__third__inventory'>
        <div class='status__third__inventory__tabs'>
          <div @click='activeTab = "works"'
               class='status__third__inventory__tabs__tab'
               :class='{"status__third__inventory__tabs__tab--active": activeTab === "works"}'
               v-html='"Works (" + main.container.works.length  + ")"' />
          <div @click='activeTab = "exhibitions"'
               class='status__third__inventory__tabs__tab'
               :class='{"status__third__inventory__tabs__tab--active": activeTab === "exhibitions"}'
               v-html='"Exhibitions (" + main.container.exhibitions.length  + ")"' />
        </div>
        <div v-if='activeTab === "works"'
             class='status__third__inventory__container'>
          <statusWorksRow v-for='work in main.container.works'
                          :key='work.id'
                          :work='work' />
        </div>
        <div v-if='activeTab === "exhibitions"'
             class='status__third__inventory__container'>
          <statusExhibitionsRow v-for='exhibition in main.container.exhibitions'
                                :key='exhibition.id'
                                :exhibition='exhibition' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import mapboxgl from 'mapbox-gl'
import {format, parse} from 'date-fns'
// import statusLogRow from '@/components/rows/status-log-row'
// import statusWorksRow from '@/components/rows/status-works-row'
// import statusExhibitionsRow from '@/components/rows/status-exhibitions-row'

const statusUserRow = () => import('@/components/rows/status-user-row')
const statusLogRow = () => import('@/components/rows/status-log-row')
const statusWorksRow = () => import('@/components/rows/status-works-row')
const statusExhibitionsRow = () => import('@/components/rows/status-exhibitions-row')

export default {
  name: 'statusView',
  components: {
    statusUserRow,
    statusLogRow,
    statusWorksRow,
    statusExhibitionsRow
  },
  data() {
    return {
      map: {},
      markers: [],
      activeTab: 'works'
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
    },
    makeId() {
      let text = ''
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return text
    },
    formatDate(date) {
      return format(parse(date), 'YYYY-MM-DD HH:MM')
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
    },
    'main.exhibitionLocations'() {
      // TODO
      this.exhibitionMarkers.map(marker => {
        marker.remove()
      })
      this.exhibitionMarkers = []
      // TODO
      if (this.main.exhibitionLocations.length > this.markers.length) {
        this.main.userList.map(exhibition => {
          var el = document.createElement('div')
          el.className = 'exhibition-marker'
          this.exhibitionMarkers.push(
            new mapboxgl.Marker(el)
              .setLngLat([exhibition.geo.ll[1], exhibition.geo.ll[0]])
              .addTo(this.map)
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
  font-size: $font-size-small;
}

@mixin large-type {
  font-size: $font-size-small;
}

@mixin counter {
  flex: 1 2 200px;
  background: $black;
  border: 1px solid $white;
  padding: 10px;
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

  &__first {
    align-content: stretch;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 10%;

    &__box {
      background: $black;
      border: 1px solid $white;
      flex: 2 2 200px;
      margin: 10px;
      padding: 10px;
      position: relative;
      font-size: $font-size-small;
      display: flex;
      align-items: center;

      &__label {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 50px;
        font-size: 26px;
        line-height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid $white;
      }

      &__info {
        margin-left: 60px;
      }
    }

    @include screen-size('small') {
      display: none;
    }
  }

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

    @include screen-size('short') {
      display: none;
    }

    @include screen-size('small') {
      display: none;
    }
  }

  &__users {
    @include quad;
    width: 100%;
    height: 50%;

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
    height: 40%;

    &__table {
      @include table;
    }

    &__inventory {
      font-size: $font-size-small;
      overflow: hidden;

      &__tabs {
        display: flex;
        height: 40px;
        width: 100%;
        cursor: pointer;

        &__tab {
          background: transparent;
          width: 50%;
          line-height: 40px;
          text-align: center;
          &--active {
            background: $white;
            color: $black;
          }
        }
      }

      &__container {
        height: 90%;
        overflow-x: hidden;
        overflow-y: auto;

        @include hide-scroll;
      }

      @include counter;

      @include screen-size('small') {
        display: none !important;
      }
    }
  }
}
</style>
