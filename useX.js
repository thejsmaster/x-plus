"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueRenderer = exports.UseXDevTools = exports.Treeview = exports.UseXWrapper = exports.Switch = exports.StateView = exports.LabelRenderer = exports.ErrorBoundary = exports.ErrorComponent = exports.Collapsable = exports.useX = exports.findDiff = exports.getCallStack = exports.getParentState = exports.listeners = exports.xConfig = exports.xRefs = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./App.css");
exports.xRefs = {};
exports.xConfig = {
    enableDebugging: false,
    enableConsoleLogging: false,
};
exports.listeners = {
    onStateChange: null,
};
function getParentState(CL) {
    var item = exports.xRefs[CL.name];
    return [item.state, item.renderer];
}
exports.getParentState = getParentState;
var tempCallStack = [];
function call(fn, state) {
    if (tempCallStack.indexOf(fn) === -1) {
        tempCallStack.push(fn);
        setTimeout(function () {
            fn.call(state);
            tempCallStack = tempCallStack.filter(function (item) { return item !== fn; });
        }, 0);
    }
}
function getCallStack(splitIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (splitIndex === void 0) { splitIndex = 3; }
    var stack = new Error().stack;
    var stackLines = ((_b = (_a = stack === null || stack === void 0 ? void 0 : stack.split("\n")[splitIndex]) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.split("(")) || [];
    var functionName = (stackLines === null || stackLines === void 0 ? void 0 : stackLines.length) > 1
        ? (_c = stackLines === null || stackLines === void 0 ? void 0 : stackLines[0]) === null || _c === void 0 ? void 0 : _c.split(" ")[1].trim()
        : "Anonymous";
    var fileNameLineNumber = stackLines === null || stackLines === void 0 ? void 0 : stackLines[(stackLines === null || stackLines === void 0 ? void 0 : stackLines.length) > 1 ? 1 : 0];
    var fileNames = (_e = (_d = fileNameLineNumber === null || fileNameLineNumber === void 0 ? void 0 : fileNameLineNumber.split("?")) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.split("/");
    var fileName = fileNames === null || fileNames === void 0 ? void 0 : fileNames[(fileNames === null || fileNames === void 0 ? void 0 : fileNames.length) - 1];
    var lineNumber = (_h = (_g = (_f = fileNameLineNumber === null || fileNameLineNumber === void 0 ? void 0 : fileNameLineNumber.split("?")) === null || _f === void 0 ? void 0 : _f[1]) === null || _g === void 0 ? void 0 : _g.split(":")) === null || _h === void 0 ? void 0 : _h[1];
    return {
        functionName: functionName,
        fileName: fileName,
        lineNumber: lineNumber,
    };
}
exports.getCallStack = getCallStack;
function findDiff(obj1, obj2, path) {
    if (path === void 0) { path = ""; }
    var changes = {};
    if (typeof obj1 === "object" &&
        obj1 !== null &&
        typeof obj2 === "object" &&
        obj2 !== null) {
        for (var key in obj1) {
            var newPath = path
                ? Array.isArray(obj1)
                    ? "".concat(path, "[").concat(key, "]")
                    : "".concat(path, ".").concat(key)
                : key;
            if (obj2.hasOwnProperty(key)) {
                var nestedChanges = findDiff(obj1[key], obj2[key], newPath);
                Object.assign(changes, nestedChanges);
            }
            else {
                changes["".concat(newPath, " [D]")] = undefined;
            }
        }
        for (var key in obj2) {
            var newPath = path ? "".concat(path, ".").concat(key) : key;
            if (!obj1.hasOwnProperty(key)) {
                changes["".concat(newPath, " [A]")] = obj2[key];
            }
        }
    }
    else if (obj1 !== obj2) {
        changes["".concat(path, " [M]")] = obj2;
    }
    return changes;
}
exports.findDiff = findDiff;
function useX(CL, label) {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    if (!label) {
        label = CL.name;
    }
    var intiate = function () {
        if (!exports.xRefs[label]) {
            var state = new CL();
            exports.xRefs[label] = {
                state: state,
                label: label,
                setLogs: [],
                actionLogs: [],
                index: 0,
                copy: state && typeof state === "object"
                    ? //@ts-ignore
                        JSON.parse(JSON.stringify(state))
                    : {},
            };
            //@ts-ignore
            state && state.onChange && state.onChange();
        }
    };
    var setAgain = function () {
        if (!exports.xRefs[label]) {
            intiate();
        }
        exports.xRefs[label].renderer = function (fn) {
            var props = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                props[_i - 1] = arguments[_i];
            }
            var errorOccured = false;
            var errorMessage = "";
            try {
                if (typeof fn === "function")
                    fn.apply(exports.xRefs[label].state, props);
            }
            catch (e) {
                console.error(e);
                errorOccured = true;
                errorMessage = e === null || e === void 0 ? void 0 : e.message;
            }
            if (typeof fn !== "function") {
                throw new Error("set is called and no action is passed");
            }
            var _a = getCallStack(), fileName = _a.fileName, functionName = _a.functionName, lineNumber = _a.lineNumber;
            var fname = fileName.split("/")[fileName.split("/").length - 1];
            var updateSet = function () {
                var _a;
                var copy = JSON.parse(JSON.stringify(exports.xRefs[label].state));
                var changeList = {};
                if (exports.xRefs[label].copy) {
                    changeList = findDiff(exports.xRefs[label].copy, copy);
                    if (changeList && Object.keys(changeList).length > 0) {
                        __spreadArray([], Object.keys(changeList), true).forEach(function (key) {
                            changeList["state." + key] = changeList[key];
                            delete changeList[key];
                        });
                    }
                }
                var log = {
                    fileName: fname.split("?")[0],
                    functionName: functionName,
                    lineNumber: lineNumber,
                    changeList: changeList,
                    props: props,
                    index: exports.xRefs[label].index + 1,
                    name: fn.name || "",
                    errorOccured: errorOccured,
                    errorMessage: errorMessage,
                };
                exports.xConfig.enableConsoleLogging && console.log("useX - " + log.name, log);
                exports.xConfig.enableConsoleLogging &&
                    console.log("useX - new state", (_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.state);
                exports.xRefs[label].setLogs.unshift(log);
                exports.xRefs[label].index++;
                exports.xRefs[label].setLogs.length > 10 && exports.xRefs[label].setLogs.pop();
                exports.xRefs[label].copy = copy;
            };
            console.log(exports.xRefs);
            if (exports.xRefs[label].state.onChange) {
                call(exports.xRefs[label].state.onChange, exports.xRefs[label].state);
                window.setTimeout(function () {
                    exports.xConfig.enableDebugging && updateSet();
                    setCount(count + 1);
                    (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
                }, 0);
            }
            else {
                exports.xConfig.enableDebugging && updateSet();
                setCount(count + 1);
                (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
            }
        };
    };
    setAgain();
    (0, react_1.useEffect)(function () {
        setAgain();
        return function () {
            delete exports.xRefs[label];
            (exports.listeners === null || exports.listeners === void 0 ? void 0 : exports.listeners.onStateChange) && exports.listeners.onStateChange();
        };
    }, []);
    return [exports.xRefs[label].state, exports.xRefs[label].renderer];
}
exports.useX = useX;
var Collapsable = function (_a) {
    var children = _a.children, label = _a.label;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
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
                }, onMouseDown: function () { return setOpen(!open); }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
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
var ErrorComponent = function (_a) {
    var Error = _a.Error, message = _a.message;
    return ((0, jsx_runtime_1.jsx)("span", { title: (Error === null || Error === void 0 ? void 0 : Error.stack) || "", style: { color: "red" }, children: message }));
};
exports.ErrorComponent = ErrorComponent;
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            error: null,
            errorMessage: "",
        };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error) {
        this.setState({
            error: error,
            errorMessage: error.message,
        });
    };
    ErrorBoundary.prototype.render = function () {
        var _a = this.state, error = _a.error, errorMessage = _a.errorMessage;
        var Error = this.props.Error;
        if (error) {
            return (0, jsx_runtime_1.jsx)(Error, { error: error, message: errorMessage });
        }
        return this.props && this.props.children ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: this.props.children })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Error" }));
    };
    return ErrorBoundary;
}(react_1.Component));
exports.ErrorBoundary = ErrorBoundary;
var LabelRenderer = function (_a) {
    var label = _a.label;
    return ((0, jsx_runtime_1.jsx)("span", { children: label.endsWith("[M]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Modified", style: { color: "#bc7a00" }, children: [label.substr(0, label.length - 3), " "] })) : label.endsWith("[A]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Added", style: { color: "green" }, children: [label.substr(0, label.length - 3), " "] })) : label.endsWith("[D]") ? ((0, jsx_runtime_1.jsxs)("span", { title: "Deleted", style: { color: "#df0000" }, children: [label.substr(0, label.length - 3), " "] })) : ((0, jsx_runtime_1.jsx)("span", { children: label })) }));
};
exports.LabelRenderer = LabelRenderer;
var StateView = function (_a) {
    var state = _a.state, _b = _a.boldFont, boldFont = _b === void 0 ? true : _b, _c = _a.autoOpenFirstLevel, autoOpenFirstLevel = _c === void 0 ? false : _c;
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)("div", { style: { marginLeft: "-30px" }, children: (0, jsx_runtime_1.jsx)(exports.Treeview, { autoOpenFirstLevel: autoOpenFirstLevel, state: state, boldFont: boldFont }) }) }));
};
exports.StateView = StateView;
var Switch = function (_a) {
    var _b, _c;
    var State = _a.State;
    var _d = (0, react_1.useState)(0), selectedTab = _d[0], setSelectedTab = _d[1];
    var tabs = ["State", "Set Logs", "Memos"];
    var _e = (0, react_1.useState)(0), count = _e[0], setCount = _e[1];
    var spanStyle = function (isSelected) {
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
                }, children: tabs.map(function (item, i) { return ((0, jsx_runtime_1.jsxs)("span", { onMouseDown: function () { return setSelectedTab(i); }, 
                    //@ts-ignore
                    style: spanStyle(selectedTab === i), children: [item, " ", i === 1 && (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: State.index })] })); }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 0 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: State.state }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 1 ? "block" : "none" }, children: [State.setLogs.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)("span", { style: { textDecoration: "underline", cursor: "pointer" }, onClick: function () {
                                State.setLogs = [];
                                State.index = 0;
                                setCount(count + 1);
                            }, children: (0, jsx_runtime_1.jsx)("i", { children: "Clear Logs" }) }) })), (_b = State.setLogs) === null || _b === void 0 ? void 0 : _b.map(function (log, index) {
                        var _a;
                        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                borderBottom: "1px solid #CCC",
                                marginBottom: "5px",
                                paddingBottom: "5px",
                                position: "relative",
                            }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                        display: "inline-block",
                                        verticalAlign: "top",
                                    }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { autoOpenFirstLevel: false, state: (_a = {},
                                            _a[log.name] = {
                                                changes: log.changeList,
                                                props: log.props,
                                                "Triggered by": log.functionName,
                                                from: log.fileName,
                                                status: log.errorOccured
                                                    ? "Error!" + log.errorMessage
                                                    : "Success",
                                            },
                                            _a) || {} }) }), (0, jsx_runtime_1.jsx)("div", { style: {
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
                                        right: "20px",
                                        top: "3px",
                                        borderRadius: "30px",
                                        width: "10px",
                                        height: "10px",
                                        background: log.errorOccured ? "red" : "green",
                                    } })] }, " set " + index + log.name));
                    })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "10px" } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 2 ? "block" : "none" }, children: [(0, jsx_runtime_1.jsx)(exports.StateView, { state: ((_c = State.state) === null || _c === void 0 ? void 0 : _c.memos) || {}, autoOpenFirstLevel: true }), " "] })] }));
};
exports.Switch = Switch;
var UseXWrapper = function (props) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: props.children }), props.enableDevTools && ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.UseXDevTools, __assign({}, props)) }))] }));
};
exports.UseXWrapper = UseXWrapper;
var Treeview = function (_a) {
    var state = _a.state, _b = _a.autoOpenFirstLevel, autoOpenFirstLevel = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)([]), openList = _c[0], setOpen = _c[1];
    (0, react_1.useEffect)(function () {
        setOpen(autoOpenFirstLevel && typeof state === "object" ? Object.keys(state) : []);
    }, []);
    var toggleOpen = function (key) {
        if (openList.includes(key)) {
            setOpen(openList.filter(function (item) { return item !== key; }));
        }
        else {
            setOpen(__spreadArray(__spreadArray([], openList, true), [key], false));
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
                    .filter(function (key) { return typeof state[key] !== "function"; })
                    .map(function (item) {
                    return typeof state[item] === "object" && state[item] !== null ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "x-devtools-treview-header", style: {
                                    cursor: "pointer",
                                    marginTop: "003px",
                                    paddingBottom: "5px",
                                    paddingLeft: "4px",
                                }, onMouseDown: function () { return toggleOpen(item); }, children: [" ", (0, jsx_runtime_1.jsxs)("b", { children: [(0, jsx_runtime_1.jsx)("span", { style: { display: "inline-block", paddingTop: "5px" }, children: (0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", height: "13", viewBox: "0 -960 960 960", width: "24", style: {
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
var UseXDevTools = function (_a) {
    var _b = _a.XIconPosition, XIconPosition = _b === void 0 ? { bottom: "50px", right: "50px" } : _b, _c = _a.enableConsoleLogging, enableConsoleLogging = _c === void 0 ? false : _c;
    var _d = (0, react_1.useState)(0), count = _d[0], setCount = _d[1];
    (0, react_1.useEffect)(function () {
        exports.listeners.onStateChange = function () {
            setTimeout(function () { return setCount(count + 1); }, 50);
        };
        return function () {
            exports.listeners.onStateChange = null;
        };
    }, [setCount, count]);
    (0, react_1.useEffect)(function () {
        console.log("count changed", count);
    }, [count]);
    exports.xConfig.enableDebugging = true;
    exports.xConfig.enableConsoleLogging = enableConsoleLogging;
    var _e = (0, react_1.useState)(false), showTools = _e[0], setShowTools = _e[1];
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [" ", (0, jsx_runtime_1.jsxs)("div", { id: "usex-devtools", style: {
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
                            }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: "bold", fontSize: "18px" }, children: "useX Dev Tools" }) }), (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: Object.keys(exports.xRefs).map(function (key) {
                                var stateValue = exports.xRefs[key];
                                return stateValue ? ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(exports.Collapsable, { label: key, state: stateValue, children: (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.Switch, { State: stateValue }) }) }) }, key)) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
                            }) }), Object.keys(exports.xRefs).length === 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", marginTop: "10px" }, children: [" ", (0, jsx_runtime_1.jsx)("i", { children: "No States are created using useX" })] }))] }), (0, jsx_runtime_1.jsx)("div", { onMouseDown: function () {
                        setShowTools(!showTools);
                    }, id: "usex-devtools-holder", style: __assign({ zIndex: 1000000001, width: "50px", height: "50px", background: "rgb(2 137 101)", borderRadius: "50px", position: "fixed", userSelect: "none", boxShadow: "0px 0px 10px 1px #CCC", cursor: "pointer" }, XIconPosition), children: (0, jsx_runtime_1.jsx)("span", { style: {
                            left: "17px",
                            position: "absolute",
                            top: "2px",
                            fontFamily: 'Comic Sans MS, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                            fontWeight: "bold",
                            fontSize: "25px",
                            color: "white",
                            fontStyle: "italic",
                        }, children: "x" }) })] }) }));
};
exports.UseXDevTools = UseXDevTools;
var ValueRenderer = function (_a) {
    var text = _a.text;
    var _b = (0, react_1.useState)(false), highlighted = _b[0], setHighlighted = _b[1];
    var _c = (0, react_1.useState)(true), firstRender = _c[0], setFirstRender = _c[1];
    (0, react_1.useEffect)(function () {
        if (!firstRender) {
            setHighlighted(true);
            var timer_1 = setTimeout(function () {
                setHighlighted(false);
            }, 300);
            return function () { return clearTimeout(timer_1); };
        }
        else {
            setFirstRender(false);
        }
    }, [text]);
    var highlightStyle = highlighted
        ? {
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            transition: "background-color 0s",
        }
        : {
            backgroundColor: "rgba(0, 255, 0, 0)",
            transition: "background-color 2s",
        };
    return ((0, jsx_runtime_1.jsx)("span", { title: text + "", style: __assign(__assign({}, highlightStyle), { padding: "0px 5px", borderRadius: "4px" }), children: text === null ? ("null") : text === undefined ? ("undefined") : typeof text === "function" ? ((0, jsx_runtime_1.jsx)("b", { children: "Function" })) : text === "" ? ((0, jsx_runtime_1.jsx)("i", { children: "''" })) : typeof text === "string" ? ("'".concat(text, "'")) : ((text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : "")) }));
};
exports.ValueRenderer = ValueRenderer;
