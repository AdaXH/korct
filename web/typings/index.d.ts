declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

type RefCallback<T> = { bivarianceHack(instance: T | null): void }['bivarianceHack'];

type Ref<T> = RefCallback<T> | RefObject<T> | null;

interface BasicRef extends RefAttributes {
  current: {
    [x?]: any;
    getValue?: Function;
  };
}

interface HistoryLocation {
  pathname?: string;
}

interface History {
  listen: any;
  readonly length: number;
  scrollRestoration: ScrollRestoration;
  readonly state: any;
  back(): void;
  forward(): void;
  go(delta?: number): void;
  pushState(data: any, title: string, url?: string | null): void;
  replaceState(data: any, title: string, url?: string | null): void;
  location: HistoryLocation;
  push?: any;
}

type CommonObj = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x?: string]: any;
};
