<template>
  <div class="geocinema">
    <div class="geocinema__loader" :class="{ active: !loaded }">
      <div class="geocinema__loader__inner">
        More than thirty earth-orbiting satellite missions are currently writing
        your future parameters
        <br />. . .<br />
        please wait.
      </div>
    </div>

    <div id="orbits" />

    <div class="geocinema__poetry">{{ poetry }}</div>
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
    }
  },
  mounted() {
    if (isWebGLEnabled) {
      this.$nextTick(() => {
        this.initMap()
      })
    }

    // Get satellite data from middleman server
    // const socket = io('http://localhost:9090')
    const socket = io('https://nnnfreeportgeocinema-ygvmchcgdq.now.sh')
    socket.on('connect', () => {
      console.log('Connected to socket server')
      // Start 'animation' loop
      window.setInterval(this.updateSatelliteMarkers, 1000)
    })
    socket.on('update', satelliteData => {
      if (!this.loaded) {
        window.setTimeout(() => {
          this.loaded = true
        }, 3000)
      }
      this.satelliteData = satelliteData
      // Draw ground tracks
      window.setTimeout(this.drawGroundTracks, 2000)
    })

    // Get the text from poetry generator
    this.$http
      // .get("http://3.208.0.37:8888/geo_fortune")
      .get('https://nnnfreeportgeocinemaproxy.now.sh')
      .then(response => {
        console.log(response)
        // this.poetry = decodeURIComponent(escape(response.body))
        // this.poetry = unescape(encodeURIComponent(response.body))
        this.poetry = response.body
      })
      .catch(e => console.log(e))
  },
  methods: {
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
  justify-content: center;
  align-items: center;
  @include hide-scroll;

  &__poetry {
    display: block;
    width: 40ch;
    max-width: 90vw;
    margin-bottom: 60px;
    font-family: "NeueHaasGrotesk", Helvetica, sans-serif;
    font-weight: 100;
    font-size: 38px;
    line-height: 1.3em;
    color: white;
    text-align: center;
    @include screen-size("small") {
      font-size: 32px;
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
    background: rgba(0, 0, 0, 0.9);
    z-index: 10;

    opacity: 0;
    pointer-events: all;
    transition: opacity 0.2s ease-out;

    &.active {
      opacity: 1;
      pointer-events: all;
      transition: opacity 0.2s ease-out;
    }

    &__inner {
      width: 40ch;
      max-width: 90vw;
      padding: 10px;
      background: #e2e0df;
      font-family: "NeueHaasGrotesk", Helvetica, sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.3em;
      text-align: center;
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
</style>
