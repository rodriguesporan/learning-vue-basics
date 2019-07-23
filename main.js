var app = new Vue({
  el: '#app',
  data: {
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
  }
});
