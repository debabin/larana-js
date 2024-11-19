declare global {
  namespace JSX {
    interface IntrinsicElements {
      layout: any;
      button: {
        text: string;
      }
    }
  }
}

const App = () => <layout><button text='reactlana' /></layout>

export default App