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
