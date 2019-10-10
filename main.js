Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock </p>
        <p v-else>Out of Stock</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart</button>
        <div class="cart">
          <p>Cart: {{ cart }}</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Changing Images',
      brand: 'Testing:',
      //image: 'assets/criativity.png', (replaced for the next line)
      selectedVariant: 0,
      // inStock: true, (replaced by inStock() method)
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [{
        variantId: 2234,
        variantColor: "Orange",
        variantImage: 'assets/criativity.png',
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: "Red",
        variantImage: 'assets/food.jpg',
        variantQuantity: 0
      }],
      cart: 0
    }
  },
  methods: {
    addToCart: function () {
      this.cart += 1
    },
    updateProduct(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    //we can use directly title() or title: function () {}
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
  },
})
