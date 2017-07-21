<template>
    <section class="catalog__products-holder">
      <div class="catalog__products-scroll jq-scroll">
        <div class="catalog__products">

          <div class="catalog__nav-open js-nav-open">
              <span>Каталог</span>
              <svg><use xlink:href="#filter"></use></svg>
          </div>

        <div class="catalog__products-row js-t-row" v-on:click="getProduct(product.id)" v-for="product in productList">
            <div class="catalog__products-col catalog__products-name">
                <div class="catalog__products-name--img">
                    <a href="#"><img src="pic/products/abrau_brut.png" alt="product"></a>
                </div>
                <span class="catalog__products-name--title"><a href="#">{{product.name}}</a>
                <span class="js-av-clone"></span>
                </span>
            </div>
            <div class="catalog__products-col catalog__products-available"><span class="js-av-catch">Мало в наличии</span></div>
            <div class="catalog__products-col catalog__products-art"><span>Артикул: </span>46798456213456</div>
            <div class="catalog__products-col catalog__products-btn"><a href="#" class="btn btn--reject">Редактировать</a></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import store from '../../store/catalog.js'
  import $     from "jquery"

  export default {
    computed: {
      productList() {
        return this.$store.getters.productList
      }
    },
    methods: {
      getProduct(idProduct) {
        $(event.target).closest('.js-t-row')
          .addClass('active')
          .siblings()
          .removeClass('active')
      },
      deleteProduct(idProduct) {
        console.log(idProduct);
      },
      hoverProduct(idProduct){
        console.log(idProduct);
      }
    },
    created: function() {
    }
  }
</script>
