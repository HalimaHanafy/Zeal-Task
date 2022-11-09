import * as reactNavigationNative from '@react-navigation/native';

declare module '@react-navigation/native' {
    export * from reactNavigationNative;

    export type INavigationProps = NavigationProp<Record<string, object | undefined>, string, Readonly<{
        key: string;
        index: number;
        routeNames: string[];
        history?: unknown[] | undefined;
        routes: NavigationRoute<Record<string, object | undefined>, string>[];
        type: string;
        stale: false;
    }>, {}, {}>;

    export type ThemeColor = string;

    export declare type ThemeColors = {
        primary: string;
        background: string;
        card: string;
        text: string;
        textSecondary: string;
        textGray: string;
        blueColor: string;
        redColor: string;
        purbleColor: string;
        border: string;
        midWhite: string;
        notification: string;
    }
    export declare type Theme = {
        dark: boolean;
        colors: ThemeColors;
    };
}
