import {  LaranaComponent } from 'larana-js'

export interface ReactranaNode {
    id: number
    parent: null | ReactranaElement
    render: () => LaranaComponent | string | null | undefined
    payload?: unknown
  }
  
export interface ReactranaElement extends ReactranaNode {
    props: Record<string, unknown>
    setProps: (props: Record<string, unknown>) => void
  
    style: Record<string, unknown> | null
  
    children: ReactranaNode[]
  
    ref: unknown
    refSetter: {
      set current(newRef: unknown);
      get current(): unknown;
    }
  }

export const createNode = () => null;