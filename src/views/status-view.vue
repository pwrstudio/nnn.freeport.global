<template>
  <div class='status'>
    <!-- 1 ROW -->
    <!-- 1 ROW -->
    <!-- 1 ROW -->
    <div class='status__first'>
      <!-- IPFS -->
      <a href='/info#hash'
         class='status__first__box'
         v-tooltip.auto='"IPFS root hash"'>
        <div class="status__first__box__label">
          <i class="material-icons">flag</i>
        </div>
        <span class='status__first__box__info'
              v-html='main.rootHash' />
      </a>
      <!-- Ethereum-->
      <a href='/info#hash'
         class='status__first__box'
         v-tooltip.auto='"Ethereum contract address"'>
        <div class="status__first__box__label">
          <i class=" material-icons">lock_outline</i>
        </div>
        <span class='status__first__box__info'
              v-html='"0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A"' />
      </a>
      <!-- Last update -->
      <a href='https://rinkeby.etherscan.io/address/0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A'
         target=_blank
         class='status__first__box'
         v-tooltip.auto='"Last update"'>
        <div class="status__first__box__label">
          <i class="material-icons">query_builder</i>
        </div>
        <span class='status__first__box__info'
              v-html='formatDate(main.container.updated)' />
      </a>
    </div>
    <!-- 2 ROW -->
    <!-- 2 ROW -->
    <!-- 2 ROW -->
    <div class='status__second'>
      <div :class='{"mobile-show":activeMobileTab === "list"}'
           class='status__second__table'>
        <table>
          <thead class='status__second__table__header'>
            <th class='status__second__table__header__cell status__second__table__header__cell--mobile-hide' />
            <th class='status__second__table__header__cell'>
              ID
            </th>
            <th class='status__second__table__header__cell status__second__table__header__cell--mobile-hide'>
              IP
            </th>
            <th class='status__second__table__header__cell'>
              <i class="material-icons">location_on</i>
            </th>
            <th class='status__second__table__header__cell'>
              <i class="material-icons">timer</i>
            </th>
          </thead>
          <tbody class='status__second__table__body'>
            <statusUserRow v-for='user in main.userList'
                           :key='user.id'
                           :user='user' />
          </tbody>
        </table>
      </div>
      <div id='map'
           :class='{"mobile-show":activeMobileTab === "map"}'
           class='status__second__map' />
      <!-- Mobile tabs -->
      <div class='status__second__tabs'>
        <div @click='activeMobileTab = "map"'
             class='status__second__tabs__tab'
             :class='{"status__second__tabs__tab--active": activeMobileTab === "map"}'>
          <i class="material-icons">place</i>
        </div>
        <div @click='activeMobileTab = "list"'
             class='status__second__tabs__tab'
             :class='{"status__second__tabs__tab--active": activeMobileTab === "list"}'>
          <i class="material-icons">list</i>
        </div>
      </div>
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
      activeTab: 'works',
      activeMobileTab: 'map'
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
    setMarkers() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNpbTJmMWYwazAwbXV2a201dHV4M3Q0MTEifQ.haMHeGT4HNA8zI2S0BDgGg'
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/pwrstudio/cjckofn6i05vq2sqw7rfll80o',
        center: [13.404954, 52.520008],
        zoom: 0
      })
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
      // Set user-markers
      this.setMarkers()
      // Set exhibition-markers
      // this.main.container.exhibitions.map(exhibition => {
      //   const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + exhibition.hash)
      //   httpPromise.then(response => {
      //     if (response.body.location && response.body.location.geopoint) {
      //       var el = document.createElement('div')
      //       el.className = 'exhibition-marker'
      //       new mapboxgl.Marker(el)
      //         .setLngLat([
      //           response.body.location.geopoint.longitude,
      //           response.body.location.geopoint.latitude
      //         ])
      //         .addTo(this.map)
      //     }
      //   })
      //   httpPromise.catch(console.log)
      // })
    })
  },
  watch: {
    'main.userList'() {
      this.clearMarkers()
      this.setMarkers()
    },
    activeMobileTab() {
      this.$nextTick(() => {
        if (this.activeMobileTab === 'map') {
          this.setMarkers()
        } else {
          this.clearMarkers()
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

@mixin table {
  border: 1px solid $white;
  flex: 1 1 500px;
  font-size: $font-size-small;
  margin: 10px;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 10px;

  table {
    width: 100%;
  }

  @include hide-scroll;

  &__header {
    &__cell {
      border-bottom: 1px solid $white;
      padding: 10px;

      i {
        position: relative;
        top: 3px;
      }

      @include screen-size('small') {
        font-size: $font-size-xs !important;
      }

      &--mobile-hide {
        @include screen-size('small') {
          display: none;
        }
      }
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
    display: flex;
    align-content: stretch;
    overflow: hidden;
    width: 100%;
    height: 10%;
    @include hide-scroll;

    &__box {
      background: $black;
      border: 1px solid $white;
      width: 200px;
      overflow-x: scroll;
      margin: 10px;
      padding: 10px;
      position: relative;
      font-size: $font-size-small;
      display: flex;
      align-items: center;
      color: $white;
      text-decoration: none;
      flex-grow: 4;
      @include hide-scroll;

      &:last-child {
        width: 150px;
        flex-grow: 1;
      }

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
        @include hide-scroll;
      }
    }

    @include screen-size('small') {
      display: none;
    }

    @include screen-size('short') {
      display: none;
    }
  }

  &__second {
    align-content: stretch;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 50%;

    @include screen-size('short') {
      height: 60%;
    }

    @include screen-size('small') {
      display: block;
    }

    &__table {
      @include table;
      @include screen-size('small') {
        display: none;
        height: calc(100% - 80px);
        &.mobile-show {
          display: block;
        }
      }
    }

    &__map {
      flex: 1 2 500px;
      padding: 0px;
      margin: 10px;
      overflow: hidden;
      border: 1px solid $white;

      @include screen-size('small') {
        display: none;
        height: calc(100% - 60px);
        &.mobile-show {
          display: block;
        }
      }
    }

    &__tabs {
      display: none;
      height: 40px;
      width: calc(100% - 20px);
      margin-left: 10px;
      margin-right: 10px;
      cursor: pointer;
      @include screen-size('small') {
        display: flex;
      }

      &__tab {
        background: transparent;
        width: 50%;
        line-height: 40px;
        text-align: center;

        &--active {
          background: $white;
          color: $black;
        }
        i {
          position: relative;
          top: 5px;
        }
      }
    }
  }

  &__third {
    align-content: stretch;
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 40%;
    @include screen-size('small') {
      height: 40%;
    }

    &__table {
      @include table;
    }

    &__inventory {
      font-size: $font-size-small;
      overflow: hidden;
      flex: 1 2 200px;
      background: $black;
      border: 1px solid $white;
      padding: 10px;
      margin: 10px;
      position: relative;

      &__tabs {
        display: flex;
        height: 40px;
        width: 100%;
        overflow: hidden;
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

      @include screen-size('small') {
        display: none !important;
      }
    }
  }
}
</style>
