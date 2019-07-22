var app = new Vue({
  el: '#app',
  data: {
    product: {
      name: 'Socks',
      description: 'Beautiful and colored socks',
      link: 'http://127.0.0.1:5500/index.html',
      image: './assets/vmSocks-green-onWhite.jpg',
      inStock: true,
      details: ['80% cotton', '20% polyester', 'Gender neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: './assets/vmSocks-green-onWhite.jpg',
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
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
    updateProduct(variantImage) {
      this.product.image = variantImage;
    },
    rmFromCart() {
      this.cart -= 1;
    }
  }
});
