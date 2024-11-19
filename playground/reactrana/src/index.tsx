declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            layout: any;
            button: {
                text: string;
                onClick: () => void;
            }
        }
    }
}

import { createReactrana } from "@larana/reactrana"

import App from "./app.tsx"

const app = createReactrana(App)
app.router([ { name: 'home', path: '/', component: <App /> }])
app.run()
