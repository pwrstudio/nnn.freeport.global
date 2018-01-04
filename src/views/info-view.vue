<template>
  <div class='info'>
    <div class='info__main-text'>
      <svg id="Layer_1"
           data-name="Layer 1"
           xmlns="http://www.w3.org/2000/svg"
           width="808.5204"
           height="378.3499"
           viewBox="0 0 808.5204 378.3499">
        <polygon class="cls-1"
                 points="755.212 85.751 656.642 296.394 654.888 38.804 571.964 0 433.284 296.394 431.53 38.804 348.606 0 209.926 296.394 208.173 38.804 125.248 0 0 267.653 54.049 292.946 157.989 70.827 157.705 341.451 236.556 378.35 381.347 70.827 381.063 341.451 459.914 378.35 604.705 70.827 604.42 341.451 683.272 378.35 808.52 110.696 755.212 85.751" />
      </svg>
      <p>NNN.FREEPORT.GLOBAL</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae ipsum ultricies, fermentum felis vitae, sollicitudin nibh. Nulla convallis ornare ipsum ac tristique. Suspendisse tristique semper ipsum ut consequat. Aenean ac turpis sapien. Morbi vestibulum, enim in elementum tristique, velit mauris pretium erat, et blandit neque ex ac nibh. Morbi malesuada vehicula eleifend. Mauris ultrices tempor quam vitae commodo. Pellentesque purus lectus, mollis sit amet semper in, tincidunt et odio. Pellentesque nec ligula urna. Integer sit amet ultricies leo, at efficitur felis. Aliquam mattis egestas ipsum in rutrum. Cras id tortor eget eros commodo pharetra eu id felis. Integer tempus lorem sed pharetra gravida.
      </p>
      <p>Donec diam sem, aliquet in turpis quis, vulputate ornare leo. Quisque eleifend viverra eros, tincidunt sagittis diam fringilla nec. Fusce rutrum elementum ex ac vehicula. Aliquam eget interdum nibh, id sodales velit. Maecenas efficitur dolor ac gravida vestibulum. Praesent sagittis erat est, eget scelerisque nisl lobortis vitae. Curabitur tristique quis turpis eu dictum. Vestibulum quis elementum urna. Quisque placerat ullamcorper mattis. Duis commodo efficitur augue in feugiat. Nunc elementum velit dui, in ultricies nibh imperdiet ac. Aenean vel nisi lectus. Duis vel pellentesque sem. Fusce gravida arcu vitae tincidunt sagittis.
      </p>
      <p>Sed et fermentum lectus. Curabitur volutpat, turpis vitae imperdiet rutrum, nibh nisi consequat purus, vel consectetur justo massa quis odio. Vivamus pellentesque mauris sed libero scelerisque, non vestibulum elit dictum. Mauris id massa nisi. Suspendisse potenti. Aenean in finibus purus. Curabitur at pharetra metus. Ut ac consequat quam, eget dapibus elit. Vestibulum pharetra egestas tellus, id rutrum sapien viverra eu. Integer cursus ornare ligula, nec porttitor leo bibendum id. Praesent a justo ac est scelerisque tincidunt. Maecenas a dui lacus. Vivamus id consectetur tellus, ac congue turpis. Maecenas auctor augue quis lorem luctus ullamcorper. Vestibulum venenatis at sapien sed convallis.
      </p>
      <p>Ut ligula velit, varius id pellentesque vel, condimentum a justo. Curabitur laoreet, erat id ultricies hendrerit, ex orci lacinia dolor, vel interdum ipsum quam ac tortor. Sed consequat, purus nec dapibus interdum, enim nisl molestie lorem, quis ultricies sapien libero sed velit. Suspendisse efficitur velit nisl, non ornare magna dapibus nec. Integer eu lorem bibendum, luctus turpis eget, mattis magna. Pellentesque vitae dui in nulla aliquam dignissim ut sed velit. Etiam aliquam quam at mi rutrum commodo. Ut dui sem, tempus eu lobortis in, pharetra a ipsum. Donec vitae condimentum tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur felis tellus, consequat ut tempor id, ullamcorper vestibulum leo. Curabitur vel diam nibh. Donec congue est orci, sed gravida eros blandit sit amet. Nunc quis rhoncus turpis. Quisque consectetur, libero interdum finibus semper, nunc sapien hendrerit nulla, non elementum metus magna sed libero. Vestibulum dictum sem eu dui luctus, eu hendrerit purus posuere.
      </p>
      <p>Nulla in elementum metus, a ornare tortor. Mauris ornare quam non erat volutpat, sed luctus nulla elementum. Nunc et laoreet neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent at maximus neque. Maecenas ut ex ut lacus bibendum dapibus sit amet quis neque. Donec et maximus eros. Nam a pretium velit. Nam nunc augue, finibus sed viverra sit amet, posuere et ex.
      </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'infoView',
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.info {
  display: flex;
  flex-wrap: wrap;
  &__main-text {
    color: white;
    font-size: 24px;
    line-height: 24px;
    margin-left: auto;
    margin-right: auto;
    width: 70ch;
    @include screen-size('small') {
      width: 90vw;
      font-size: 18px;
      line-height: 20px;
    }
  }
}

svg {
  width: 300px;
}
.cls-1 {
  fill: #fff;
}
</style>
