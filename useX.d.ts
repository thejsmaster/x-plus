import React, { Component, ReactNode } from "react";
import "./App.css";
export declare const xRefs: any;
export declare const yRefs: any;
export declare const xConfig: {
    enableDebugging: boolean;
    enableConsoleLogging: boolean;
    autoDestructureState: boolean;
};
export declare function getParentState<T, S>(CL: new () => T, Selectors?: new () => S): TReturnVal<T, S> & T;
export declare const getX: typeof getParentState;
export declare const getParentX: typeof getParentState;
export declare const postMessage: (channelName: string, ...props: any) => void;
export declare const dispatch: (label: string, fn: Function, ...props: any) => void;
export declare const useXChannel: (channelName: string, callback?: (...props: any[]) => void) => (...props: any) => void;
export declare const getListenerCount: (ChannelName: string) => number;
export declare function getCallStack(splitIndex?: number): {
    functionName: string;
    fileName: string;
    lineNumber: string;
};
export declare function findDiff(obj1: any, obj2: any, path?: string): Record<string, any>;
export declare function useXOnAction(fnCallback: Function, actions: Function[]): void;
type NonFunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type PropertiesOnly<T> = Pick<Readonly<T>, NonFunctionKeys<T>>;
type DeepReadonly<T> = T extends Function ? T : T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;
type TReturnVal<T, S> = {
    setItem: (key: keyof PropertiesOnly<T>, newVal: any) => void;
    triggerEvent: (xEventobject: {
        name: string;
    }) => void;
    xlog: (title: string, valueToLog: any) => void;
    set: (pathOfObjectToUpdate: string, newVal: any) => void;
    selectors: S;
};
export declare function useX<T extends Object, S extends Object>(CL: new () => T, Selectors?: new () => S): TReturnVal<T, S> & DeepReadonly<T>;
type MethodKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
type MethodsOnly<T> = Pick<T, MethodKeys<T>>;
export declare function buildActions<T>(label: string): {
    methods: MethodsOnly<T>;
};
export declare function setStateX<T>(obj: T, path: string, value: any): T;
export declare const Collapsable: ({ children, label, isUseXState }: any) => import("react/jsx-runtime").JSX.Element;
export declare const ErrorComponent: ({ Error, message }: any) => import("react/jsx-runtime").JSX.Element;
interface ErrorBoundaryProps {
    Error: (error: Error, message: string) => ReactNode;
    children?: any;
}
interface ErrorBoundaryState {
    error: Error | null;
    errorMessage: string;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    componentDidCatch(error: Error): void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export declare const LabelRenderer: ({ label }: any) => import("react/jsx-runtime").JSX.Element;
export declare const StateView: ({ state, boldFont, autoOpenFirstLevel, }: any) => import("react/jsx-runtime").JSX.Element;
export declare const Switch: ({ State }: any) => import("react/jsx-runtime").JSX.Element;
export declare const SwitchY: ({ State }: any) => import("react/jsx-runtime").JSX.Element;
type TXDevToolsProps = {
    XIconPosition?: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    };
    keepOpen: boolean;
    enableConsoleLogging?: boolean;
    hideXPlusIcon?: boolean;
    enableDevTools?: boolean;
    children?: any;
    disableToggleESCKey?: boolean;
};
export declare function XPlusWrapper(props: TXDevToolsProps): import("react/jsx-runtime").JSX.Element;
export declare const Treeview: ({ state, autoOpenFirstLevel }: any) => import("react/jsx-runtime").JSX.Element;
export declare const UseXDevTools: ({ XIconPosition, enableConsoleLogging, keepOpen, hideXPlusIcon, disableToggleESCKey, }: TXDevToolsProps) => import("react/jsx-runtime").JSX.Element;
export declare const ValueRenderer: ({ text }: any) => import("react/jsx-runtime").JSX.Element;
export type RequestParamsType = {
    url: string;
    method: string;
    payload: any;
    qsObj: any;
    headers: Record<string, string>;
};
export declare const XFetchConfig: {
    onBeforeFetch?: (requestParams: RequestParamsType) => void;
};
export declare function xFetch(url?: string, method?: string, payload?: any, qsObj?: any, headers?: {}, signal?: any): Promise<Response>;
export declare const useXFetch: (url?: string, qsObj?: Object | null, method?: string, payload?: any, headers?: {}) => {
    isLoading: boolean;
    data: any;
    error: any;
    status: string;
    call: () => void;
    cancel: () => void;
    callSilently: () => void;
    statusCode: number;
};
type Status = "idle" | "loading" | "success" | "error";
interface AsyncHookResult {
    isLoading: boolean;
    data: any | null;
    error: Error | null;
    status: Status;
    call: (...args: any[]) => Promise<void>;
}
export declare const useXAsync: (asyncFunction: (...args: any[]) => any) => AsyncHookResult;
export declare function hasNonEmptyValue(obj: any): boolean;
type ValidationFunction<T> = (data: T, errors: T) => void;
type YReturnType<T> = {
    logs: any[];
    data: T;
    errors: T;
    set: (path: string, newVal: string) => void;
    setItem: (key: keyof T, newVal: any) => void;
    resetForm: (resetWith?: T) => void;
    setData: (fn: () => void) => void;
    setErrors: (fn: () => void) => void;
    globalError: string;
    setGlobalError: React.Dispatch<React.SetStateAction<string>>;
    validate: () => boolean;
    resetErrors: () => T;
};
export declare function useXForm<T>(CL: new () => T, validateForm: ValidationFunction<T>): YReturnType<T>;
export declare function getY<T>(CL: new () => T): YReturnType<T>;
export declare function useQ<T>(val: T): {
    val: T;
    set: (newVal: T) => void;
    setQ: (pathToObjectToChange: string, newVal: any) => void;
};
export declare function xEvents<T extends string>(arr: T[]): Record<T, {
    name: T;
}>;
export declare function usePagination(initialPage?: number, initialTotalPages?: number, initialItemsPerPage?: number): {
    currentPage: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    next: () => void;
    prev: () => void;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage: number;
    totalPages: number;
    setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
    resetPage: () => void;
};
export declare function hasScrollReachedTheEnd(event: any, reverse?: boolean): boolean;
export declare function deepClone(obj: any): any;
export {};
