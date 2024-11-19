import {
  BaseComponent,
  button,
  text,
  layout
} from "larana-js";

import ReactReconciler from "react-reconciler";
import { ReactranaElement } from "./createNode";

let id = 0

const tagsList = {
  button,
  layout,
  text
} as const;

const reactranaReconciler = ReactReconciler({
  supportsMutation: true,

  appendChildToContainer(container: ReactranaElement, child: ReactranaElement) {
    console.log('@appendChildToContainer');
    child.parent = container
    container.children.push(child);
  },

	appendInitialChild(parentInstance: ReactranaElement, child: ReactranaElement) {
    console.log('@appendInitialChild');
    parentInstance.children.push(child);
    child.parent = parentInstance;
	},
  
  clearContainer() {
    console.log('@clearContainer');
    return null;
  },

	createInstance(tag: string, props: any) {
    console.log('@createInstance')
    const lower = tag.toLowerCase() as keyof typeof tagsList
    const laranaComponent = tagsList[lower]

    const laranaRender = {
      [tag]: () => {
        const props = { ...element.props }

        if (element.children && element.children.length > 0) {
          props.children = element.children.map((child) => child.render()).filter(Boolean)
        }
  
        // console.log('@props', props);
        return laranaComponent(props);
      }
    }[tag]

    const element: ReactranaElement = {
      id: id++,
      parent: null,
      render: () => laranaRender(),
  
      style: null,
      props: { ...props },
      setProps(newProps: Record<string, unknown>) {
        element.props = newProps
      },
  
      children: [],
  
      ref: null as unknown,
      refSetter: {
        set current(newRef) {
          element.ref = newRef
        },
        get current() {
          return element.ref
        }
      }
    }
    return element;
	},

	createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    console.log('@createTextInstance');
    return {
      id: id++,
      payload: text,
      parent: null,
      render() {
        return this.payload as string
      }
    }
	},

	finalizeInitialChildren(wordElement, type, props) {
    console.log('@finalizeInitialChildren');
		return false;
	},

	getPublicInstance(inst) {
    console.log('@getPublicInstance');
		return inst;
	},

	prepareForCommit() {
    console.log('@prepareForCommit');
		// noop
    return {}
	},

	prepareUpdate(wordElement, type, oldProps, newProps) {
    console.log('@prepareUpdate', type, oldProps, newProps);
		return newProps;
	},

	resetAfterCommit() {
    console.log('@resetAfterCommit');
		// noop
	},

	resetTextContent(wordElement) {
    console.log('@resetTextContent');
		// noop
	},

	getRootHostContext(instance) {
    console.log('@getRootHostContext');
		return instance;
	},

	getChildHostContext(instance) {
    console.log('@getChildHostContext');
		return {};
	},

	shouldSetTextContent(type, props) {
    console.log('@shouldSetTextContent');
		return false;
	},

	now: () => {},
});

export const createApp = (element: any, root: any) => {
  const container = reactranaReconciler.createContainer(root, false, false);
  reactranaReconciler.updateContainer(element, container, null, null);
  return container;
};
