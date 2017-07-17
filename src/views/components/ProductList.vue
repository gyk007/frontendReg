<template>
  <section class="product_list">
  <ul>
  	<li v-for="product in productList">
          <div  v-on:click="getProductList(cat.id)" v-on:mouseover="hoverProduct(product.id)">{{product.name}}</div>
          <button class='delete_category_button' v-on:click="deleteProduct(product.id)">Удалить</button>
        </li>
  </ul>
  </section>
</template>

<script>
  import store from '../../store/catalog.js'

  export default {
    computed: {
      productList() {
        return this.$store.getters.productList
      }
    },
    methods: {
      getProduct(idProduct) {
        console.log(idProduct);
      },
      deleteProduct(idProduct) {
        console.log(idProduct);
      },
      hoverProduct(idProduct){
        console.log(idProduct);
      }
    },
    created: function() {
      console.log('Product');
    }
  }
</script>
