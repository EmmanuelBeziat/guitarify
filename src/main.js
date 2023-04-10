import App from './App.vue'
import { createSSRApp } from 'vue'
import { createRouterApp } from './router'

export const createApp = () => {
	const app = createSSRApp(App)
	const router = createRouterApp()

	app.use(router)

	return { app, router }
}

/* import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
 */
