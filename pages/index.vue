<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <PostsList :posts="loadedPosts" />   
  </div>
</template>

<script>

export default {
  asyncData(context, callback) {  //use Promise instead: return new Promise()
    setTimeout(() => {
      callback(null, {
        loadedPosts: [
          { 
            id: '1',
            title: 'First Post',
            previewText: 'This is my awesome first post!',
            thumbnail: 'https://images.unsplash.com/photo-1510746001195-0db09655b6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80'
          },
          { 
            id: '2',
            title: 'Second Post',
            previewText: 'Hello there second time!',
            thumbnail: 'https://images.pexels.com/photos/1432794/pexels-photo-1432794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          },
          { 
            id: '3',
            title: 'Third Post',
            previewText: 'Hello there third time!',
            thumbnail: 'https://images.pexels.com/photos/1449082/pexels-photo-1449082.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
          },        
        ]
      });  
    }, 1500);
  },
  // data() {    //asyncData can merge with data component if needed
  //   return {
  //     loadedPosts: []
  //   }
  // }
}
</script>

<style>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/main-page-background.jpg');
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
