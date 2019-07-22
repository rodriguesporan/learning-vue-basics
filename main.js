var app = new Vue({
  el: '#app',
  data: {
    product: {
      name: 'Socks',
      description: 'Beautiful and colored socks',
      image: './assets/vmSocks-green-onWhite.jpg',
      link: 'http://127.0.0.1:5500/index.html',
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: "green"
        },
        {
          variantId: 2235,
          variantColor: "blue"
        },
      ],
      sizes: ['34 - 35', '36 - 41', '42 - 44'],
    }
  }
});
