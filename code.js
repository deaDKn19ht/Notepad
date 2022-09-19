const app = Vue.createApp({
    data() {
        return {
            currentTab: 'AddList',
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
    <button @click="saveNote">Сохранить</button></div>`
})

app.component('tab-notelist', {
    template: `<div class="card-tab"></div>`
})

app.mount('#app')