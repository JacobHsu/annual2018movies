let app = new Vue({
  el: '#app',
  data: {
    // sections: [
    //     {
    //     bgColor: '#ec407a',
    //     content: 'I am section 1',
    //     img_url: './imgs/bg1.jpg'
    //   },
    //   {
    //     bgColor: '#42a5f5',
    //     content: 'I am section 2',
    //     img_url: './imgs/bg2.jpg'
    //   },
    //   {
    //     bgColor: '#66bb6a',
    //     content: 'I am section 3',
    //     img_url: './imgs/bg3.jpg'
    //   }
    // ],
    sections: [],
    options: {
      // Your custom options here
      duration: 800,
      overlay: false
    }
  },
  mounted() {
    axios.get("data/movies.json")
    .then(response => {this.sections = response.data;})
  }
});
