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
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div class="color-box"
            v-for="(variant, index) in variants"
            :key="variant.variantId"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>
        <div>
        <button @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Add to Cart
        </button>
        <button class="danger"
                @click="removeFromCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock}">Remove from Cart
        </button>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Tradicional and Strong',
      brand: 'Coffee:',
      //image: 'assets/criativity.png', (replaced for the next line)
      selectedVariant: 0,
      // inStock: true, (replaced by inStock() method)
      details: ["80% arabica", "20% dark", "french blend"],
      variants: [{
        variantId: 2234,
        variantColor: "Orange",
        variantImage: 'assets/coffee3.png',
        variantQuantity: 10
      },
      {
        variantId: 2235,
        variantColor: "Red",
        variantImage: 'assets/coffee2.png',
        variantQuantity: 5
      }],
      cart: 0
    }
  },
  methods: {
    addToCart: function () {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart: function () {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
    shipping() {
      if (this.premium) {
        return "Free"
      } else {
        return "$" + 3.99
      }
    },
  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    //remove last item from cart
    removeFromCart(id) {
      var arr = this.cart.indexOf(id)
      this.cart.splice(arr, 1)
    }
  }
})
