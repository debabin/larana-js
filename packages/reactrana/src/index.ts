import {
    LaranaApp,
    defineConfig,
    DefaultRouter,
    ServerRenderer,
    MemoryStateManager,
    Page,
    layout
} from 'larana-js'
import { createApp } from './reconciler';
import { ReactranaElement } from './reconciler/createNode';

interface ReactranaReactContext {
    appComponent: any;
    routes: any[];
}

function reactRoutesToLaranaRoutes(ctx: ReactranaReactContext) {
    console.log('@@@', ctx);
    return ctx.routes.map((route) => {
        class ReactranaPage extends Page {
            app = null;

            title() {
                return route.name || 'Larana Unknown Page'
            }

            rerenderTimeout: NodeJS.Timeout | null = null

            state!: {
                rootChild: ReactranaElement
            }

            rerenderWithTimeout() {
                if (!this.rerenderTimeout) {
                  this.rerenderTimeout = setTimeout(() => {
                    console.log('rerender')
                    this.rerender()
                    this.rerenderTimeout = null
                  }, 0)
                }
              }
        
              init() {
                this.state = { 
                    rootChild: {
                      props: {},
                      setProps(props: any) {
                        this.props = props
                      },
          
                      ref: null,
                      refSetter: {
                        set current(newRef: unknown) {},
                        get current() { return null },
                      },
                      parent: null,
                      children: [],
                      id: -1,
                      render() {
                        return this.children.map((child) => child.render())[0]
                      },
                    } as ReactranaElement
                  }

                this.app = this.state.rootChild;

                createApp(route.component, this.state.rootChild);
              } 
        
              root() {
                console.log('@render');
                return this.app?.render() ?? layout({})
              }
            }
        
            return {
              path: route.path,
              name: route.name,
              page: ReactranaPage,
            }
    })
}


export class Reactrana implements LaranaApp {
    private laranaApp: LaranaApp
    private reactContext: ReactranaReactContext
    private config: ReturnType<typeof defineConfig>

    constructor(app: any) {
        this.reactContext = {
            appComponent: app,
            routes: []
        }

        this.config = defineConfig({
            port: 1610,
            defaultTheme: 'dark',
            debug: false
        })
    }

    router(routes: any[]) {
        this.reactContext.routes = routes;
    }

    run() {
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

            router: new DefaultRouter({
                debug: this.config.debug,
                routes: reactRoutesToLaranaRoutes(this.reactContext),
            }),
        })

        console.log('@larana', this.laranaApp.router.routes);
        return this.laranaApp.run()
    }
}

export function createReactrana(app: any) {
    return new Reactrana(app)
}