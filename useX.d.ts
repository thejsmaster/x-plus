import { Component, ReactNode } from "react";
import "./App.css";
export declare const xRefs: any;
export declare const xConfig: {
    enableDebugging: boolean;
    enableConsoleLogging: boolean;
    autoDestructureState: boolean;
};
export declare function getParentState<T>(CL: new () => T): {
    state: T;
    set: Function;
    plus: Function;
    saveCopy: Function;
    resetState: Function;
    stateChanged: number;
    actions: MethodsOnly<T>;
    dispatch: Function;
    triggerEvent: Function;
    xlog: Function;
};
export declare const getX: typeof getParentState;
export declare const postMessage: (channelName: string, ...props: any) => void;
export declare const useXChannel: (channelName: string, callback?: ((...props: any[]) => void) | undefined) => (...props: any) => void;
export declare const getListenerCount: (ChannelName: string) => number;
export declare function getCallStack(splitIndex?: number): {
    functionName: string;
    fileName: string;
    lineNumber: string;
};
export declare function findDiff(obj1: any, obj2: any, path?: string): Record<string, any>;
export declare function useXAction(fnCallback: Function, actions: Function[]): void;
export declare function useX<T extends Object>(CL: new () => T, label?: any): {
    state: T;
    set: Function;
    actions: MethodsOnly<T>;
    stateChanged: number;
    plus: Function;
    saveCopy: Function;
    resetState: Function;
    dispatch: Function;
    triggerEvent: Function;
    xlog: Function;
};
type MethodKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
type MethodsOnly<T> = Pick<T, MethodKeys<T>>;
export declare function buildActions<T>(classInstance: new () => T): {
    methods: MethodsOnly<T>;
};
export declare const Collapsable: ({ children, label }: any) => import("react/jsx-runtime").JSX.Element;
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
type TXDevToolsProps = {
    XIconPosition?: {
        left?: string;
        right?: string;
        top?: string;
        bottom?: string;
    };
    enableConsoleLogging?: boolean;
    hideXPlusIcon?: boolean;
    enableDevTools?: boolean;
    children?: any;
    disableToggleESCKey?: boolean;
};
export declare function XPlusWrapper(props: TXDevToolsProps): import("react/jsx-runtime").JSX.Element;
export declare const Treeview: ({ state, autoOpenFirstLevel }: any) => import("react/jsx-runtime").JSX.Element;
export declare const UseXDevTools: ({ XIconPosition, enableConsoleLogging, hideXPlusIcon, disableToggleESCKey, }: TXDevToolsProps) => import("react/jsx-runtime").JSX.Element;
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
export declare function xFetch(url?: string, method?: string, payload?: null, qsObj?: any, headers?: {}, signal?: any): Promise<Response>;
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
export declare function useXForm<T>(Obj: T, validateForm: Function): {
    data: T;
    errors: T;
    resetForm: (resetWith?: any) => void;
    setData: (fn: Function) => void;
    setErrors: (fn: Function) => void;
    validate: () => boolean;
    resetErrors: () => any;
};
export declare function useP<T>(val: T): {
    val: T;
    set: (newVal_Or_Fn: Function | any) => void;
};
export declare function xEvents<T extends string>(arr: T[]): Record<T, {
    name: T;
}>;
export declare function usePagination(initialPage?: number, initialTotalPages?: number, initialItemsPerPage?: number): {
    currentPage: number;
    setPage: import("react").Dispatch<import("react").SetStateAction<number>>;
    next: () => void;
    prev: () => void;
    setTotalPages: import("react").Dispatch<import("react").SetStateAction<number>>;
    itemsPerPage: number;
    totalPages: number;
    setItemsPerPage: import("react").Dispatch<import("react").SetStateAction<number>>;
    resetPage: () => void;
};
export declare function hasScrollReachedTheEnd(event: any, reverse?: boolean): boolean;
export declare function paginateArray<T>(array: T[], currentPage: number, itemsPerPage: number): T[];
export declare function deepClone(obj: any): any;
interface UseList<T> {
    addItem: (item: T, index?: number) => void;
    updateItem: (item: T, index?: number) => void;
    removeItem: (index: number) => void;
    list: T[];
}
export declare function useArray<T>(initialList?: T[]): UseList<T>;
export declare function useString(initialValue?: string): {
    val: string;
    setVal: import("react").Dispatch<import("react").SetStateAction<string>>;
    isEmpty: () => boolean;
    isNull: () => boolean;
    isUndefined: () => boolean;
    toInt: () => number;
    toFloat: (precision?: number) => string;
    isNaN: typeof isNaN;
    toIntOrZero: () => number;
    toFloatOrZero: (precision?: number) => string;
};
export declare function useFloat(initialValue?: number, precision?: number): {
    val: string;
    sum: (value: any) => void;
    subtract: (value: any) => void;
    multiply: (value: any) => void;
    divide: (value: any) => void;
    setVal: (newValue: any) => void;
    toInt: () => number;
    toIntFloor: () => number;
    toIntCeil: () => number;
    toIntRound: () => number;
};
export declare function xInt(num: number): {
    sum: (other: number) => number;
    subtract: (other: number) => number;
    multiply: (other: number) => number;
};
export declare function xFloat(num: number, precision?: number): {
    sum: (other: number) => number;
    subtract: (other: number) => number;
    multiply: (other: number) => number;
};
interface UseObject<T> {
    setItem: (key: string, value: T) => void;
    getItem: (key: string) => T | undefined;
    removeItem: (key: string) => void;
    hasKey: (key: string) => boolean;
    object: Record<string, T>;
    keys: string[];
}
export declare function useObject<T>(initialObject?: Record<string, T>): UseObject<T>;
export default useObject;
//# sourceMappingURL=useX.d.ts.map