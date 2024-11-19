import { createReactrana } from "@larana/reactrana"

import App from "./app.tsx"

// console.log('@', larana);
const app = createReactrana(App)
app.router([ { name: 'home', path: '/', component: <App /> }])
app.run()
