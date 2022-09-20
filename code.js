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
    template: `<div class="card-tab"><input type="text" v-model="post.header">
    <textarea v-model="post.note"></textarea>
    <button @click="saveNote">&#10004;</button></div>`
})

app.component('tab-notelist', {
    props: ['posts'],
    template: `<div class="card-tab" v-for="(post, it) in posts"><h3>{{post.header}}</h3><p>{{post.date}}</p>
    <button @click="post.active = !post.active">&#9660;</button><button @click="posts.splice(id,1)">&#10006;</button>
    <p v-show="post.active">{{post.note}}</p></div>`
})

app.mount('#app')