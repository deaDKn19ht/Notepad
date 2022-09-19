const app = Vue.createApp({
    data() {
        return {
            currentTab: 'AddList',
            tabs: ['AddList', 'List'],            
        }
    },
    computed: {
        currentTabComponent() {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    }
})

app.component('tab-addlist', {
    template: `<div class="card-tab"></div>`
})

app.component('tab-list', {
    template: `<div class="card-tab"></div>`
})

app.mount('#app')