import React, { Component, ReactNode } from "react";
import "./App.css";
export declare const xRefs: any;
export declare const xConfig: {
    enableDebugging: boolean;
    enableConsoleLogging: boolean;
    autoDestructureState: boolean;
};
export declare const listeners: any;
export declare function getParentState<T>(CL: new () => T): {
    state: T;
    set: Function;
};
export declare function getCallStack(splitIndex?: number): {
    functionName: string;
    fileName: string;
    lineNumber: string;
};
export declare function findDiff(obj1: any, obj2: any, path?: string): Record<string, any>;
export declare function useX<T extends Object>(CL: new () => T, label?: any): {
    state: T;
    set: Function;
    stateChanged: number;
    onSet: Function;
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
};
export declare function XPlusWrapper(props: TXDevToolsProps): import("react/jsx-runtime").JSX.Element;
export declare const Treeview: ({ state, autoOpenFirstLevel }: any) => import("react/jsx-runtime").JSX.Element;
export declare const UseXDevTools: ({ XIconPosition, enableConsoleLogging, hideXPlusIcon, }: TXDevToolsProps) => import("react/jsx-runtime").JSX.Element;
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
export declare function xFetch(url?: string, method?: string, payload?: null, qsObj?: any, headers?: {}, signal?: any): Promise<any>;
export declare const useXFetch: (url?: string, qsObj?: Object | null, method?: string, payload?: any, headers?: {}) => {
    isLoading: boolean;
    data: any;
    error: any;
    status: string;
    call: () => void;
    cancel: () => void;
    callSilently: () => void;
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
export declare function useQ<T>(val: T): {
    val: T;
    set: (newVal_Or_Fn: Function | any) => void;
};
type ParamsToObject<T extends string[]> = {
    [K in T[number]]: number;
};
export declare function XEvents<T extends string[]>(...eventNames: T): ParamsToObject<T>;
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
export declare function paginateArray<T>(array: T[], currentPage: number, itemsPerPage: number): T[];
export declare function deepClone(obj: any): any;
export {};
//# sourceMappingURL=useX.d.ts.map