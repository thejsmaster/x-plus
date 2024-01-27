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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.deepClone = exports.hasScrollReachedTheEnd = exports.usePagination = exports.xEvents = exports.useQ = exports.getParentXForm = exports.useXForm = exports.hasNonEmptyValue = exports.useXAsync = exports.useXFetch = exports.xFetch = exports.XFetchConfig = exports.ValueRenderer = exports.UseXDevTools = exports.Treeview = exports.XPlusWrapper = exports.SwitchY = exports.Switch = exports.StateView = exports.LabelRenderer = exports.ErrorBoundary = exports.ErrorComponent = exports.Collapsable = exports.setStateX = exports.buildActions = exports.useX = exports.useXOnAction = exports.findDiff = exports.getCallStack = exports.getListenerCount = exports.useXChannel = exports.dispatch = exports.postMessage = exports.getParentX = exports.getX = exports.getParentState = exports.xConfig = exports.yRefs = exports.xRefs = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./App.css");
exports.xRefs = {};
exports.yRefs = {};
exports.xConfig = {
    enableDebugging: false,
    enableConsoleLogging: false,
    autoDestructureState: false,
};
var listeners = {
    onStateChange: null,
};
function getParentState(CL, Selectors) {
    //
    var label = CL.name;
    var item = exports.xRefs[label];
    if (!item) {
        throw Error("Error Occured in getParentState. The requested state is not created by any of the parent components.");
    }
    return __assign(__assign(__assign({}, item.state), item.actions), { set: item.dispatch, setItem: item.setItem, dispatch: item.dispatch, selectors: item.selectors, triggerEvent: item.triggerEvent, xlog: item.log });
}
exports.getParentState = getParentState;
exports.getX = getParentState;
exports.getParentX = getParentState;
var channels = {};
var postMessage = function (channelName) {
    var props = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        props[_i - 1] = arguments[_i];
    }
    var channelCallbacks = channels[channelName] || [];
    channelCallbacks.forEach(function (cb) {
        cb.apply(void 0, props);
    });
};
exports.postMessage = postMessage;
var dispatch = function (label, fn) {
    var _a;
    var props = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        props[_i - 2] = arguments[_i];
    }
    (_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.dispatch.apply(_a, __spreadArray([fn], props, false));
};
exports.dispatch = dispatch;
var useXChannel = function (channelName, callback) {
    if (!channels[channelName]) {
        channels[channelName] = [];
    }
    var post = function () {
        var props = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            props[_i] = arguments[_i];
        }
        var channelCallbacks = channels[channelName] || [];
        channelCallbacks.forEach(function (cb) {
            cb !== callback && cb.apply(void 0, props);
        });
    };
    (0, react_1.useEffect)(function () {
        if (callback) {
            channels[channelName].push(callback);
        }
        return function () {
            if (callback) {
                var index = channels[channelName].indexOf(callback);
                if (index !== -1) {
                    channels[channelName].splice(index, 1);
                }
            }
        };
    }, [channelName, callback]);
    return post;
};
exports.useXChannel = useXChannel;
var getListenerCount = function (ChannelName) {
    var _a;
    return ((_a = channels[ChannelName]) === null || _a === void 0 ? void 0 : _a.length) || 0;
};
exports.getListenerCount = getListenerCount;
function getCallStack(splitIndex) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (splitIndex === void 0) { splitIndex = 4; }
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
// interface StateObject<T> {
//   state: T;
//   get<K extends keyof T>(key: K): T[K];
//   set<K extends keyof T>(key: K, value: T[K]): void;
// }
// export function XCarrier<T extends Object>(
//   classType: new () => T
// ): StateObject<T> {
//   const state: T = new classType();
//   return {
//     state: state,
//     get<K extends keyof T>(key: K): T[K] {
//       if (key in state) {
//         return state[key];
//       } else {
//         throw new Error(`Key '${key.toString()}' does not exist in the state.`);
//       }
//     },
//     set<K extends keyof T>(key: K, value: T[K]): void {
//       if (key in state) {
//         state[key] = value;
//       } else {
//         throw new Error(`Key '${key.toString()}' does not exist in the state.`);
//       }
//     },
//   };
// }
function findDiff(obj1, obj2, path) {
    if (path === void 0) { path = ""; }
    var changes = {};
    if (typeof obj1 === "object" &&
        obj1 !== null &&
        typeof obj2 === "object" &&
        obj2 !== null) {
        for (var key in obj1) {
            var newPath = path ? "".concat(path, ".").concat(key) : key;
            if (obj2.hasOwnProperty(key)) {
                var nestedChanges = findDiff(obj1[key], obj2[key], newPath);
                Object.assign(changes, nestedChanges);
            }
            else {
                changes["".concat(newPath, " [D]")] = "deleted";
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
var mountRefsCount = {};
function useXOnAction(fnCallback, actions) {
    (0, exports.useXChannel)("useX", function (type) {
        if (actions.includes(type)) {
            fnCallback();
        }
    });
}
exports.useXOnAction = useXOnAction;
function getUnderscoreMethods(obj, name) {
    var underscoreMethods = {};
    var methods = getMethodNames(obj);
    methods.forEach(function (method) {
        if (method.startsWith("_") && typeof obj[method] === "function") {
            underscoreMethods[method] = obj[method].bind(exports.xRefs[name].state);
        }
    });
    return underscoreMethods;
}
function useX(CL, Selectors) {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    (0, react_1.useEffect)(function () {
        if (count > 0) {
            setTimeout(function () {
                (listeners === null || listeners === void 0 ? void 0 : listeners.onStateChange) && listeners.onStateChange();
            }, 200);
        }
    }, [count]);
    var label = CL.name;
    var intiate = function () {
        if (!exports.xRefs[label]) {
            var state = new CL();
            state = destructureWithProto(state);
            exports.xRefs[label] = {
                state: state,
                label: label,
                setLogs: [],
                refs: {},
                index: 0,
                xlogs: [],
                eventLogs: [],
            };
            exports.xRefs[label].selectors = Selectors ? new Selectors() : {};
            //@ts-ignore
            state && state.onChange && state.onChange();
            exports.xRefs[label].actions = buildActions(label);
        }
    };
    var setAgain = function () {
        if (!exports.xRefs[label]) {
            intiate();
        }
        exports.xRefs[label].dispatch = function (fn) {
            var props = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                props[_i - 1] = arguments[_i];
            }
            var timeStart = Date.now();
            var copy = deepClone(exports.xRefs[label].state);
            var errorOccured = false;
            var errorMessage = "";
            try {
                if (typeof fn === "function") {
                    fn.apply(exports.xRefs[label].state, props);
                    (0, exports.postMessage)("useX", fn);
                    // actions.push(fn);
                    // xRefs[label].state = { ...xRefs[label].state };
                }
            }
            catch (e) {
                console.error(e);
                errorOccured = true;
                errorMessage = e === null || e === void 0 ? void 0 : e.message;
            }
            var _a = getCallStack(), fileName = _a.fileName, functionName = _a.functionName, lineNumber = _a.lineNumber;
            var fname = fileName.split("/")[fileName.split("/").length - 1];
            var updateSet = function () {
                var _a;
                var changeList = {};
                if (copy) {
                    changeList = findDiff(copy, exports.xRefs[label].state);
                    if (changeList && Object.keys(changeList).length > 0) {
                        __spreadArray([], Object.keys(changeList), true).forEach(function (key) {
                            changeList["state." + key] = changeList[key];
                            delete changeList[key];
                        });
                    }
                }
                Object.keys(changeList).forEach(function (path) {
                    if (path) {
                        updateNestedObject(exports.xRefs[label].state, path
                            .split(".")
                            .slice(1, path.split(".").length - 1)
                            .join("."));
                    }
                });
                if (exports.xConfig.enableDebugging) {
                    debugger;
                    var payload = __spreadArray([], props, true).length > 0 ? props : undefined;
                    if (__spreadArray([], props, true).length > 0)
                        payload = buildPayload(fn, __spreadArray([], props, true));
                    var log = {
                        fileName: fname.split("?")[0],
                        functionName: functionName || "Set",
                        lineNumber: lineNumber,
                        changeList: changeList,
                        payload: payload,
                        index: exports.xRefs[label].index + 1,
                        name: fn.name || "",
                        errorOccured: errorOccured,
                        errorMessage: errorMessage,
                        duration: Date.now() - timeStart + " ms",
                        at: formatTime(new Date()),
                        time: +new Date(),
                    };
                    exports.xConfig.enableConsoleLogging &&
                        console.log("useX - " + log.name, log);
                    exports.xConfig.enableConsoleLogging &&
                        console.log("useX - updated state", (_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.state);
                    exports.xRefs[label].setLogs.unshift(log);
                    exports.xRefs[label].index++;
                    exports.xRefs[label].setLogs.length > 15 && exports.xRefs[label].setLogs.pop();
                }
                Object.keys(changeList).length > 0 && setCount(count + 1);
            };
            exports.xRefs[label].state.onChange && exports.xRefs[label].state.onChange();
            updateSet();
            exports.xRefs[label].state = __assign({}, exports.xRefs[label].state);
        };
        exports.xRefs[label].stateChanged = count;
        exports.xRefs[label].triggerEvent = function (xEventobject) {
            var _a;
            var _b;
            var state = exports.xRefs[label].state;
            if ((_b = state.events) === null || _b === void 0 ? void 0 : _b[xEventobject === null || xEventobject === void 0 ? void 0 : xEventobject.name]) {
                state.events[xEventobject.name] = __assign({}, xEventobject);
                exports.xRefs[label].eventLogs.unshift((_a = {},
                    _a[xEventobject.name] = "triggered at " + formatTimeExtended(formatTime(new Date())),
                    _a));
                setCount(count + 1);
            }
            else {
                throw Error("event is not declared on X Class. refer to the documentation on xEvents!");
            }
        };
        exports.xRefs[label].set = function (pathOfObjectToUpdate, value, nameOfSetOperation, stackTraceIndex) {
            if (nameOfSetOperation === void 0) { nameOfSetOperation = ""; }
            if (stackTraceIndex === void 0) { stackTraceIndex = 4; }
            var timeStart = Date.now();
            var errorOccured = false;
            var errorMessage = "";
            try {
                if (typeof pathOfObjectToUpdate === "string") {
                    setStateX(exports.xRefs[label].state, pathOfObjectToUpdate, value);
                }
            }
            catch (e) {
                console.error(e);
                errorOccured = true;
                errorMessage = e === null || e === void 0 ? void 0 : e.message;
            }
            var updateSet = function () {
                var _a;
                var _b;
                var _c = getCallStack(stackTraceIndex), fileName = _c.fileName, functionName = _c.functionName, lineNumber = _c.lineNumber;
                var fname = fileName.split("/")[fileName.split("/").length - 1];
                var changeList = {};
                changeList = (_a = {}, _a[pathOfObjectToUpdate] = value, _a);
                var log = {
                    fileName: fname.split("?")[0],
                    functionName: functionName || "set",
                    lineNumber: lineNumber,
                    changeList: changeList,
                    payload: value,
                    at: formatTime(new Date()),
                    index: exports.xRefs[label].index + 1,
                    name: nameOfSetOperation || "set",
                    errorOccured: errorOccured,
                    errorMessage: errorMessage,
                    duration: Date.now() - timeStart + " ms",
                };
                exports.xConfig.enableConsoleLogging && console.log("useX - " + log.name, log);
                exports.xConfig.enableConsoleLogging &&
                    console.log("useX - updated state", (_b = exports.xRefs[label]) === null || _b === void 0 ? void 0 : _b.state);
                exports.xRefs[label].setLogs.unshift(log);
                exports.xRefs[label].index++;
                exports.xRefs[label].setLogs.length > 15 && exports.xRefs[label].setLogs.pop();
            };
            exports.xRefs[label].state.onChange && exports.xRefs[label].state.onChange();
            exports.xConfig.enableDebugging && updateSet();
            exports.xRefs[label].state = __assign({}, exports.xRefs[label].state);
            pathOfObjectToUpdate && setCount(count + 1);
        };
        exports.xRefs[label].xlog = function (logName, logValue) {
            var _a;
            var _b, _c, _d, _e, _f, _g;
            if (exports.xConfig.enableDebugging) {
                (_c = (_b = exports.xRefs[label]) === null || _b === void 0 ? void 0 : _b.xlogs) === null || _c === void 0 ? void 0 : _c.unshift((_a = {}, _a[logName] = logValue, _a));
                if (((_e = (_d = exports.xRefs[label]) === null || _d === void 0 ? void 0 : _d.xlogs) === null || _e === void 0 ? void 0 : _e.length) > 20) {
                    (_g = (_f = exports.xRefs[label]) === null || _f === void 0 ? void 0 : _f.xlogs) === null || _g === void 0 ? void 0 : _g.pop();
                }
            }
        };
        exports.xRefs[label].getActions = getUnderscoreMethods(exports.xRefs[label].state, label);
        // xRefs[label].actionEvents = xEvents(getMethodNames(xRefs[label].actions));
    };
    setAgain();
    (0, react_1.useEffect)(function () {
        setAgain();
        if (mountRefsCount[label]) {
            throw Error("Don't intialise useX " +
                label +
                " again!. use 'getParentX(" +
                label +
                ")' to get the instance of already created useX instance of " +
                label);
        }
        else {
            mountRefsCount[label] = 1;
        }
        return function () {
            delete exports.xRefs[label];
            delete mountRefsCount[label];
            (listeners === null || listeners === void 0 ? void 0 : listeners.onStateChange) && listeners.onStateChange();
        };
    }, []);
    //
    return __assign(__assign(__assign({ 
        // state: xRefs[label].state,
        // set: xRefs[label].set,
        // name: xRefs[label],
        // dispatch: xRefs[label].dispatch,
        // actions: xRefs[label].actions,
        // stateChanged: count,
        // plus: xRefs[label].set,
        // refs: xRefs[label].refs,
        // // onPlus: xRefs[label].onPlus,
        setSilently: function (key, val) {
            exports.xRefs[label].state[key] = val;
        }, triggerEvent: exports.xRefs[label].triggerEvent, xlog: exports.xRefs[label].xlog, setItem: function (key, newVal) {
            exports.xRefs[label].set(key, newVal, "setItem", 5);
        }, selectors: exports.xRefs[label].selectors, set: exports.xRefs[label].set }, exports.xRefs[label].state), exports.xRefs[label].actions), exports.xRefs[label].getActions);
}
exports.useX = useX;
function buildActions(label) {
    var _a;
    var methods = ((_a = exports.xRefs[label]) === null || _a === void 0 ? void 0 : _a.state) ? getMethodNames(exports.xRefs[label].state) : [];
    var actions = {};
    methods.forEach(function (item) {
        actions[item] = function () {
            var _a;
            var props = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                props[_i] = arguments[_i];
            }
            (_a = exports.xRefs[label]).dispatch.apply(_a, __spreadArray([exports.xRefs[label].state[item]], props, false));
        };
    });
    return actions;
}
exports.buildActions = buildActions;
function destructureWithProto(obj) {
    var result = __assign({}, obj);
    var prototype = Object.getPrototypeOf(obj);
    if (prototype) {
        var prototypeProps = Object.getOwnPropertyNames(prototype);
        for (var _i = 0, prototypeProps_1 = prototypeProps; _i < prototypeProps_1.length; _i++) {
            var prop = prototypeProps_1[_i];
            if (prop)
                result[prop] = prototype[prop];
        }
    }
    return result;
}
function updateNestedObject(obj, path) {
    if (path) {
        var keys = path.split(".");
        var newObj = obj;
        var current = newObj;
        if (keys.length)
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                current[key] = Array.isArray(current[key])
                    ? __spreadArray([], current[key], true) : __assign({}, current[key]);
                current = current[key];
            }
        return newObj;
    }
    return obj;
}
function setStateX(obj, path, value) {
    var keys = path.split(".");
    var newObj = obj;
    var current = newObj;
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        current[key] = Array.isArray(current[key])
            ? __spreadArray([], current[key], true) : __assign({}, current[key]);
        if (i + 1 !== keys.length) {
            current = current[key];
        }
        else {
            current[key] = value;
        }
    }
    return newObj;
}
exports.setStateX = setStateX;
var Collapsable = function (_a) {
    var children = _a.children, label = _a.label, _b = _a.isUseXState, isUseXState = _b === void 0 ? true : _b;
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    padding: "12px 15px",
                    borderTop: "1px solid rgb(232 238 231)",
                    borderLeft: !open ? "4px solid #CCC" : "4px solid rgb(2, 137, 101)",
                    borderImage: "initial",
                    background: "rgb(250 250 250)",
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
                        }, children: (0, jsx_runtime_1.jsx)("b", { children: label }) }), " ", !open && isUseXState && ((0, jsx_runtime_1.jsx)("b", { style: { float: "right", color: "green", fontSize: "small" }, children: exports.xRefs[label].index > 0 ? exports.xRefs[label].index : "" }))] }, label), open && ((0, jsx_runtime_1.jsx)("div", { style: {
                    padding: "10px 30px",
                    background: "rgb(252, 252, 252)",
                    fontSize: "14px",
                    paddingBottom: "45px",
                }, children: children }))] }));
};
exports.Collapsable = Collapsable;
var ErrorComponent = function (_a) {
    var Error = _a.Error, message = _a.message;
    console.error(Error);
    return ((0, jsx_runtime_1.jsxs)("span", { title: (Error === null || Error === void 0 ? void 0 : Error.stack) || "", style: { color: "red" }, children: [message, " check console for details"] }));
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
    var _b, _c, _d, _e, _f;
    var State = _a.State;
    var _g = (0, react_1.useState)(0), selectedTab = _g[0], setSelectedTab = _g[1];
    var tabs = ["State", "Dispatch Logs", "Events", "xLogs"];
    var _h = (0, react_1.useState)(0), count = _h[0], setCount = _h[1];
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
                    style: spanStyle(selectedTab === i), children: [item, " ", i === 1 && (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: State.index })] }, i)); }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 0 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: State.state }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 1 ? "block" : "none" }, children: [State.setLogs.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)("span", { style: { textDecoration: "underline", cursor: "pointer" }, onClick: function () {
                                State.setLogs = [];
                                State.index = 0;
                                setCount(count + 1);
                            }, children: (0, jsx_runtime_1.jsx)("i", { children: "Clear Logs" }) }) })), (_b = State.setLogs) === null || _b === void 0 ? void 0 : _b.map(function (log, index) {
                        var _a;
                        var lastone = State.setLogs[index - 1];
                        var timeDurationSinceLast = lastone ? lastone.time - log.time : 0;
                        var groupLog = false;
                        if (lastone &&
                            timeDurationSinceLast < 2000 &&
                            lastone.functionName === log.functionName) {
                            groupLog = true;
                        }
                        return ((0, jsx_runtime_1.jsxs)("div", { style: {
                                // background: Timer(log.at) === "Just now" ? "#EEE" : "none",
                                borderTop: timeDurationSinceLast < 2000 || index == 0
                                    ? "none"
                                    : "1px solid #CCC",
                                marginBottom: "5px",
                                marginTop: groupLog ? "-10px" : "0px",
                                paddingBottom: "5px",
                                position: "relative",
                            }, children: [!groupLog && ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", marginTop: "10px" }, children: [(0, jsx_runtime_1.jsx)("span", { style: {
                                                // backgroundColor: "#EEE",
                                                padding: "2px 5px",
                                                borderRadius: "5px",
                                                fontWeight: "bold",
                                                textAlign: "left",
                                                fontSize: "16px",
                                                // background: "#EFEFEF",
                                            } }), " ", (0, jsx_runtime_1.jsx)("span", { style: { color: "#777" } }), (0, jsx_runtime_1.jsx)("span", { style: {}, children: (0, jsx_runtime_1.jsx)(TimeRenderer, { time: log.at }) })] })), (0, jsx_runtime_1.jsxs)("div", { style: {
                                        display: "inline-block",
                                        position: "relative",
                                        verticalAlign: "top",
                                        width: "330px",
                                    }, children: [(0, jsx_runtime_1.jsx)(exports.StateView, { autoOpenFirstLevel: false, state: (_a = {},
                                                _a[log.name] = {
                                                    changes: log.changeList,
                                                    payload: log.payload,
                                                    "Called By": log.functionName,
                                                    from: log.fileName,
                                                    "triggered at": formatTimeExtended(log.at),
                                                },
                                                _a) || {} }), " ", (0, jsx_runtime_1.jsxs)("div", { style: { position: "absolute", top: "6px", right: "50px" }, children: ["~ ", log.duration] }), (0, jsx_runtime_1.jsx)("div", { style: {
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
                                            } })] })] }, " set " + index + log.name));
                    })] }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: "10px" } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 2 ? "block" : "none" }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { fontSize: "16px", fontWeight: "bold" }, children: ["Registered Events (", ((_c = State.state) === null || _c === void 0 ? void 0 : _c.events) ? Object.keys((_d = State.state) === null || _d === void 0 ? void 0 : _d.events).length : 0, ")", " ", ":"] }), (0, jsx_runtime_1.jsx)("div", { style: { paddingLeft: "10px", marginBottom: "10px" }, children: ((_e = State.state) === null || _e === void 0 ? void 0 : _e.events) &&
                            Object.keys((_f = State.state) === null || _f === void 0 ? void 0 : _f.events).map(function (item) { return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("b", { children: item }) })); }) }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: "16px", fontWeight: "bold" }, children: ["Logs (", State.eventLogs.length.toString(), "):"] }), State.eventLogs.map(function (item, i) { return ((0, jsx_runtime_1.jsxs)("div", { style: { paddingLeft: "10px" }, children: [(0, jsx_runtime_1.jsxs)("span", { children: [State.eventLogs.length - i, " "] }), (0, jsx_runtime_1.jsxs)("span", { style: { display: "inline-block" }, children: [" ", (0, jsx_runtime_1.jsx)(exports.StateView, { state: item, autoOpenFirstLevel: true })] })] })); })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 3 ? "block" : "none" }, children: [State.xlogs.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)("span", { style: { textDecoration: "underline", cursor: "pointer" }, onClick: function () {
                                State.xlogs = [];
                                setCount(count + 1);
                            }, children: (0, jsx_runtime_1.jsx)("i", { children: "Clear Logs" }) }) })), " ", (State === null || State === void 0 ? void 0 : State.xlogs) &&
                        (State === null || State === void 0 ? void 0 : State.xlogs.map(function (log, i) { return ((0, jsx_runtime_1.jsx)("div", { style: { borderBottom: "1px solid #EEE" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: log }) }, State.xlogs.length - i)); }))] })] }));
};
exports.Switch = Switch;
var SwitchY = function (_a) {
    var State = _a.State;
    debugger;
    var _b = (0, react_1.useState)(0), selectedTab = _b[0], setSelectedTab = _b[1];
    var tabs = ["data", "errors", "globalError", "logs"];
    var _c = (0, react_1.useState)(0), count = _c[0], setCount = _c[1];
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
                }, children: tabs.map(function (item, i) { return ((0, jsx_runtime_1.jsx)("span", { onMouseDown: function () { return setSelectedTab(i); }, 
                    //@ts-ignore
                    style: spanStyle(selectedTab === i), children: item }, i)); }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 0 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: State.data }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 1 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)(exports.StateView, { state: State.errors }) }), (0, jsx_runtime_1.jsx)("div", { style: { display: selectedTab === 2 ? "block" : "none" }, children: (0, jsx_runtime_1.jsx)("div", { children: State.globalError }) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: selectedTab === 3 ? "block" : "none" }, children: [State.logs.length > 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: "right" }, children: (0, jsx_runtime_1.jsx)("span", { style: { textDecoration: "underline", cursor: "pointer" }, onClick: function () {
                                State.logs = [];
                                // State.index = 0;
                                setCount(count + 1);
                            }, children: (0, jsx_runtime_1.jsx)("i", { children: "Clear Logs" }) }) })), State.logs.map(function (log, index) { return ((0, jsx_runtime_1.jsxs)("div", { style: { borderBottom: "1px solid #EEE" }, children: [" ", (0, jsx_runtime_1.jsx)(exports.StateView, { state: log })] }, index)); })] })] }));
};
exports.SwitchY = SwitchY;
function formatTime(date) {
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = String(date.getSeconds()).padStart(2, "0");
    var milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return "".concat(hours, ":").concat(minutes, ":").concat(seconds, ":").concat(milliseconds);
}
function XPlusWrapper(props) {
    var _a = props.enableDevTools, enableDevTools = _a === void 0 ? true : _a, _b = props.keepOpen, keepOpen = _b === void 0 ? false : _b;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)("div", { style: { paddingRight: keepOpen ? "400px" : "0px" }, children: [" ", props.children && props.children] }) }), enableDevTools && ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.UseXDevTools, __assign({}, props)) }))] }));
}
exports.XPlusWrapper = XPlusWrapper;
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
                    .map(function (item, i) {
                    return typeof state[item] === "object" && state[item] !== null ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "x-devtools-treview-header", style: {
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
                                                    }, children: (0, jsx_runtime_1.jsx)("path", { d: "m80-160 400-640 400 640H80Z" }) }) }), (0, jsx_runtime_1.jsx)(exports.LabelRenderer, { label: item }), " "] }), ":", " ", Array.isArray(state[item]) ? ((0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsx)("i", { title: "Array", style: { color: "#555", fontSize: "12px" }, children: state[item].length > 0
                                                ? buildObjectOrArrayPreview(state[item])
                                                : " []" }) })) : ((0, jsx_runtime_1.jsx)("b", { children: (0, jsx_runtime_1.jsx)("i", { title: "Object", style: { color: "#555", fontSize: "12px" }, children: Object.keys(state[item]).length > 0
                                                ? buildObjectOrArrayPreview(state[item])
                                                : " {}" }) }))] }), openList.includes(item) &&
                                state[item] &&
                                typeof state[item] === "object" && ((0, jsx_runtime_1.jsx)(exports.Treeview, { state: state[item] }))] }, i)) : ((0, jsx_runtime_1.jsxs)("div", { style: { marginTop: "3px", width: "auto" }, children: [(0, jsx_runtime_1.jsxs)("b", { style: { marginLeft: "10px" }, children: [(0, jsx_runtime_1.jsx)(exports.LabelRenderer, { label: item }), " "] }), ": ", (0, jsx_runtime_1.jsx)(exports.ValueRenderer, { text: state[item] })] }));
                })] }) }));
};
exports.Treeview = Treeview;
var UseXDevTools = function (_a) {
    var _b = _a.XIconPosition, XIconPosition = _b === void 0 ? { bottom: "50px", right: "50px" } : _b, _c = _a.enableConsoleLogging, enableConsoleLogging = _c === void 0 ? false : _c, _d = _a.keepOpen, keepOpen = _d === void 0 ? false : _d, _e = _a.hideXPlusIcon, hideXPlusIcon = _e === void 0 ? false : _e, _f = _a.disableToggleESCKey, disableToggleESCKey = _f === void 0 ? false : _f;
    var _g = (0, react_1.useState)(keepOpen || false), showTools = _g[0], setShowTools = _g[1];
    var _h = (0, react_1.useState)(0), count = _h[0], setCount = _h[1];
    (0, react_1.useEffect)(function () {
        function handleKeyPress(event) {
            if (event.key === "Escape") {
                setShowTools(keepOpen || !showTools);
            }
        }
        if (!disableToggleESCKey) {
            window.addEventListener("keydown", handleKeyPress);
            return function () {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [showTools, setShowTools]);
    (0, react_1.useEffect)(function () {
        listeners.onStateChange = function () {
            setTimeout(function () { return setCount(count + 1); }, 50);
        };
        return function () {
            listeners.onStateChange = null;
        };
    }, [setCount, count]);
    exports.xConfig.enableDebugging = true;
    exports.xConfig.enableConsoleLogging = enableConsoleLogging;
    return ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsxs)("div", { id: "xplus-devtools-container", children: [" ", (0, jsx_runtime_1.jsxs)("div", { id: "usex-devtools", style: {
                        zIndex: 1000000000,
                        height: "100%",
                        width: "420px",
                        maxWidth: "100%",
                        position: "fixed",
                        // background: "rgb(250,250,250)",
                        background: "white",
                        transition: "right 0.2s ",
                        top: 0,
                        right: showTools ? "0px" : "-420px",
                        color: "#444",
                        overflow: "auto",
                        boxShadow: "rgb(202 204 204) 0px 0px 10px 0px",
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                textAlign: "center",
                                background: "white",
                                borderLeft: "1px solid #CCC",
                                padding: "10px",
                            }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: "bold", fontSize: "18px" }, children: "x-plus Dev Tools" }) }), (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: Object.keys(exports.xRefs).map(function (key) {
                                var stateValue = exports.xRefs[key];
                                return stateValue ? ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(exports.Collapsable, { label: key, state: stateValue, children: (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.Switch, { State: stateValue }) }) }) }, key) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
                            }) }), (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: Object.keys(exports.yRefs).map(function (key) {
                                var stateValue = exports.yRefs[key];
                                return stateValue ? ((0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(exports.Collapsable, { label: key + " (XForm)", state: stateValue, isUseXState: false, children: (0, jsx_runtime_1.jsx)(ErrorBoundary, { Error: exports.ErrorComponent, children: (0, jsx_runtime_1.jsx)(exports.SwitchY, { State: stateValue }) }) }) }, key) })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
                            }) }), Object.keys(exports.xRefs).length === 0 && ((0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", marginTop: "10px" }, children: [" ", (0, jsx_runtime_1.jsx)("i", { children: "No States are created using useX" })] }))] }), !hideXPlusIcon && ((0, jsx_runtime_1.jsx)("div", { onMouseDown: function () {
                        setShowTools(keepOpen || !showTools);
                    }, id: "usex-devtools-holder", style: __assign({ zIndex: 1000000001, width: "50px", height: "50px", 
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
    return ((0, jsx_runtime_1.jsx)("span", { title: text + "", style: __assign(__assign({}, highlightStyle), { padding: "0px 5px", borderRadius: "4px" }), children: text === null ? ((0, jsx_runtime_1.jsx)("span", { style: { color: "orange" }, children: "null" })) : text === undefined ? ((0, jsx_runtime_1.jsx)("span", { style: { color: "orange" }, children: "undefined" })) : typeof text === "function" ? ((0, jsx_runtime_1.jsx)("b", { children: "Function" })) : text === "" ? ((0, jsx_runtime_1.jsx)("i", { children: "''" })) : typeof text === "string" ? ((0, jsx_runtime_1.jsx)("span", { style: { color: "#444" }, children: text })) : ((text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : "")) }));
};
exports.ValueRenderer = ValueRenderer;
exports.XFetchConfig = {
    onBeforeFetch: undefined,
};
function xFetch(url, method, payload, qsObj, headers, signal) {
    if (url === void 0) { url = "/"; }
    if (method === void 0) { method = "get"; }
    if (payload === void 0) { payload = null; }
    if (qsObj === void 0) { qsObj = {}; }
    if (headers === void 0) { headers = {}; }
    if (signal === void 0) { signal = null; }
    return __awaiter(this, void 0, void 0, function () {
        var options, _a, queryString;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    options = {
                        url: url,
                        method: method,
                        headers: __assign({ "Content-Type": "application/json" }, headers),
                        qsObj: qsObj,
                        payload: payload,
                    };
                    _a = exports.XFetchConfig.onBeforeFetch;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, exports.XFetchConfig.onBeforeFetch(options)];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    _a;
                    // if (payload) options.body = JSON.stringify(payload);
                    if (options.qsObj) {
                        queryString = Object.keys(options.qsObj)
                            .map(function (key) {
                            return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(options.qsObj[key]));
                        })
                            .join("&");
                        url += "?".concat(queryString);
                    }
                    return [4 /*yield*/, fetch(url, {
                            headers: options.headers || {},
                            body: options.payload ? JSON.stringify(options.payload) : undefined,
                            method: options.method,
                            signal: signal,
                        })];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.xFetch = xFetch;
var useXFetch = function (url, qsObj, method, payload, headers) {
    if (url === void 0) { url = "/"; }
    if (qsObj === void 0) { qsObj = {}; }
    if (method === void 0) { method = "get"; }
    if (payload === void 0) { payload = null; }
    if (headers === void 0) { headers = {}; }
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(null), data = _c[0], setData = _c[1];
    var _d = (0, react_1.useState)(""), status = _d[0], setStatus = _d[1];
    var _e = (0, react_1.useState)(0), count = _e[0], setCount = _e[1];
    var _f = (0, react_1.useState)(false), loadSilently = _f[0], setLoadSilently = _f[1];
    var _g = (0, react_1.useState)(0), statusCode = _g[0], setStatusCode = _g[1];
    var _h = (0, react_1.useState)(null), controller = _h[0], setController = _h[1];
    var cancel = function () {
        if (controller && controller.abort())
            setStatus("cancelled");
        setController(null);
    };
    (0, react_1.useEffect)(function () {
        var doit = function () {
            if (count > 0) {
                if (controller) {
                    cancel();
                    setCount(count + 1);
                }
                else {
                    !loadSilently && setIsLoading(true);
                    setError(null);
                    setStatus("loading");
                    var controller_1 = new AbortController();
                    setController(controller_1);
                    xFetch(url, method, payload, qsObj, headers, controller_1.signal)
                        .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        var _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    setStatusCode(response.status);
                                    if (!response.ok) return [3 /*break*/, 2];
                                    _a = setData;
                                    return [4 /*yield*/, response.json()];
                                case 1:
                                    _a.apply(void 0, [_d.sent()]);
                                    setStatus("success");
                                    setError(null);
                                    return [3 /*break*/, 4];
                                case 2:
                                    _b = setError;
                                    _c = {};
                                    return [4 /*yield*/, response.json()];
                                case 3:
                                    _b.apply(void 0, [(_c.body = _d.sent(),
                                            _c.message = "error occured",
                                            _c)]);
                                    setStatus("error");
                                    setData(null);
                                    _d.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        setError({ body: error, message: (error === null || error === void 0 ? void 0 : error.message) || "" });
                    })
                        .finally(function () {
                        setController(null);
                        setIsLoading(false);
                        setLoadSilently(false);
                    });
                }
            }
        };
        doit();
    }, [count]);
    (0, react_1.useEffect)(function () {
        return function () {
            cancel();
        };
    }, []);
    var call = function () {
        setCount(count + 1);
    };
    var callSilently = function () {
        setCount(count + 1);
        setLoadSilently(true);
    };
    return {
        isLoading: isLoading,
        data: data,
        error: error,
        status: status,
        call: call,
        cancel: cancel,
        callSilently: callSilently,
        statusCode: statusCode,
    };
};
exports.useXFetch = useXFetch;
var useXAsync = function (asyncFunction) {
    var _a = (0, react_1.useState)(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = (0, react_1.useState)(null), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var _d = (0, react_1.useState)("idle"), status = _d[0], setStatus = _d[1];
    var call = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!isLoading) return [3 /*break*/, 5];
                        setIsLoading(true);
                        setStatus("loading");
                        setError(null);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, asyncFunction.apply(void 0, args)];
                    case 2:
                        result = _a.sent();
                        setData(result);
                        setError(null);
                        setStatus("success");
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        if ((err_1 === null || err_1 === void 0 ? void 0 : err_1.name) !== "AbortError") {
                            setError(err_1);
                            setData(null);
                            setStatus("error");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return {
        isLoading: isLoading,
        data: data,
        error: error,
        status: status,
        call: call,
    };
};
exports.useXAsync = useXAsync;
function hasNonEmptyValue(obj) {
    for (var key in obj) {
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
// type Setters<T> = {
//   [K in keyof T as `set${Capitalize<string & K>}`]: (val: any) => void;
// };
// function generateSetters<T>(props: new ()=> T, set: Function): Setters<T> {
//   const setters: any = {};
//   for (const key in props) {
//     if (Object.prototype.hasOwnProperty.call(props, key)) {
//       const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
//       const setterName = `set${capitalizedKey}` as `set${Capitalize<
//         string & typeof key
//       >}`;
//       setters[setterName] = (newVal: any) => {
//         set(() => {
//           props[key] = newVal;
//         });
//       };
//     }
//   }
//   return setters as Setters<T>;
// }
// Example usage:
/// set("a", 10);
/// set();
///
function useXForm(CL, validateForm) {
    var name = CL.name;
    var _a = (0, react_1.useState)([]), globalError = _a[0], setGlobalError = _a[1];
    var _b = (0, react_1.useState)(new CL()), data = _b[0], setD = _b[1];
    var _c = (0, react_1.useState)(false), showValidations = _c[0], setShowValidations = _c[1];
    var resetErrors = function () {
        return resetPrimitiveValues(deepClone(data));
    };
    var _d = (0, react_1.useState)(resetErrors()), errors = _d[0], setE = _d[1];
    var _e = (0, react_1.useState)(0), count = _e[0], setCount = _e[1];
    var setData = function (fn) {
        var copy = deepClone(data);
        typeof fn === "function" && fn();
        var changeList = findDiff(copy, data);
        var logs = exports.yRefs[name].logs;
        Object.keys(changeList).forEach(function (key) {
            var _a;
            logs.unshift((_a = {}, _a[key] = changeList[key], _a));
            if (logs.length > 20) {
                logs.pop();
            }
        });
        resetErrors();
        showValidations && validateForm(data, errors);
        if (hasNonEmptyValue(errors)) {
        }
        else {
            setShowValidations(false);
        }
        setCount(count + 1);
        //@ts-ignore
        setD(Array.isArray(data) ? __spreadArray([], data, true) : __assign({}, data));
    };
    var setErrors = function (fn) {
        typeof fn === "function" && fn();
        setCount(count + 1);
        setE(__assign({}, errors));
    };
    if (!exports.yRefs[name]) {
        exports.yRefs[name] = {
            logs: [],
        };
    }
    (0, react_1.useEffect)(function () {
        return function () {
            delete exports.yRefs[name];
        };
    }, []);
    exports.yRefs[name] = __assign(__assign({}, exports.yRefs[name]), { data: data, errors: errors, resetForm: function (resetWith) {
            if (resetWith === void 0) { resetWith = new CL(); }
            setD(resetWith);
            setTimeout(function () {
                resetErrors();
                setShowValidations(false);
            }, 100);
        }, setData: setData, setErrors: setErrors, globalError: globalError, setGlobalError: setGlobalError, set: function (path, newVal) {
            setData(function () {
                setStateX(data, path, newVal);
            });
        }, setItem: function (key, newVal) {
            setData(function () {
                data[key] = newVal;
            });
        }, validate: function () {
            var _globalError = validateForm(data, errors);
            setShowValidations(true);
            _globalError && setGlobalError(_globalError);
            setCount(count + 1);
            if (hasNonEmptyValue(errors)) {
                return false;
            }
            else {
                return true;
            }
        }, resetErrors: resetErrors });
    return exports.yRefs[name];
    /// { }
    /// errors["test.test2"];
}
exports.useXForm = useXForm;
function getParentXForm(CL) {
    return exports.yRefs[CL.name];
}
exports.getParentXForm = getParentXForm;
// export function useXForm<T>(Obj: T, validateForm: Function) {
//   const [data, setD] = useState<T>(Obj);
//   const [showValidations, setShowValidations] = useState(false);
//   const resetErrors = () => {
//     return resetPrimitiveValues(deepClone(data));
//   };
//   const [errors, setE] = useState<T>(resetErrors());
//   const [count, setCount] = useState(0);
//   const setData = (fn: Function) => {
//     typeof fn === "function" && fn();
//     resetErrors();
//     showValidations && validateForm(data, errors);
//     if (hasNonEmptyValue(errors)) {
//     } else {
//       setShowValidations(false);
//     }
//     setCount(count + 1);
//     //@ts-ignore
//     setD(Array.isArray(data) ? [...data] : { ...data });
//   };
//   const setErrors = (fn: Function) => {
//     typeof fn === "function" && fn();
//     setCount(count + 1);
//     setE({ ...errors });
//   };
//   return {
//     data,
//     errors,
//     resetForm: (resetWith: any = Obj) => {
//       setD(resetWith);
//       setTimeout(() => resetErrors(), 100);
//     },
//     setData,
//     // showErrors: showValidations,
//     // setShowErros: setShowValidations,
//     setErrors,
//     validate: (): boolean => {
//       validateForm(data, errors);
//       setShowValidations(true);
//       setCount(count + 1);
//       if (hasNonEmptyValue(errors)) {
//         return false;
//       } else {
//         return true;
//       }
//     },
//     resetErrors,
//   };
// }
function resetPrimitiveValues(obj) {
    // Base case: if obj is not an object, return an empty string
    if (typeof obj !== "object" || obj === null) {
        return "";
    }
    // Recursive case: obj is an object, so we iterate over its properties
    for (var key in obj) {
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
// usePrimitive
function useQ(val) {
    var setState = function (val) {
        set(__assign(__assign({}, state), { val: val }));
    };
    var _a = (0, react_1.useState)({
        val: val,
        set: setState,
    }), state = _a[0], set = _a[1];
    state.set = setState;
    return __assign(__assign({}, state), { setQ: function (pathToObjectToChange, newVal) {
            setStateX(state, pathToObjectToChange.split(".").slice(1).join("."), newVal);
            setState(state.val);
        } });
}
exports.useQ = useQ;
function xEvents(arr) {
    var result = {};
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        result[item] = { name: item };
    }
    return result;
}
exports.xEvents = xEvents;
function usePagination(initialPage, initialTotalPages, initialItemsPerPage) {
    if (initialPage === void 0) { initialPage = 1; }
    if (initialTotalPages === void 0) { initialTotalPages = -1; }
    if (initialItemsPerPage === void 0) { initialItemsPerPage = 10; }
    var _a = (0, react_1.useState)(initialPage), currentPage = _a[0], setPage = _a[1];
    var _b = (0, react_1.useState)(initialTotalPages), totalPages = _b[0], setTotalPages = _b[1];
    var _c = (0, react_1.useState)(initialItemsPerPage), itemsPerPage = _c[0], setItemsPerPage = _c[1];
    var next = function () {
        setPage(function (prevPage) { return prevPage + 1; });
    };
    var prev = function () {
        setPage(function (prevPage) { return Math.max(prevPage - 1, 1); });
    };
    var resetPage = function () {
        setPage(1);
        setTotalPages(-1);
    };
    return {
        currentPage: currentPage,
        setPage: setPage,
        next: next,
        prev: prev,
        setTotalPages: setTotalPages,
        itemsPerPage: itemsPerPage,
        totalPages: totalPages,
        setItemsPerPage: setItemsPerPage,
        resetPage: resetPage,
    };
}
exports.usePagination = usePagination;
function TimeRenderer(_a) {
    var time = _a.time;
    var _b = (0, react_1.useState)(0), count = _b[0], setCount = _b[1];
    (0, react_1.useEffect)(function () {
        var clear = setInterval(function () {
            setCount(count + 1);
        }, 10000);
        return function () {
            clearInterval(clear);
        };
    }, [count]);
    return (0, jsx_runtime_1.jsx)("span", { children: Timer(time) });
}
function hasScrollReachedTheEnd(event, reverse) {
    if (reverse === void 0) { reverse = false; }
    if (event.target === document) {
        // Document scroll
        var windowHeight = window.innerHeight;
        var scrollY_1 = window.scrollY;
        var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        if (reverse) {
            return scrollY_1 === 0;
        }
        else {
            return scrollY_1 + windowHeight >= documentHeight;
        }
    }
    else if (event.target instanceof HTMLElement) {
        // Element scroll
        var element = event.target;
        var scrollTop = element.scrollTop;
        var scrollHeight = element.scrollHeight;
        var clientHeight = element.clientHeight;
        if (reverse) {
            return scrollTop === 0;
        }
        else {
            return scrollTop + clientHeight >= scrollHeight;
        }
    }
    else {
        // Window scroll
        var scrollHeight = document.documentElement.scrollHeight;
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = window.innerHeight;
        if (reverse) {
            return scrollTop === 0;
        }
        else {
            return scrollTop + clientHeight >= scrollHeight;
        }
    }
}
exports.hasScrollReachedTheEnd = hasScrollReachedTheEnd;
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(function (item) { return deepClone(item); });
    }
    return Object.keys(obj).reduce(function (acc, key) {
        acc[key] = deepClone(obj[key]);
        return acc;
    }, {});
}
exports.deepClone = deepClone;
function getMethodNames(obj) {
    var methodNames = [];
    var prototype = obj;
    while (prototype && prototype !== Object.prototype) {
        var keys = Reflect.ownKeys(prototype);
        keys.forEach(function (key) {
            var value = prototype[key];
            if (typeof value === "function" && key !== "constructor") {
                methodNames.push(key);
            }
        });
        prototype = Object.getPrototypeOf(prototype);
    }
    return methodNames;
}
function getFunctionParameterNames(func) {
    var functionString = func.toString();
    var parameterList = functionString
        .slice(functionString.indexOf("(") + 1, functionString.lastIndexOf(")"))
        .split(",")
        .map(function (param) { return param.trim(); });
    var namedParameters = [];
    var isRestParameter = false;
    for (var _i = 0, parameterList_1 = parameterList; _i < parameterList_1.length; _i++) {
        var param = parameterList_1[_i];
        if (param.startsWith("...")) {
            // Handle rest parameter
            var paramName = param.substring(3).trim();
            isRestParameter = true;
            // Add the rest parameter and exit the loop
            namedParameters.push("...".concat(paramName));
            break;
        }
        else if (param.includes("{") || param.includes("[")) {
            throw new Error("Destructuring or invalid parameter found");
        }
        else {
            // Handle named parameter
            var defaultIndex = param.indexOf("=");
            if (defaultIndex !== -1) {
                // Handle default parameter
                var paramName = param.substring(0, defaultIndex).trim();
                namedParameters.push(paramName);
            }
            else {
                namedParameters.push(param);
            }
        }
    }
    if (isRestParameter) {
        // If there's a rest parameter, return just that
        return namedParameters;
    }
    else {
        // Return the named parameters
        return namedParameters;
    }
}
function objFromArray(keys, values) {
    if (keys.length > values.length) {
        throw new Error("Keys array is longer than values array");
    }
    var result = {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key.startsWith("...")) {
            var restKey = key.substring(3);
            result[restKey] = values.slice(i);
            break;
        }
        else {
            result[key] = values[i];
        }
    }
    return result;
}
// function buildFakePropsByIndex(length: number) {
//   let t = [];
//   for (let i = 1; i < length+1; i++) {
//     t.push("prop" + i);
//   }
//   return t;
// }
function buildPayload(fn, props) {
    try {
        var params = getFunctionParameterNames(fn);
        return params.join("").trim().split("").length > 0
            ? objFromArray(params, props)
            : props;
    }
    catch (e) {
        return props;
    }
}
function buildObjectOrArrayPreview(obj) {
    var val = Object.keys(obj).slice(0, 5).join(", ");
    if (val.length > 10)
        val = val.substring(0, 15) + "...";
    else if (Object.keys(obj).length > 4) {
        val = val + "...";
    }
    return Array.isArray(obj) ? "[" + val + "]" : "{" + val + "}";
}
function Timer(targetTime) {
    if (!targetTime || typeof targetTime !== "string") {
        return "";
    }
    var now = new Date();
    var target = new Date();
    var _a = targetTime.split(":").map(Number), hh = _a[0], mm = _a[1], ss = _a[2], ms = _a[3];
    target.setHours(hh);
    target.setMinutes(mm);
    target.setSeconds(ss);
    target.setMilliseconds(ms);
    var timeDifference = now - target;
    if (timeDifference < 2000) {
        return "Just now";
    }
    else if (timeDifference < 60000) {
        var secondsAgo = Math.floor(timeDifference / 1000);
        return "".concat(secondsAgo, " s ago");
    }
    else if (timeDifference < 3600000) {
        var minutesAgo = Math.floor(timeDifference / 60000);
        return "".concat(minutesAgo, " m ago");
    }
    else {
        return targetTime;
    }
}
function formatTimeExtended(timeString) {
    var _a = timeString.split(":").map(Number), hh = _a[0], mm = _a[1], ss = _a[2], ms = _a[3];
    var date = new Date(); // Create a new Date object
    date.setHours(hh);
    date.setMinutes(mm);
    date.setSeconds(ss);
    date.setMilliseconds(ms);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    var amPm = hours >= 12 ? "pm" : "am";
    if (hours > 12) {
        hours -= 12;
    }
    else if (hours === 0) {
        hours = 12;
    }
    var formattedTime = hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        " " +
        amPm +
        ", " +
        seconds.toString() +
        "s, " +
        milliseconds.toString() +
        "ms";
    return formattedTime;
}
