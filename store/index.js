import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPost(state, post) {      //to process the changes in the store instead of waitng for page reload to refresh data
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
                state.loadedPosts[postIndex] = editedPost
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get('https://nuxt-blog-f0b13.firebaseio.com/posts.json')
                    .then(res => {
                        const postsArray = []
                        for (const key in res.data) {
                            postsArray.push({ ...res.data[key], id: key})
                        }
                        vuexContext.commit('setPosts', postsArray)
                    })
                    .catch(e => context.error(e));
            },
            addPost(vuexContext, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                }
                return axios
                .post('https://nuxt-blog-f0b13.firebaseio.com/posts.json', createdPost)
                .then(result => {
                    vuexContext.commit('addPost', { ...createdPost, id: result.data.name })
                })
                .catch(error => console.log(error));
            },
            editPost(vuexContext, editedPost) {
                return axios
                .put('https://nuxt-blog-f0b13.firebaseio.com/posts/' + editedPost.id + '.json', editedPost)
                .then(res => {
                    vuexContext.commit('editPost', editedPost)
                })
                .catch(error => console.log(error))                
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            }
        }
    })
}

export default createStore