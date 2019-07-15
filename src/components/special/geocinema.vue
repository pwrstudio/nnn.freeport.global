<template>
  <div class="geocinema" v-if='!main'>
    <div class="geocinema__loader" :class="{ active: !loaded }">

      <img class="geocinema__loader__cloud geocinema__loader__cloud--1" src='/img/cloud.png'>
      <img class="geocinema__loader__cloud geocinema__loader__cloud--2" src='/img/cloud4.png'>
      <img class="geocinema__loader__cloud geocinema__loader__cloud--3" src='/img/cloud3.png'>

      <img class='moon' id='moon--1' src='/img/moon.png'>
      <img class='moon' id='moon--2' src='/img/moon2.png'>
      <img class='moon' id='moon--3' src='/img/moon3.png'>
      <img class='moon' id='moon--4' src='/img/moon4.png'>
      <img class='moon' id='moon--5' src='/img/moon5.png'>
      <img class='moon' id='moon--6' src='/img/moon6.png'>

      <div class="geocinema__loader__inner">
        <div class="geocinema__loader__inner__top">Your future forecast is currently being written by over thirty earth-orbiting satellite missions</div>
        <div class="geocinema__loader__inner__image"><img src='/img/loader.png'/></div>
        <div class="geocinema__loader__inner__bottom">please wait approx 40 seconds</div>
      </div>
    </div>

    <div v-show='loaded' id="orbits" />

    <div v-if='loaded' class="geocinema__poetry">
      <div class="geocinema__poetry--header">Based on your personal geo-location the satellites forecast your future as…</div>
      <div class="geocinema__poetry--main">{{ poetry }}</div>
    </div>

    <transition name="fade">
      <div class='alert' v-if='aactive && !loaded'>
        <div class='alert--header'><span>•</span>{{ aheader}}</div>
        <div class='alert--content'>{{ acontent }}</div>
      </div>
    </transition>

    <transition name="fade">
      <div class='alert alert--link' v-if='readFurther && loaded' @click='main = true'>
        <div class='alert--link--header'>READ FURTHER</div>
        <div class='alert--link--content'>Geocinema’s Framing Territories</div>
        <div class='alert--link--arrow'></div>
      </div>
     </transition>

  </div>
</template>

<script>
import io from 'socket.io-client'
import mapboxgl from 'mapbox-gl'
import isWebGLEnabled from 'is-webgl-enabled'

export default {
  name: 'geocinema',
  data() {
    return {
      loaded: false,
      markers: [],
      map: {},
      satelliteData: [],
      poetry: '',
      main: false,
      aheader: '',
      acontent: '',
      aactive: false,
      city: '',
      temp: '',
      pressure: '',
      news: '',
      introdone: false,
      moons: [],
      readFurther: false,
    }
  },
  mounted() {
    this.moons = [].slice.call(document.querySelectorAll('.moon'))
    this.randomMoon()

    if (isWebGLEnabled) {
      this.$nextTick(() => {
        this.initMap()
      })
    }

    // Get satellite data from middleman server
    // const socket = io('localhost:9090')
    // const socket = io('https://nnnfreeportgeocinema-bxkhnnvboz.now.sh')
    const socket = io('https://nnnfreeportgeocinema-jlwghlnooa.now.sh')
    socket.on('connect', () => {
      console.log('Connected to socket server')
      // Start 'animation' loop
      window.setInterval(this.updateSatelliteMarkers, 1000)
    })

    socket.on('update', satelliteData => {
      console.log('update')
      console.log(satelliteData)
      if (!this.loaded) {
        window.setTimeout(() => {
          // this.loaded = true
        }, 3000)
      }
      this.satelliteData = satelliteData
      // Draw ground tracks
      window.setTimeout(this.drawGroundTracks, 2000)
    })

    socket.on('init', data => {
      console.log('Init received')
      // console.dir(data)

      // Location

      this.aheader = 'Registering Your Location'
      this.acontent = data.geo.city
      this.aactive = true

      window.setTimeout(() => {
        this.aactive = false
      }, 4000)

      // Temperature

      window.setTimeout(() => {
        this.randomMoon()
        this.aheader = 'Feeling your temperature'
        this.acontent = String(Math.round(data.weather.temp - 273.15)) + '°C'
        this.aactive = true
      }, 5000)

      window.setTimeout(() => {
        this.aactive = false
      }, 8000)

      // Turbulence

      window.setTimeout(() => {
        this.randomMoon()
        this.aheader = 'Reading Local Turbulence'
        this.acontent = data.news.webTitle
        this.aactive = true
      }, 9000)

      window.setTimeout(() => {
        this.aactive = false
      }, 12000)

      // Presssure

      window.setTimeout(() => {
        this.randomMoon()
        this.aheader = 'Sensing Pressures in the Air'
        this.acontent = data.weather.pressure + ' hPa'
        this.aactive = true
      }, 13000)

      window.setTimeout(() => {
        this.aactive = false
      }, 16000)

      // References

      window.setTimeout(() => {
        this.randomMoon()
        this.aheader = 'Loading Geocinema’s Reading List'
        this.acontent = '11 References'
        this.aactive = true
      }, 17000)

      window.setTimeout(() => {
        this.introdone = true
        if (this.poetry.length > 0) {
          this.loaded = true
        }
      }, 20000)

      window.setTimeout(() => {
        this.readFurther = true
      }, 23000)
    })

    // Get the text from poetry generator
    this.$http
      // .get("http://3.208.0.37:8888/geo_fortune")
      .get('https://nnnfreeportgeocinemaproxy.now.sh', { timeout: 45000 })
      .then(response => {
        console.log(response)
        // this.poetry = decodeURIComponent(escape(response.body))
        // this.poetry = unescape(encodeURIComponent(response.body))
        this.poetry = response.body
        if (this.introdone) {
          this.loaded = true
        }
      })
      .catch(e => {
        console.log('FELL TROUGH')
        this.main = true
        console.log(e)
      })
  },
  methods: {
    getRandom(min, max, center) {
      if (Math.round(Math.random()) === 1) {
        let loRand = Math.round(Math.random() * (max / 2 - center - min) + min)
        console.log('lo:', loRand)
        return loRand
      } else {
        let hiRand = Math.round(
          Math.random() * (max - (max / 2 - center)) + (max / 2 - center),
        )
        console.log('hi:', hiRand)
        return hiRand
      }
    },
    initMap() {
      mapboxgl.accessToken =
        'pk.eyJ1IjoicHdyc3R1ZGlvIiwiYSI6ImNpbTJmMWYwazAwbXV2a201dHV4M3Q0MTEifQ.haMHeGT4HNA8zI2S0BDgGg'
      this.map = new mapboxgl.Map({
        container: 'orbits',
        // style: 'mapbox://styles/pwrstudio/cjrau64ym2mdf2smsa9jq2sdn',
        style: 'mapbox://styles/pwrstudio/cjraus0n82scs2tq09prlmz3m',
        center: [0, 35],
        zoom: 1.1,
        interactive: false,
      })
    },
    updateSatelliteMarkers() {
      // Get current time as unix timestamp
      var currentTime = Math.round(new Date().getTime() / 1000)

      // Clear old satellite markers
      this.clearMarkers()

      // Draw new satellite markers
      this.satelliteData.forEach(satellite => {
        // Get matching position for current timestamp
        var currentPosition = satellite.positions.find(
          pos => pos.timestamp == currentTime,
        )

        // Fallback
        if (!currentPosition) {
          currentPosition = satellite.positions[299]
        }

        // Scale size depending on altitude
        let altitudeScale =
          (1 / (900 - 300)) * (currentPosition.sataltitude - 900) + 1
        let size = 7 + Math.round(12 * altitudeScale)
        let el = document.createElement('div')
        el.className = 'satellite-marker'
        el.style =
          'background:' +
          satellite.colorCode +
          '; width:' +
          size +
          'px;' +
          '; height:' +
          size +
          'px;' +
          '; border-radius:' +
          size +
          'px;'
        this.markers.push(
          new mapboxgl.Marker(el)
            .setLngLat([
              currentPosition.satlongitude,
              currentPosition.satlatitude,
            ])
            .addTo(this.map),
        )
      })
    },
    clearMarkers() {
      this.markers.forEach(marker => {
        marker.remove()
      })
      this.markers = []
    },
    drawGroundTracks() {
      // console.log('DRAWING PATHS')
      var currentTime = Math.round(new Date().getTime() / 1000)
      this.satelliteData.forEach(satellite => {
        let coordinates = []
        for (let i = 0; i < satellite.positions.length - 1; i++) {
          if (
            satellite.positions[i].satlongitude > 179 ||
            satellite.positions[i].satlongitude < -179
          ) {
            // console.log('breaking:', satellite.positions[i].satlongitude)
            break
          }
          // Push every nth coordinate
          if (i % 5 === 0) {
            coordinates.push([
              satellite.positions[i].satlongitude,
              satellite.positions[i].satlatitude,
            ])
          }
        }

        this.map.addLayer({
          id: satellite.name + '-' + currentTime,
          type: 'line',
          minzoom: 0,
          maxzoom: 24,
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                title: satellite.name,
              },
              geometry: {
                type: 'LineString',
                coordinates: coordinates,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': satellite.colorCode,
            'line-width': 1,
            'line-dasharray': [5, 5],
          },
        })
      })
    },
    randomMoon() {
      this.moons.forEach(moon => {
        let randomX = this.getRandom(100, window.innerWidth - 100, 250)
        let randomY = this.getRandom(100, window.innerHeight - 100, 100)
        moon.style =
          'transform: translateX(' +
          randomX +
          'px) translateY(' +
          randomY +
          'px);'
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";
@import "../../assets/fonts/nhaas.css";

.geocinema {
  height: 100vh;
  width: 100vw;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 60px;
  position: fixed;
  top: 0;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  @include hide-scroll;
  background: black;

  &__poetry {
    margin-top: -80px;
    display: block;
    width: 55ch;
    max-width: 90vw;
    margin-bottom: 60px;
    font-family: "NeueHaasGrotesk", Helvetica, sans-serif;
    color: white;
    text-align: center;

    &--main {
      font-size: 28px;
      font-weight: 100;
      line-height: 1.3em;
      max-width: 100%;

      @include screen-size("small") {
        font-size: 20px;
      }
    }

    &--header {
      font-weight: 400;
      margin-left: auto;
      margin-right: auto;
      max-width: 26ch;
      margin-bottom: 40px;
      font-size: 16px;
    }

  }

  &__loader {
    height: 100%;
    width: 100%;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 60px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    @include hide-scroll;
    background: rgba(206, 202, 200, 0.9);
    z-index: 10;

    opacity: 0;
    pointer-events: all;
    transition: opacity 0.2s ease-out;

    &__cloud {
      position: absolute;
      top: 0;
      left: 0;
    
      &--1 {
        height: 400px;
        animation-name: glide;
        animation-duration: 40s; 
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      &--2 {
        top: 20%;
        animation-name: glide;
        animation-duration: 40s; 
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      
      &--3 {
        height:600px;
        left: 10%;
        top: 40%;
        // height: 200px;
        animation-name: glide;
        animation-duration: 30s; 
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      @keyframes glide {
        from {transform: translateX(100%);}
        to {transform: translateX(-100%);}
      }

    }

    &.active {
      opacity: 1;
      pointer-events: all;
      transition: opacity 0.2s ease-out;
    }

    &__inner {
      width: 40ch;
      max-width: 90vw;
      padding: 10px;
      background: rgba(0,0,0,1);
      color: white;
      font-family: "NeueHaasGrotesk", Helvetica, sans-serif;
      font-weight: 500;
      line-height: 1.3em;
      text-align: center;
      z-index: 100000;

      &__top {
        font-size: 22px;
        max-width: 22ch;
        margin-left: auto;
        margin-right: auto;
      }
      &__image {
        margin-top: 10px;
        // margin-bottom: 10px; 
      }
      &__bottom {
        font-size: 16px;
      }
    }
  }
}

#orbits {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: block;
  z-index: 100;
  background: none;
  pointer-events: none;
  z-index: 1;
}

.alert {
  background: rgba(206, 202, 200, 1);
  width: 300px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-top: 10px;
  box-shadow: 0 0 10px black;
  font-family: "NeueHaasGrotesk", Helvetica, sans-serif;

  &--header {
    font-size: 12px;
    text-transform: uppercase;
    span {
      margin-right: 10px;
    }
  }

  &--content {
    font-size: 24px;
    font-weight: 200;
  }

  &--link {
    background: magenta;
    cursor: pointer;

    &--content {
      font-size: 24px;
      font-weight: 200;
      float: left;
      width: calc(100% - 70px);
    }

    &--header {
      font-size: 12px;
      font-weight: bold;
      float: left;
    }

    &--arrow {
      border-right: 1px solid black;
      border-top: 1px solid black;
      height: 60px;
      width: 60px;
      transform-origin: 50% 50%;
      transform: rotateZ(45deg);
      float: right;
    }
  }
}

.moon {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 80px;
  transition: transform 0.5s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
