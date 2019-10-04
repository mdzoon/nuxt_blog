import Vuex from 'vuex'
// import axios from 'axios' - no need for import if installed axios module

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
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
            },
            setToken(state, token){
                state.token = token
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios                            // or return axios - if installed as dependency
                .$get('/posts.json')                                  //or .get('https://nuxt-blog-f0b13.firebaseio.com/posts.json') if no axios module and env. settings
                .then(data => {
                    const postsArray = []
                    for (const key in data) {
                        postsArray.push({ ...data[key], id: key})
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
                return this$.axios
                .$post('https://nuxt-blog-f0b13.firebaseio.com/posts.json?auth=' + vuexContext.state.token, createdPost)
                .then(result => {
                    vuexContext.commit('addPost', { ...createdPost, id: data.name })
                })
                .catch(error => console.log(error));
            },
            editPost(vuexContext, editedPost) {
                return this.$axios
                .$put('https://nuxt-blog-f0b13.firebaseio.com/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
                .then(res => {
                    vuexContext.commit('editPost', editedPost)
                })
                .catch(error => console.log(error))                
            },
            authenticateUser(vuexContext, authData) {
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
                if (!authData.isLogin) {
                  authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
                }
                return this.$axios.$post(authUrl, {
                  email: authData.email,
                  password: authData.password,
                  returnSecureToken: true
                }
                ).then(result => {
                  vuexContext.commit('setToken', result.idToken);
                })
                .catch(error => {
                  console.log(error)
                });   
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore