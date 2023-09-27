"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.paginateArray = exports.hasScrollReachedTheEnd = exports.usePagination = exports.XEvents = exports.useQ = exports.useXForm = exports.hasNonEmptyValue = exports.useXAsync = exports.useXFetch = exports.xFetch = exports.XFetchConfig = exports.ValueRenderer = exports.UseXDevTools = exports.Treeview = exports.XPlusWrapper = exports.Switch = exports.StateView = exports.LabelRenderer = exports.ErrorBoundary = exports.ErrorComponent = exports.Collapsable = exports.useX = exports.findDiff = exports.getCallStack = exports.getParentState = exports.listeners = exports.xConfig = exports.xRefs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./App.css");
exports.xRefs = {};
exports.xConfig = {
    enableDebugging: false,
    enableConsoleLogging: false,
    autoDestructureState: false,
};
exports.listeners = {
    onStateChange: null,
};
function getParentState(CL) {
    //
    const item = exports.xRefs[CL.name];
    return { state: item.state, set: item.renderer };
}
exports.getParentState = getParentState;
let tempCallStack = [];
function call(fn, state) {
    if (tempCallStack.indexOf(fn) === -1) {
        tempCallStack.push(fn);
        setTimeout(() => {
            fn.call(state);
            tempCallStack = tempCallStack.filter((item) => item !== fn);
        }, 0);
    }
}
function getCallStack(splitIndex = 3) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const stack = new Error().stack;
    const stackLines = ((_b = (_a = stack === null || stack === void 0 ? void 0 : stack.split("\n")[splitIndex]) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split("(")) || [];
    const functionName = (stackLines === null || stackLines === void 0 ? void 0 : stackLines.length) > 1
        ? (_c = stackLines === null || stackLines === void 0 ? void 0 : stackLines[0]) === null || _c === void 0 ? void 0 : _c.split(" ")[1].trim()
        : "Anonymous";
    const fileNameLineNumber = stackLines === null || stackLines === void 0 ? void 0 : stackLines[(stackLines === null || stackLines === void 0 ? void 0 : stackLines.length) > 1 ? 1 : 0];
    const fileNames = (_e = (_d = fileNameLineNumber === null || fileNameLineNumber === void 0 ? void 0 : fileNameLineNumber.split("?")) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.split("/");
    const fileName = fileNames === null || fileNames === void 0 ? void 0 : fileNames[(fileNames === null || fileNames === void 0 ? void 0 : fileNames.length) - 1];
    const lineNumber = (_h = (_g = (_f = fileNameLineNumber === null || fileNameLineNumber === void 0 ? void 0 : fileNameLineNumber.split("?")) === null || _f === void 0 ? void 0 : _f[1]) === null || _g === void 0 ? void 0 : _g.split(":")) === null || _h === void 0 ? void 0 : _h[1];
    return {
        functionName,
        fileName,
        lineNumber,
    };
}
exports.getCallStack = getCallStack;
function findDiff(obj1, obj2, path = "") {
    const changes = {};
    if (typeof obj1 === "object" &&
        obj1 !== null &&
        typeof obj2 === "object" &&
        obj2 !== null) {
        for (const key in obj1) {
            const newPath = path ? `${path}.${key}` : key;
            if (obj2.hasOwnProperty(key)) {
                const nestedChanges = findDiff(obj1[key], obj2[key], newPath);
                Object.assign(changes, nestedChanges);
            }
            else {
                changes[`${newPath} [D]`] = undefined;
            }
        }
        for (const key in obj2) {
            const newPath = path ? `${path}.${key}` : key;
            if (!obj1.hasOwnProperty(key)) {
                changes[`${newPath} [A]`] = obj2[key];
            }
        }
    }
    else if (obj1 !== obj2) {
        changes[`${path} [M]`] = obj2;
    }
    return changes;
}
exports.findDiff = findDiff;
// export let actions: any = [];
// called actions
// function extractSubstring(inputString: string) {
//   const lastIndex = inputString.lastIndexOf(" [");
//   if (lastIndex !== -1) {
//     return inputString.slice(0, lastIndex);
//   }
//   return inputString;
// }
function useX(CL, label) {
    const [count, setCount] = (0, react_1.useState)(0);
    if (!label) {
        label = CL.name;
    }
    const intiate = () => {
        if (!exports.xRefs[label]) {
            const state = new CL();
            exports.xRefs[label] = {
                state,
                label,
                setLogs: [],
                actionLogs: [],
                index: 0,
                // copy:
                //   state && typeof state === "object"
                //     ? //@ts-ignore
                //       deepClone(state)
                //     : {},
            };
            //@ts-ignore
            state && state.onChange && state.onChange();
        }
    };
    const setAgain = () => {
        if (!exports.xRefs[label]) {
            intiate();
        }
        exports.xRefs[label].renderer = (fn, ...props) => {
            const copy = deepClone(exports.xRefs[label].state);
            let errorOccured = false;
            let errorMessage = "";
            try {
                if (typeof fn === "function") {
                    fn.apply(exports.xRefs[label].state, props);
                    exports.xRefs[label].onSet && exports.xRefs[label].onSet(fn);
                    // actions.push(fn);
                    // xRefs[label].state = { ...xRefs[label].state };
                }
            }
            catch (e) {
                console.error(e);
                errorOccured = true;
                errorMessage = e === null || e === void 0 ? void 0 : e.message;
            }
            if (typeof fn !== "function") {
                throw new Error("set is called and no action is passed");
            }
            let { fileName, functionName, lineNumber } = getCallStack();
            let fname = fileName.split("/")[fileName.split("/").length - 1];
            const updateSet = () => {
                var _a;
                console.time();
                if (exports.xConfig.autoDestructureState || exports.xConfig.enableDebugging) {
                    let changeList = {};
                    if (copy) {
                        changeList = findDiff(copy, exports.xRefs[label].state);
                        if (changeList && Object.keys(changeList).length > 0) {
                            [...Object.keys(changeList)].forEach((key) => {
                                changeList["state." + key] = changeList[key];
                                delete changeList[key];
                            });
                        }
                    }
                    Object.keys(changeList).forEach((path) => {
                        updateNestedObject(exports.xRefs[label].state, path
                            .split(".")
                            .slice(1, path.split(".").length - 1)
                            .join("."));
                    });
                    if (exports.xConfig.enableDebugging) {
                        const log = {
                            fileName: fname.split("?")[0],
                            functionName,
                            lineNumber,
                            changeList,
                            props,
                            index: exports.xRefs[label].index + 1,
                            name: fn.name || "",
                            errorOccured,
                            errorMessage,
                        };
                        exports.xConfig.enableConsoleLogging &&
                            console.log("useX - " + log.name, log);
                        exports.xConfig.enableConsoleLogging &&
                            console.log("useX - updated state", (_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.state);
                        exports.xRefs[label].setLogs.unshift(log);
                        exports.xRefs[label].index++;
                        exports.xRefs[label].setLogs.length > 10 && exports.xRefs[label].setLogs.pop();
                    }
                }
                console.timeEnd();
            };
            if (exports.xRefs[label].state.onChange) {
                call(exports.xRefs[label].state.onChange, exports.xRefs[label].state);
                updateSet();
                window.setTimeout(() => {
                    exports.xRefs[label].state = destructureWithProto(exports.xRefs[label].state);
                    setCount(count + 1);
                    (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
                }, 0);
            }
            else {
                updateSet();
                setCount(count + 1);
                exports.xRefs[label].state = destructureWithProto(exports.xRefs[label].state);
                (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
            }
        };
    };
    setAgain();
    (0, react_1.useEffect)(() => {
        setAgain();
        return () => {
            delete exports.xRefs[label];
            (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
        };
    }, []);
    return {
        state: exports.xRefs[label].state,
        set: exports.xRefs[label].renderer,
        stateChanged: count,
        onSet: (fn) => {
            if (typeof fn === "function")
                exports.xRefs[label].onSet = fn;
        },
        // trigger(fn: Function) {
        //   if (typeof fn === "function") {
        //     setCount(count + 1);
        //     return fn();
        //   }
        // },
    };
}
exports.useX = useX;
// export const onAction = (actionsList: any) => {
//   return actionsList.find((item: any) => actions.find(item));
// };
// export const useXEffect = (fn: Function, isActionCalled: boolean) => {
//   if (isActionCalled) {
//     fn();
//   }
// };
// export const useXMemo = (fn: Function, isActionCalled: boolean) => {
//   let returnVal = null;
//   const [state, setState] = useState("not yet called!!!__");
//   if (isActionCalled || state === "not yet called!!!__") {
//     returnVal = fn();
//     setState(returnVal);
//   }
//   return returnVal || state;
// };
function destructureWithProto(obj) {
    const result = Object.assign({}, obj);
    const prototype = Object.getPrototypeOf(obj);
    if (prototype) {
        const prototypeProps = Object.getOwnPropertyNames(prototype);
        for (const prop of prototypeProps) {
            result[prop] = prototype[prop];
        }
    }
    return result;
}
function updateNestedObject(obj, path) {
    const keys = path.split(".");
    const newObj = obj;
    let current = newObj;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        current[key] = Array.isArray(current[key])
            ? [...current[key]]
            : Object.assign({}, current[key]);
        current = current[key];
    }
    return newObj;
}
const Collapsable = ({ children, label }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return exports.xRefs[label] ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    padding: "12px 15px",
                    borderTop: "1px solid rgb(232 238 231)",
                    borderLeft: !open ? "2px solid #CCC" : "2px solid rgb(2, 137, 101)",
                    borderImage: "initial",
                    background: "rgb(243 243 243)",
                    cursor: "pointer",
                    fontWeight: !open ? "normal" : 700,
                    color: "rgb(92 92 92)",
                    textAlign: "left",
                    overflow: "auto",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000002,
                }, onMouseDown: () => setOpen(!open), children: [(0, jsx_runtime_1.jsx)("span", { style: {
                            display: "inline-block",
                            paddingLeft: "5px",
                            fontSize: "16px",
                        }, children: (0, jsx_runtime_1.jsx)("b", { children: label }) }), " ", !open && ((0, jsx_runtime_1.jsx)("b", { style: { float: "right", color: "green", fontSize: "small" }, children: exports.xRefs[label].index > 0 ? exports.xRefs[label].index : "" }))] }, label), open && ((0, jsx_runtime_1.jsx)("div", { style: {
                    padding: "10px 30px",
                    background: "rgb(250 250 250)",
                    fontSize: "14px",
                    paddingBottom: "45px",
                }, children: children }))] })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
};
exports.Collapsable = Collapsable;
const ErrorComponent = ({ Error, message }) => {
    console.error(Error);
    return ((0, jsx_runtime_1.jsxs)("span", { title: (Error === null || Error === void 0 ? void 0 : Error.stack) || "", style: { color: "red" }, children: [message, " check console for details"] }));
};
exports.ErrorComponent = ErrorComponent;
class ErrorBoundary extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorMessage: "",
        };
    }
    componentDidCatch(error) {
        this.setState({
            error,
            errorMessage: error.message,
        });
    }
    render() {
        const { error, errorMessage } = this.state;
        const { Error } = this.props;
        if (error) {
            return (0, jsx_runtime_1.jsx)(Error, { error: error, message: errorMessage });
        }
        return this.props && this.props.children ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: this.props.children })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Error" }));
    }
}
exports.ErrorBoundary = ErrorBoundary;
const LabelRenderer = ({ label }) => {
    return ((0, jsx_runtime_1.jsx)("span", { children: label.endsWith("[M]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Modified", style: { color: "#bc7a00" }, children: [label.substr(0, label.length - 3), " "] })) : label.endsWith("[A]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Added", style: { color: "green" }, children: [label.substr(0, label.length - 3), " "] })) : label.endsWith("[D]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Deleted", style: { color: "#df0000" }, children: [label.substr(0, label.length - 3), " "] })) : ((0, jsx_runtime_1.jsx)("span", { children: label })) }));
};
exports.LabelRenderer = LabelRenderer;
const StateView = ({ state, boldFont = true, autoOpenFirstLevel = false, }) => {
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)("div", { style: { marginLeft: "-30px" }, children: (0, jsx_runtime_1.jsx)(exports.Treeview, { autoOpenFirstLevel: autoOpenFirstLevel, state: state, boldFont: boldFont }) }) }));
};
exports.StateView = StateView;
const Switch = ({ State }) => {
    var _a, _b, _c;
    const [selectedTab, setSelectedTab] = (0, react_1.useState)(0);
    const tabs = ["State", "Set Logs", "memos", "events"];
    const [count, setCount] = (0, react_1.useState)(0);
    const spanStyle = (isSelected) => {
        return {
            border: " 1px solid #DDD",
            color: isSelected ? "white" : "#444",
            padding: "3px 10px",
            marginRight: "7px",
            borderRadius: "7px",
            background: isSelected ? "rgb(2 137 101)" : "none",
            display: "inline-block",
            verticalAlign: "top",
            width: "auto",
            textAlign: "center",
            cursor: "pointer",
        };
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "left" }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    paddingBottom: "5px",
                    width: "100%",
                    margin: "0 auto",
                    marginBottom: "10px",
                    textAlign: "left",
                }, children: tabs.map((item, i) => ((0, jsx_runtime_1.jsxs)("span", { onMouseDown: () => setSelectedTab(i), 
                    //@ts-ignore
                    style: spanStyle(selectedTab === i), children: [item, " ", i === 1 && (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: State.index })] }))) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 0 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: State.state }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 1 ? "block" : "none" }, children: [State.setLogs.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)("span", { style: { textDecoration: "underline", cursor: "pointer" }, onClick: () => {
                                State.setLogs = [];
                                State.index = 0;
                                setCount(count + 1);
                            }, children: (0, jsx_runtime_1.jsx)("i", { children: "Clear Logs" }) }) })), (_a = State.setLogs) === null || _a === void 0 ? void 0 : _a.map((log, index) => {
                        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                borderBottom: "1px solid #CCC",
                                marginBottom: "5px",
                                paddingBottom: "5px",
                                position: "relative",
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                        display: "inline-block",
                                        verticalAlign: "top",
                                    }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { autoOpenFirstLevel: false, state: {
                                            [log.name]: {
                                                changes: log.changeList,
                                                props: log.props,
                                                "Triggered by": log.functionName,
                                                from: log.fileName,
                                                status: log.errorOccured
                                                    ? "Error!" + log.errorMessage
                                                    : "Success",
                                            },
                                        } || {} }) }), (0, jsx_runtime_1.jsx)("div", { style: {
                                        position: "absolute",
                                        textAlign: "center",
                                        marginTop: "10px",
                                        right: "5px",
                                        top: "-3px",
                                    }, children: log.index }), (0, jsx_runtime_1.jsx)("div", { title: log.errorOccured
                                        ? "check console for error deails"
                                        : "Success", style: {
                                        position: "absolute",
                                        textAlign: "center",
                                        marginTop: "10px",
                                        right: "30px",
                                        top: "3px",
                                        borderRadius: "30px",
                                        width: "10px",
                                        height: "10px",
                                        background: log.errorOccured ? "red" : "green",
                                    } })] }, " set " + index + log.name));
                    })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "10px" } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 2 ? "block" : "none" }, children: [(0, jsx_runtime_1.jsx)(exports.StateView, { state: ((_b = State.state) === null || _b === void 0 ? void 0 : _b.memos) || {}, autoOpenFirstLevel: true }), " "] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 3 ? "block" : "none" }, children: [(0, jsx_runtime_1.jsx)(exports.StateView, { state: ((_c = State.state) === null || _c === void 0 ? void 0 : _c.events) || {}, autoOpenFirstLevel: true }), " "] })] }));
};
exports.Switch = Switch;
function XPlusWrapper(props) {
    const { enableDevTools = true } = props;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: props.children && props.children }), enableDevTools && ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.UseXDevTools, Object.assign({}, props)) }))] }));
}
exports.XPlusWrapper = XPlusWrapper;
const Treeview = ({ state, autoOpenFirstLevel = false }) => {
    const [openList, setOpen] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setOpen(autoOpenFirstLevel && typeof state === "object" ? Object.keys(state) : []);
    }, []);
    const toggleOpen = (key) => {
        if (openList.includes(key)) {
            setOpen(openList.filter((item) => item !== key));
        }
        else {
            setOpen([...openList, key]);
        }
    };
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                paddingLeft: "25px",
                textAlign: "left",
                paddingBottom: "2px",
                minWidth: "300px",
                height: "auto",
                transition: "height 0.3s ease",
                color: "rgb(92 92 92)",
            }, children: [" ", Object.keys(state).length === 0 && ((0, jsx_runtime_1.jsxs)("i", { style: { color: "#999" }, children: [Array.isArray(state) ? "Array " : "Object ", " is Empty"] })), Object.keys(state)
                    .filter((key) => typeof state[key] !== "function")
                    .map((item) => {
                    return typeof state[item] === "object" && state[item] !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "x-devtools-treview-header", style: {
                                    cursor: "pointer",
                                    marginTop: "003px",
                                    paddingBottom: "5px",
                                    paddingLeft: "4px",
                                }, onMouseDown: () => toggleOpen(item), children: [" ", (0, jsx_runtime_1.jsxs)("b", { children: [(0, jsx_runtime_1.jsx)("span", { style: { display: "inline-block", paddingTop: "5px" }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", height: "13", viewBox: "0 -960 960 960", width: "24", style: {
                                                        transform: !openList.includes(item)
                                                            ? "rotate(-32deg)"
                                                            : "rotate(60deg)",
                                                        transition: "transform ease 0.2s",
                                                        marginRight: "0px",
                                                        fill: "#444",
                                                    }, children: (0, jsx_runtime_1.jsx)("path", { d: "m80-160 400-640 400 640H80Z" }) }) }), (0, jsx_runtime_1.jsx)(exports.LabelRenderer, { label: item }), " "] }), ":", " ", Array.isArray(state[item]) ? ((0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsx)("i", { title: "Array", children: state[item].length > 0 ? " [..]" : " []" }) })) : ((0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsx)("i", { title: "Object", children: Object.keys(state[item]).length > 0 ? " {..}" : " {}" }) }))] }), openList.includes(item) &&
                                state[item] &&
                                typeof state[item] === "object" && ((0, jsx_runtime_1.jsx)(exports.Treeview, { state: state[item] }))] })) : ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: "3px", width: "auto" }, children: [(0, jsx_runtime_1.jsxs)("b", { style: { marginLeft: "10px" }, children: [(0, jsx_runtime_1.jsx)(exports.LabelRenderer, { label: item }), " "] }), ": ", (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: state[item] })] }));
                })] }) }));
};
exports.Treeview = Treeview;
const UseXDevTools = ({ XIconPosition = { bottom: "50px", right: "50px" }, enableConsoleLogging = false, hideXPlusIcon = false, }) => {
    const [showTools, setShowTools] = (0, react_1.useState)(false);
    const [count, setCount] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        function handleKeyPress(event) {
            if (event.key === "Escape") {
                setShowTools(!showTools);
            }
        }
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [showTools, setShowTools]);
    (0, react_1.useEffect)(() => {
        exports.listeners.onStateChange = () => {
            setTimeout(() => setCount(count + 1), 50);
        };
        return () => {
            exports.listeners.onStateChange = null;
        };
    }, [setCount, count]);
    exports.xConfig.enableDebugging = true;
    exports.xConfig.enableConsoleLogging = enableConsoleLogging;
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)("div", { id: "xplus-devtools-container", children: [" ", (0, jsx_runtime_1.jsxs)("div", { id: "usex-devtools", style: {
                        zIndex: 1000000000,
                        height: "100%",
                        width: "400px",
                        position: "fixed",
                        // background: "rgb(250,250,250)",
                        background: "rgb(250, 250, 250)",
                        transition: "right 0.2s ",
                        top: 0,
                        right: showTools ? "0px" : "-400px",
                        color: "#444",
                        overflow: "auto",
                        boxShadow: " 0 0 4px 0px #b0d9d5",
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                textAlign: "center",
                                background: "rgb(250, 250, 250)",
                                borderLeft: "1px solid #CCC",
                                padding: "10px",
                            }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: "bold", fontSize: "18px" }, children: "x-plus Dev Tools" }) }), (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: Object.keys(exports.xRefs).map((key) => {
                                const stateValue = exports.xRefs[key];
                                return stateValue ? ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(exports.Collapsable, { label: key, state: stateValue, children: (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.Switch, { State: stateValue }) }) }) }, key)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
                            }) }), Object.keys(exports.xRefs).length === 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", marginTop: "10px" }, children: [" ", (0, jsx_runtime_1.jsx)("i", { children: "No States are created using useX" })] }))] }), !hideXPlusIcon && ((0, jsx_runtime_1.jsx)("div", { onMouseDown: () => {
                        setShowTools(!showTools);
                    }, id: "usex-devtools-holder", style: Object.assign({ zIndex: 1000000001, width: "50px", height: "50px", 
                        //background: "#E74C3C",
                        background: "green", borderRadius: "50px", position: "fixed", boxShadow: "0px 0px 10px 1px #CCC", cursor: "pointer" }, XIconPosition), children: (0, jsx_runtime_1.jsxs)("span", { style: {
                            left: "14px",
                            position: "absolute",
                            top: "3px",
                            fontFamily: '"Comic Sans MS", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: "bold",
                            fontSize: "25px",
                            color: "white",
                            fontStyle: "italic",
                        }, children: ["x", (0, jsx_runtime_1.jsx)("span", { style: {
                                    display: "inline-block",
                                    marginTop: "6px",
                                    fontSize: "20px",
                                    verticalAlign: "top",
                                }, children: "+" })] }) }))] }) }));
};
exports.UseXDevTools = UseXDevTools;
const ValueRenderer = ({ text }) => {
    const [highlighted, setHighlighted] = (0, react_1.useState)(false);
    const [firstRender, setFirstRender] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (!firstRender) {
            setHighlighted(true);
            const timer = setTimeout(() => {
                setHighlighted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
        else {
            setFirstRender(false);
        }
    }, [text]);
    const highlightStyle = highlighted
        ? {
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            transition: "background-color 0s",
        }
        : {
            backgroundColor: "rgba(0, 255, 0, 0)",
            transition: "background-color 2s",
        };
    return ((0, jsx_runtime_1.jsx)("span", { title: text + "", style: Object.assign(Object.assign({}, highlightStyle), { padding: "0px 5px", borderRadius: "4px" }), children: text === null ? ("null") : text === undefined ? ("undefined") : typeof text === "function" ? ((0, jsx_runtime_1.jsx)("b", { children: "Function" })) : text === "" ? ((0, jsx_runtime_1.jsx)("i", { children: "''" })) : typeof text === "string" ? (`'${text}'`) : ((text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : "")) }));
};
exports.ValueRenderer = ValueRenderer;
exports.XFetchConfig = {
    onBeforeFetch: undefined,
};
function xFetch(url = "/", method = "get", payload = null, qsObj = {}, headers = {}, signal = null) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create query string from qsObj
        const options = {
            url,
            method,
            headers: Object.assign({ "Content-Type": "application/json" }, headers),
            qsObj,
            payload,
        };
        exports.XFetchConfig.onBeforeFetch && (yield exports.XFetchConfig.onBeforeFetch(options));
        // if (payload) options.body = JSON.stringify(payload);
        if (options.qsObj) {
            const queryString = Object.keys(options.qsObj)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(options.qsObj[key])}`)
                .join("&");
            url += `?${queryString}`;
        }
        try {
            const response = yield fetch(url, {
                headers: options.headers || {},
                body: options.payload ? JSON.stringify(options.payload) : undefined,
                method: options.method,
                signal,
            });
            const data = yield response.json();
            if (response.ok) {
                return data; // Resolve with the data if the API call is successful
            }
            else {
                throw new Error(data.message || "An error occurred while making the API call");
            }
        }
        catch (error) {
            throw error; // Reject with the error if there's an issue with the API call
        }
    });
}
exports.xFetch = xFetch;
const useXFetch = (url = "/", qsObj = {}, method = "get", payload = null, headers = {}) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [data, setData] = (0, react_1.useState)(null);
    const [status, setStatus] = (0, react_1.useState)("");
    const [count, setCount] = (0, react_1.useState)(0);
    const [loadSilently, setLoadSilently] = (0, react_1.useState)(false);
    const [controller, setController] = (0, react_1.useState)(null);
    const cancel = () => {
        if (controller && controller.abort())
            setStatus("cancelled");
        setController(null);
    };
    (0, react_1.useEffect)(() => {
        if (count > 0) {
            if (controller) {
                cancel();
                setCount(count + 1);
            }
            else {
                !loadSilently && setIsLoading(true);
                setError(null);
                setData(null);
                setStatus("loading");
                const controller = new AbortController();
                setController(controller);
                xFetch(url, method, payload, qsObj, headers, controller.signal)
                    .then((data) => {
                    setData(data);
                    setStatus("success");
                    setError(null);
                })
                    .catch((error) => {
                    if (error.name !== "AbortError") {
                        setError(error);
                        setStatus("error");
                    }
                })
                    .finally(() => {
                    setController(null);
                    setIsLoading(false);
                    setLoadSilently(false);
                });
            }
        }
    }, [count]);
    (0, react_1.useEffect)(() => {
        return () => {
            cancel();
        };
    }, []);
    const call = () => {
        setCount(count + 1);
    };
    const callSilently = () => {
        setCount(count + 1);
        setLoadSilently(true);
    };
    return { isLoading, data, error, status, call, cancel, callSilently };
};
exports.useXFetch = useXFetch;
const useXAsync = (asyncFunction) => {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [status, setStatus] = (0, react_1.useState)("idle");
    const call = (...args) => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        setStatus("loading");
        setError(null);
        try {
            const result = yield asyncFunction(...args);
            setData(result);
            setError(null);
            setStatus("success");
        }
        catch (err) {
            if ((err === null || err === void 0 ? void 0 : err.name) !== "AbortError") {
                setError(err);
                setData(null);
                setStatus("error");
            }
        }
        finally {
            setIsLoading(false);
        }
    });
    return {
        isLoading,
        data,
        error,
        status,
        call,
    };
};
exports.useXAsync = useXAsync;
function hasNonEmptyValue(obj) {
    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== undefined) {
            if (typeof obj[key] === "string" && obj[key].trim() !== "") {
                return true;
            }
            else if (typeof obj[key] === "object" && hasNonEmptyValue(obj[key])) {
                return true;
            }
        }
    }
    return false;
}
exports.hasNonEmptyValue = hasNonEmptyValue;
function useXForm(Obj, validateForm) {
    const [data, setD] = (0, react_1.useState)(Obj);
    const [showValidations, setShowValidations] = (0, react_1.useState)(false);
    const resetErrors = () => {
        return resetPrimitiveValues(deepClone(data));
    };
    const [errors, setE] = (0, react_1.useState)(resetErrors());
    const [count, setCount] = (0, react_1.useState)(0);
    const setData = (fn) => {
        typeof fn === "function" && fn();
        resetErrors();
        showValidations && validateForm(data, errors);
        if (hasNonEmptyValue(errors)) {
        }
        else {
            setShowValidations(false);
        }
        setCount(count + 1);
        //@ts-ignore
        setD(Array.isArray(data) ? [...data] : Object.assign({}, data));
    };
    const setErrors = (fn) => {
        typeof fn === "function" && fn();
        setCount(count + 1);
        setE(errors);
    };
    return {
        data,
        errors,
        resetForm: (resetWith = Obj) => {
            setD(resetWith);
            setTimeout(() => resetErrors(), 100);
        },
        setData,
        // showErrors: showValidations,
        // setShowErros: setShowValidations,
        setErrors,
        validate: () => {
            validateForm(data, errors);
            setShowValidations(true);
            setCount(count + 1);
            if (hasNonEmptyValue(errors)) {
                return false;
            }
            else {
                return true;
            }
        },
        resetErrors,
    };
}
exports.useXForm = useXForm;
function resetPrimitiveValues(obj) {
    // Base case: if obj is not an object, return an empty string
    if (typeof obj !== "object" || obj === null) {
        return "";
    }
    // Recursive case: obj is an object, so we iterate over its properties
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            // Reset primitive values to an empty string
            if (typeof obj[key] !== "object" || obj[key] === null) {
                obj[key] = "";
            }
            else {
                // Recursively reset values in nested objects
                obj[key] = resetPrimitiveValues(obj[key]);
            }
        }
    }
    return obj;
}
// quick state
function useQ(val) {
    const setState = (val) => {
        if (typeof val === "function") {
            val();
            set(Object.assign({}, state));
        }
        else {
            set(Object.assign(Object.assign({}, state), { val }));
        }
    };
    const [state, set] = (0, react_1.useState)({
        val,
        set: setState,
    });
    state.set = setState;
    return state;
}
exports.useQ = useQ;
function XEvents(...eventNames) {
    const events = eventNames.reduce((a, b) => {
        // let temp = {
        //   name: b,
        //   trigger() {
        //     a[b] = { ...temp };
        //   },
        // };
        a[b] = 0;
        return a;
    }, {});
    return events;
}
exports.XEvents = XEvents;
// export function triggerEvent() {}
// export function useXEvent<T extends string[]>(
//   ...eventNames: T
// ): ParamsToObject<T> {
//   const [events] = useState<Partial<ParamsToObject<T>>>(
//     eventNames.reduce((a: any, b) => {
//       a[b] = 0;
//       return a;
//     }, {})
//   );
//   return events as ParamsToObject<T>;
//   //   trigger(eventName: T) {
//   //     setEvents({
//   //       ...events,
//   //       [eventName as string]: events[eventName as string]++,
//   //     });
//   //     setCount(count + 1);
//   //   },
//   //   count,
//   // };
// }
// export type TXEvent = {
//   [key: string]: IXEvent;
// };
// export const useXEffect = (fn: () => void, eventsArray: any) => {
//   useEffect(
//     fn,
//     eventsArray.map((event) => xRefs[])
//   );
// };
// export const useXMemo = (fn: () => void, eventsArray:any) => {
//   return useMemo(
//     fn,
//     eventsArray.map((event) => event.count)
//   );
// };
function usePagination(initialPage = 1, initialTotalPages = -1, initialItemsPerPage = 10) {
    const [currentPage, setPage] = (0, react_1.useState)(initialPage);
    const [totalPages, setTotalPages] = (0, react_1.useState)(initialTotalPages);
    const [itemsPerPage, setItemsPerPage] = (0, react_1.useState)(initialItemsPerPage);
    const next = () => {
        setPage((prevPage) => prevPage + 1);
    };
    const prev = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    const resetPage = () => {
        setPage(1);
        setTotalPages(-1);
    };
    return {
        currentPage,
        setPage,
        next,
        prev,
        setTotalPages,
        itemsPerPage,
        totalPages,
        setItemsPerPage,
        resetPage,
    };
}
exports.usePagination = usePagination;
function hasScrollReachedTheEnd(event, reverse = false) {
    if (event.target === document) {
        // Document scroll
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        if (reverse) {
            return scrollY === 0;
        }
        else {
            return scrollY + windowHeight >= documentHeight;
        }
    }
    else if (event.target instanceof HTMLElement) {
        // Element scroll
        const element = event.target;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;
        if (reverse) {
            return scrollTop === 0;
        }
        else {
            return scrollTop + clientHeight >= scrollHeight;
        }
    }
    else {
        // Window scroll
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = window.innerHeight;
        if (reverse) {
            return scrollTop === 0;
        }
        else {
            return scrollTop + clientHeight >= scrollHeight;
        }
    }
}
exports.hasScrollReachedTheEnd = hasScrollReachedTheEnd;
function paginateArray(array, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
}
exports.paginateArray = paginateArray;
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item));
    }
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = deepClone(obj[key]);
        return acc;
    }, {});
}
exports.deepClone = deepClone;
