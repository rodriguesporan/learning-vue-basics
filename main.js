Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    }
  },
  template: `<div class="product">
      <div class="product-image">
        <img :src="image" alt="">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>{{ product.description }}</p>
        <a :href="product.link">Buy it now</a>
        <p v-if="inStock">On Stock</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in product.details">{{ detail }}</li>
        </ul>

        <div
          v-for="(variant, index) in product.variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)"
          >
        </div>

        <ul>
          <li v-for="size in product.sizes">
            <span>{{ size }}</span>
          </li>
        </ul>

        <button
          v-on:click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
        >
          Add to Cart
        </button>
        <button @click="rmFromCart">Rm from Cart</button>

        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>

      </div>    
    </div>`,
    data() {
      return  {
        brand: 'Vue Mastery',
        product: {
          name: 'Socks',
          description: 'Beautiful and colored socks',
          link: 'http://127.0.0.1:5500/index.html',
          selectedVariant: 0,
          details: ['80% cotton', '20% polyester', 'Gender neutral'],
          variants: [
            {
              variantId: 2234,
              variantColor: "green",
              variantImage: './assets/vmSocks-green-onWhite.jpg',
              variantQuantity: 10,
            },
            {
              variantId: 2235,
              variantColor: "blue",
              variantImage: './assets/vmSocks-blue-onWhite.jpg',
              variantQuantity: 0,
            },
          ],
          sizes: ['34 - 35', '36 - 41', '42 - 44'],
        },
        cart: null,
      };
    },
    methods: {
      addToCart() {
        this.cart += 1;
      },
      updateProduct(index) {
        this.product.selectedVariant = index;
      },
      rmFromCart() {
        this.cart -= 1;
      }
    },
    computed: {
      title() {
        return `${this.brand} ${this.product.name}`;
      },
      image() {
        const { product } = this;
        const { variants } = product;
        return variants[product.selectedVariant].variantImage;
      },
      inStock() {
        const { product } = this; 
        const { variants } = product;
        return variants[product.selectedVariant].variantQuantity > 0;
      },
      shipping() {
        if (this.premium) {
          return 'free';
        } else {
          return 2.99;
        }
      }
    }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
  }
});
