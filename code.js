const app = Vue.createApp({
    data() {
        return {
            currentTab: 'AddNote',
            tabs: ['AddNote', 'NoteList'],  
            posts: []          
        }
    },
    computed: {
        currentTabComponent() {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    },
    watch: {
        posts: {
            handler() {
                localStorage.setItem('posts', JSON.stringify(this.posts))
            },
            deep: true,
        }
    },
    mounted() {
        if(localStorage.getItem('posts'))
        this.posts = JSON.parse(localStorage.getItem('posts'))
    }
})

app.component('tab-addnote', {
    props: ['posts'],
    data() {
        return {
            post: {header: '', note: '', date: '', active: false}
        }
    },
    methods: {
        saveNote() {
            if(this.post.header !== '' || this.post.note !== '') {
                this.posts.push({header: this.post.header, note: this.post.note, date: this.setDate()})
                this.post.header = ''
                this.post.note = ''
            }
        },
        setDate() {
            return new Date(Date.now()).toLocaleString()
        }
    },
    template: `<div class="card__tab"><input type="text" class="addnote__input" v-model="post.header">
    <textarea class="addnote__textarea" v-model="post.note"></textarea>
    <button class="addnote__btn" @click="saveNote">Сохранить</button></div>`
})

app.component('tab-notelist', {
    props: ['posts'],    
    template: `<div class="card__tab"><ul v-for="(post, id) in posts"><li class="notelist__post"><h3>{{post.header}}</h3><p>{{post.date}}</p>
    <button class="post__btn_open" @click="post.active = !post.active">&#9660;</button><button class="post__btn_remove" @click="posts.splice(id,1)">&#10006;</button>
    <p class="post__text" v-show="post.active"><hr>{{post.note}}</p></li></ul></div>`
})

app.mount('#app')