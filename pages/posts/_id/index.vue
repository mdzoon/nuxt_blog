<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">Last updated on: {{ loadedPost.updatedDate | date }}</div>
        <div class="post-detail">Written by: {{ loadedPost.author }}</div>
      </div>
      <div class="post-thumbnail">
        <img :src="loadedPost.thumbnail" width="100%" height="auto" />
      </div>
      <p class="post-content">{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>Let me know what you think about the post, send a mail to <a href="mailto:feedback@my-awesome-domain.com">feedback@my-awesome-domain.com</a></p>
    </section>
  </div>
</template>

<script>
//import axios from 'axios'

export default {
  asyncData(context) {
    if (context.payload) {
      return {
        loadedPost: context.payload.postData
      }
    }
    return context.app.$axios                                 //this.$axios only on client side 
    .$get('/posts/' + context.params.id + '.json')
    //return axios.get(process.env.baseUrl + '/posts/' + context.params.id + '.json')
    .then(data => {
      return {
        loadedPost: data
      }
    })
    .catch(e => context.error(e))
  },
  head: {
    title: 'A Blog Post'
  }
};
</script>

<style>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-thumbnail {
  width: 100%;
  height: 30vh;
  overflow: hidden;
  border-bottom: 3px solid #ccc;
  border-top: 3px solid #ccc;
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>