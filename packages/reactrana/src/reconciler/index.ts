// import {
//   LaranaComponent,
//   TextComponent,
//   LayoutComponent,
//   BarChartComponent,
//   Style,
// } from "larana-js";

import Reconciler from "react-reconciler";

import { createNode } from "./createNode";

const ReactranaReconciler = Reconciler({
  appendInitialChild(parentInstance: any, child: any) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },

  createInstance(type: any, props: any, internalInstanceHandle: any) {
    return createNode();
  },

  createTextInstance(text: any, rootContainerInstance: any, internalInstanceHandle: any) {
    return text;
  },

  finalizeInitialChildren(wordElement: any, type: any, props: any) {
    return false;
  },

  getPublicInstance(inst: any) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(wordElement: any, type: any, oldProps: any, newProps: any) {
    return true;
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(wordElement: any) {
    // noop
  },

  getRootHostContext(rootInstance: any) {
    // You can use this 'rootInstance' to pass data from the roots.
  },

  getChildHostContext() {
    return {};
  },

  shouldSetTextContent(type: any, props: any) {
    return false;
  },

  now: () => { },

  supportsMutation: true,
});

export const render = (jsx: any, rootNode: any) => {
  const container = ReactranaReconciler.createContainer(rootNode);
  ReactranaReconciler.updateContainer(jsx, container);
};
