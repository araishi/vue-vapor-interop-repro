import { createSSRApp, vaporInteropPlugin } from 'vue'
import App from './App.vue'

createSSRApp(App).use(vaporInteropPlugin).mount('#app')
