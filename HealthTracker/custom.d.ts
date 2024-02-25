declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module 'react-native-floating-bubble' {
  export function showFloatingBubble(): void;
  export function hideFloatingBubble(): Promise<string>;
  export function requestPermission(): Promise<string>;
  export function initialize(): Promise<string>;
  export function checkPermission(): Promise<string>;
}
declare module 'react-native-circular-action-menu' {
  import {Component} from 'react';

  export interface ActionButtonItemProps {
    angle?: number;
    radius?: number;
    buttonColor?: string;
    onPress?: CallableFunction;
    children: React.ReactNode;
    startDegree?: number;
    endDegree?: number;
  }

  export class Item extends Component<ActionButtonItemProps> {}

  export interface ActionButtonProps {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    buttonColor?: string;
  }

  export default class ActionButton extends Component<ActionButtonProps> {
    static Item: typeof Item;
  }
}
