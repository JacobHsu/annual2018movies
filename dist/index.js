let apikey = '4e1e08f0';
let api = function(title) {
    switch(title) {
        case "More Than Blue":
            return 'https://www.omdbapi.com/?'+'apikey='+apikey+'&t=' + title + '&y=2018&type=movie&tomatoes=true';
            break;     
        default:
            //https://www.omdbapi.com/?apikey=4e1e08f0&t=
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
  created() {
    axios.get("data/movies.json")
    .then(response => {

      let thatSections = this.sections;
      let thatList = this.lists;

      let omdbapi = [];
      let sub_omdbapi = [];
      let movies = [];
      response.data.forEach(function(movie,id) {
        let movieApi = api(movie.title);
        omdbapi.push(axios.get(movieApi));
        
        movies.push(movie);

        sub_omdbapi.push([]);
        movie.list.forEach(function(shortlist, key) {
          sub_omdbapi[id].push(axios.get( api(shortlist)));
        });
      });


      axios.all(omdbapi).then(axios.spread((...res)=>{
        res.forEach(function(resOmdb, id) {
          movies[id]['imdb'] = resOmdb.data.imdbRating;
          movies[id]['tomatoRating'] = !resOmdb.data.Ratings[1] ? '' : resOmdb.data.Ratings[1].Value;
          
          //thatSections.splice(id, 0, movie_tmps[id]);
          thatSections.push(movies[id]);

          thatList.push([]);
          
          axios.all(sub_omdbapi[id]).then(axios.spread((...sub_res)=>{
            //console.log("======>"+id, movies[id],sub_res);
            sub_res.forEach(function(sub_resOmdb, key) {
              //console.warn(sub_resOmdb.data.Title); //Poster
              thatList[id].push({poster:sub_resOmdb.data.Poster,title:sub_resOmdb.data.Title});
            });

          }));
        });
      }));


    })
  }
});
