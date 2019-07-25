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
      </div>

      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>
      <product-review @review-submited="addReview"></product-review>

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
              variantQuantity: 50,
            },
          ],
          sizes: ['34 - 35', '36 - 41', '42 - 44'],
        },
        reviews: [],
      };
    },
    methods: {
      addToCart() {
        const { product } = this;
        const { variants } = product;
        this.$emit('add-to-cart', variants[product.selectedVariant].variantId);
      },
      updateProduct(index) {
        this.product.selectedVariant = index;
      },
      addReview(productReview) {
        this.reviews.push(productReview);
      },
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>

      <p>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" v-model="name">
      </p>
      <p>
        <label for="review">Review</label>
        <textarea name="review" id="review" cols="30" rows="10" v-model="review"></textarea>
      </p>
      <p>
        <label for="rating">Rating</label>
        <select name="rating" id="rating" v-model.number="rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        this.$emit('review-submited', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push('Name required.');
        if (!this.review) this.errors.push('Review required.');
        if (!this.rating) this.errors.push('Rating required.');
      }
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
  }
});
