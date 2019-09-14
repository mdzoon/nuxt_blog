import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: []
        },
        mustations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        vuexContext.commit('setPosts', [
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
                            }        
                        ])
                        resolve();
                    }, 1500);
                    //reject(new Error())
                })
                .then(data => {
                    context.$store.commit('setPosts', data.loadedPosts)
                })
                .catch(e => {
                    context.error(e);
                });
            },
            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts')
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