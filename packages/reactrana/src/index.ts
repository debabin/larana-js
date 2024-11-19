import {
    LaranaApp,
    createConfig,
    ServerRenderer,
    MemoryStateManager
} from 'larana-js'

export { render } from './reconciler';

export class Reactrana implements LaranaApp {
    private laranaApp: LaranaApp
    private config: ReturnType<typeof createConfig>

    constructor(app: any) {
        this.config = createConfig({
            debug: true,
            port: 3000,
            wsPath: 'ws://localhost:3000/',
            maxFPS: 60,
            maxBandwidth: 10 * 1024, // 10 kb TODO
            sessionLifetime: 5 * (60 * 1000), // 5 minutes
            storePreviousRender: true,
        })
    }


    mount() {
        this.laranaApp = new LaranaApp({
            config: this.config,

            renderer: new ServerRenderer({
                debug: this.config.debug,
                DRM: false,
                maxFPS: this.config.maxFPS,
            }),

            stateManager: new MemoryStateManager({
                debug: this.config.debug,
            }),

            // router: new DefaultRouter({
            //     debug: this.config.debug,
            //     routes: vueRoutesToLaranaRoutes(this.vueContext),
            // }),
        })

        return this.laranaApp.run()
    }
}

export function createReactrana(app: any) {
    return new Reactrana(app)
}