let apikey = '4e1e08f0';
let api = function(title) {
    switch(title) {     
        default:
            return 'https://www.omdbapi.com/?'+'apikey='+apikey+'&t=' + title + '&type=movie&tomatoes=true';
    }
}


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
    lists: [],
    options: {
      // Your custom options here
      duration: 800,
      overlay: false
    }
  },
  mounted() {
    axios.get("data/movies.json")
    .then(response => {

      let thatSections = this.sections;
      let thatList = this.lists;
      response.data.forEach(function(movie, id) {
          let movieApi = api(movie.title);
          axios.get(movieApi)
          .then(omdbapi => {
            movie['imdb'] = omdbapi.data.imdbRating;
            movie['tomatoRating'] = !omdbapi.data.Ratings[1] ? '' : omdbapi.data.Ratings[1].Value;
            thatSections.splice(id, 0, movie);
          });
 
          let movieList = [];
          movie.list.forEach(function(shortlist, key) {
            console.log(shortlist, key);
            axios.get( api(shortlist) )
            .then(omdbapi => {
              movieList.push(omdbapi.data.Poster);
              thatList[id] = movieList;
            });
          });

      });


    })
  }
});
