
declare module 'react-native-i18n' {
  const I18n : {
    defaultLocale: string,
    fallbacks: boolean,
    translations: any;
    t(scope: string, options?: {
      defaultValue?: string,
    }) : string;
  };
  export default I18n;
}

declare module 'react-native-root-toast' {
  class Toast {
    static durations: {
      LONG: number;
      SHORT: number;
    };
    static positions: {
      TOP: number;
      MIDDLE: number;
      BOTTOM: number;
    };
    hide(): void;

    static show(message: string, option?: {
      duration?: number;
      visible?: boolean;
      position?: number;
      animation?: boolean;
      shadow?: boolean;
      backgroundColor?: string | null;
      shadowColor?: string | null;
      textColor?: string | null;
      delay: number;
      hideOnPress: boolean;
      onShow?: () => void;
      onShown?: () => void;
      onHide?: () => void;
      onHidden?: () => void;
    }): Toast;
  }
  export default Toast;
}

declare module 'react-native-exception-handler' {
  export type ExceptionHandler = (e: Error, isFatal: boolean) => void;
  export function setJSExceptionHandler(handler: ExceptionHandler): void;
  export function getJSExceptionHandler() : ExceptionHandler;
}
