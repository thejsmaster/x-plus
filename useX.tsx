import React, { Component, ReactNode, useEffect, useState } from "react";
import "./App.css";
export const xRefs: any = {};
export const yRefs: any = {};
export const xConfig = {
  enableDebugging: false,
  enableConsoleLogging: false,
  autoDestructureState: false,
};
const listeners: any = {
  onStateChange: null,
};
export function getParentState<T, S>(
  CL: new () => T,
  Selectors?: new () => S
): TReturnVal<T, S> & T {
  //

  let label = CL.name;

  const item = xRefs[label];
  if (!item) {
    throw Error(
      "Error Occured in getParentState. The requested state is not created by any of the parent components."
    );
  }
  return {
    triggerEvent: item.triggerEvent,
    xlog: item.log,
    setX: item.setX,
    ...item.state,
    ...item.actions,
  };
}

export const getX = getParentState;
export const getParentX = getParentState;

interface Channel {
  [key: string]: ((data: any) => void)[];
}

const channels: Channel = {};

export const postMessage = (channelName: string, ...props: any) => {
  const channelCallbacks = channels[channelName] || [];
  channelCallbacks.forEach((cb: Function) => {
    cb(...props);
  });
};

export const dispatch = (label: string, fn: Function, ...props: any) => {
  xRefs[label]?.set(fn, ...props);
};

export const useXChannel = (
  channelName: string,
  callback?: (...props: any[]) => void
) => {
  if (!channels[channelName]) {
    channels[channelName] = [];
  }

  const post = (...props: any) => {
    const channelCallbacks = channels[channelName] || [];
    channelCallbacks.forEach((cb: Function) => {
      cb !== callback && cb(...props);
    });
  };

  useEffect(() => {
    if (callback) {
      channels[channelName].push(callback);
    }

    return () => {
      if (callback) {
        const index = channels[channelName].indexOf(callback);
        if (index !== -1) {
          channels[channelName].splice(index, 1);
        }
      }
    };
  }, [channelName, callback]);

  return post;
};
export const getListenerCount = (ChannelName: string) => {
  return channels[ChannelName]?.length || 0;
};
export function getCallStack(splitIndex = 3) {
  const stack = new Error().stack;
  const stackLines = stack?.split("\n")[splitIndex]?.trim()?.split("(") || [];
  const functionName =
    stackLines?.length > 1
      ? stackLines?.[0]?.split(" ")[1].trim()
      : "Anonymous";
  const fileNameLineNumber = stackLines?.[stackLines?.length > 1 ? 1 : 0];
  const fileNames = fileNameLineNumber?.split("?")?.[0]?.split("/");
  const fileName = fileNames?.[fileNames?.length - 1];
  const lineNumber = fileNameLineNumber?.split("?")?.[1]?.split(":")?.[1];
  return {
    functionName,
    fileName,
    lineNumber,
  };
}

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

export function findDiff(obj1: any, obj2: any, path = ""): Record<string, any> {
  const changes: Record<string, any> = {};
  if (
    typeof obj1 === "object" &&
    obj1 !== null &&
    typeof obj2 === "object" &&
    obj2 !== null
  ) {
    for (const key in obj1) {
      const newPath = path ? `${path}.${key}` : key;
      if (obj2.hasOwnProperty(key)) {
        const nestedChanges = findDiff(obj1[key], obj2[key], newPath);
        Object.assign(changes, nestedChanges);
      } else {
        changes[`${newPath} [D]`] = "deleted";
      }
    }
    for (const key in obj2) {
      const newPath = path ? `${path}.${key}` : key;
      if (!obj1.hasOwnProperty(key)) {
        changes[`${newPath} [A]`] = obj2[key];
      }
    }
  } else if (obj1 !== obj2) {
    changes[`${path} [M]`] = obj2;
  }

  return changes;
}

const mountRefsCount: any = {};

export function useXOnAction(fnCallback: Function, actions: Function[]) {
  useXChannel("useX", (type: Function) => {
    if (actions.includes(type)) {
      fnCallback();
    }
  });
}
type actionType = <T extends (...args: any[]) => any>(
  actionMethod: T,
  ...args: Parameters<T>
) => ReturnType<T>;

type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type PropertiesOnly<T> = Pick<Readonly<T>, NonFunctionKeys<T>>;
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

type TReturnVal<T, S> = {
  // state: Readonly<T>;
  // set: actionType;
  // data: PropertiesOnly<T>;
  // actions: MethodsOnly<T>;
  // stateChanged: number;
  // onPlus: Function;
  // refs: any;
  // plus: actionType;
  // name: string;
  // dispatch: actionType;
  triggerEvent: (xEventobject: { name: string }) => void;
  xlog: (title: string, valueToLog: any) => void;
  setX: (pathOfObjectToUpdate: string, newVal: any) => void;
  selectors: S;
};

export function useX<T extends Object, S extends Object>(
  CL: new () => T,
  Selectors?: new () => S
): TReturnVal<T, S> & T {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        listeners?.onStateChange && listeners.onStateChange();
      }, 200);
    }
  }, [count]);

  let label = CL.name;

  const intiate = () => {
    if (!xRefs[label]) {
      let state = new CL();
      state = destructureWithProto(state);
      xRefs[label] = {
        state,
        label,
        setLogs: [],
        refs: {},
        index: 0,
        xlogs: [],
        eventLogs: [],
      };
      xRefs[label].selectors = Selectors ? new Selectors() : {};

      //@ts-ignore
      state && state.onChange && state.onChange();
      xRefs[label].actions = buildActions(label);
    }
  };
  const setAgain = () => {
    if (!xRefs[label]) {
      intiate();
    }
    xRefs[label].set = (fn: Function, ...props: any) => {
      const timeStart = Date.now();

      const copy = deepClone(xRefs[label].state);
      let errorOccured = false;
      let errorMessage = "";
      try {
        if (typeof fn === "function") {
          fn.apply(xRefs[label].state, props);
          postMessage("useX", fn);
          // actions.push(fn);
          // xRefs[label].state = { ...xRefs[label].state };
        }
      } catch (e: any) {
        console.error(e);
        errorOccured = true;
        errorMessage = e?.message;
      }

      let { fileName, functionName, lineNumber }: any = getCallStack();
      let fname = fileName.split("/")[fileName.split("/").length - 1];
      const updateSet = () => {
        let changeList: any = {};
        if (copy) {
          changeList = findDiff(copy, xRefs[label].state);
          if (changeList && Object.keys(changeList).length > 0) {
            [...Object.keys(changeList)].forEach((key: string) => {
              changeList["state." + key] = changeList[key];
              delete changeList[key];
            });
          }
        }
        Object.keys(changeList).forEach((path) => {
          if (path) {
            updateNestedObject(
              xRefs[label].state,
              path
                .split(".")
                .slice(1, path.split(".").length - 1)
                .join(".")
            );
          }
        });

        if (xConfig.enableDebugging) {
          let payload = [...props].length > 0 ? props : undefined;
          if ([...props].length > 0) payload = buildPayload(fn, [...props]);
          const log = {
            fileName: fname.split("?")[0],
            functionName: functionName || "Set",
            lineNumber,
            changeList,
            payload,
            index: xRefs[label].index + 1,
            name: fn.name || "",
            errorOccured,
            errorMessage,
            duration: Date.now() - timeStart + " ms",
            at: formatTime(new Date()),
            time: +new Date(),
          };
          xConfig.enableConsoleLogging &&
            console.log("useX - " + log.name, log);
          xConfig.enableConsoleLogging &&
            console.log("useX - updated state", xRefs[label]?.state);
          xRefs[label].setLogs.unshift(log);
          xRefs[label].index++;
          xRefs[label].setLogs.length > 15 && xRefs[label].setLogs.pop();
        }
        Object.keys(changeList).length > 0 && setCount(count + 1);
      };
      xRefs[label].state.onChange && xRefs[label].state.onChange();
      updateSet();
      xRefs[label].state = { ...xRefs[label].state };
    };

    xRefs[label].stateChanged = count;
    xRefs[label].triggerEvent = (xEventobject: any) => {
      let state = xRefs[label].state;
      if (state.events?.[xEventobject?.name]) {
        state.events[xEventobject.name] = { ...xEventobject };
        xRefs[label].eventLogs.unshift({
          [xEventobject.name]:
            "triggered at " + formatTimeExtended(formatTime(new Date())),
        });
        setCount(count + 1);
      } else {
        throw Error(
          "event is not declared on X Class. refer to the documentation on xEvents!"
        );
      }
    };
    xRefs[label].setX = (pathOfObjectToUpdate: string, value: any) => {
      const timeStart = Date.now();
      let errorOccured = false;
      let errorMessage = "";
      try {
        if (typeof pathOfObjectToUpdate === "string") {
          setStateX(
            xRefs[label].state,
            pathOfObjectToUpdate.split(".").slice(1).join("."),
            value
          );
        }
      } catch (e: any) {
        console.error(e);
        errorOccured = true;
        errorMessage = e?.message;
      }

      const updateSet = () => {
        let { fileName, functionName, lineNumber }: any = getCallStack();
        let fname = fileName.split("/")[fileName.split("/").length - 1];
        let changeList: any = {};

        changeList = { [pathOfObjectToUpdate]: value };

        const log = {
          fileName: fname.split("?")[0],
          functionName: functionName || "SetX",
          lineNumber,
          changeList,
          payload: value,
          at: formatTime(new Date()),
          index: xRefs[label].index + 1,
          name: "setX",
          errorOccured,
          errorMessage,
          duration: Date.now() - timeStart + " ms",
        };
        xConfig.enableConsoleLogging && console.log("useX - " + log.name, log);
        xConfig.enableConsoleLogging &&
          console.log("useX - updated state", xRefs[label]?.state);
        xRefs[label].setLogs.unshift(log);
        xRefs[label].index++;
        xRefs[label].setLogs.length > 15 && xRefs[label].setLogs.pop();
      };
      xRefs[label].state.onChange && xRefs[label].state.onChange();
      xConfig.enableDebugging && updateSet();
      xRefs[label].state = { ...xRefs[label].state };

      pathOfObjectToUpdate && setCount(count + 1);
    };
    xRefs[label].xlog = (logName: string, logValue: any) => {
      if (xConfig.enableDebugging) {
        xRefs[label]?.xlogs?.unshift({ [logName]: logValue });
        if (xRefs[label]?.xlogs?.length > 20) {
          xRefs[label]?.xlogs?.pop();
        }
      }
    };

    // xRefs[label].actionEvents = xEvents(getMethodNames(xRefs[label].actions));
  };
  setAgain();
  useEffect(() => {
    setAgain();
    if (mountRefsCount[label]) {
      throw Error(
        "Don't intialise useX " +
          label +
          " again!. use 'getParentX(" +
          label +
          ")' to get the instance of already created useX instance of " +
          label
      );
    } else {
      mountRefsCount[label] = 1;
    }
    return () => {
      delete xRefs[label];
      delete mountRefsCount[label];
      listeners?.onStateChange && listeners.onStateChange();
    };
  }, []);

  //
  return {
    // state: xRefs[label].state,
    // set: xRefs[label].set,
    // name: xRefs[label],
    // dispatch: xRefs[label].set,
    // actions: xRefs[label].actions,
    // stateChanged: count,
    // plus: xRefs[label].set,
    // refs: xRefs[label].refs,
    // // onPlus: xRefs[label].onPlus,
    triggerEvent: xRefs[label].triggerEvent,
    xlog: xRefs[label].xlog,
    selectors: xRefs[label].selectors,
    setX: xRefs[label].setX,
    ...xRefs[label].state,
    ...xRefs[label].actions,
  };
}

type MethodKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

type MethodsOnly<T> = Pick<T, MethodKeys<T>>;

export function buildActions<T>(label: string): {
  methods: MethodsOnly<T>;
} {
  let methods = xRefs[label]?.state ? getMethodNames(xRefs[label].state) : [];
  let actions: any = {};
  methods.forEach((item: any) => {
    actions[item] = function (...props: any) {
      xRefs[label].set(xRefs[label].state[item], ...props);
    };
  });

  return actions as { methods: MethodsOnly<T> };
}

function destructureWithProto(obj: any) {
  const result = { ...obj };
  const prototype = Object.getPrototypeOf(obj);

  if (prototype) {
    const prototypeProps = Object.getOwnPropertyNames(prototype);

    for (const prop of prototypeProps) {
      if (prop) result[prop] = prototype[prop];
    }
  }

  return result;
}
function updateNestedObject<T>(obj: T, path: string): T {
  if (path) {
    const keys = path.split(".");
    const newObj = obj;
    let current: any = newObj;

    if (keys.length)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };
        current = current[key];
      }

    return newObj;
  }
  return obj;
}
export function setStateX<T>(obj: T, path: string, value: any): T {
  const keys = path.split(".");
  const newObj = obj;
  let current: any = newObj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key])
      ? [...current[key]]
      : { ...current[key] };
    if (i + 1 !== keys.length) {
      current = current[key];
    } else {
      current[key] = value;
    }
  }

  return newObj;
}
export const Collapsable = ({ children, label, isUseXState = true }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        key={label}
        style={{
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
        }}
        onMouseDown={() => setOpen(!open)}
      >
        <span
          style={{
            display: "inline-block",
            paddingLeft: "5px",
            fontSize: "16px",
          }}
        >
          <b>{label}</b>
        </span>{" "}
        {!open && isUseXState && (
          <b style={{ float: "right", color: "green", fontSize: "small" }}>
            {xRefs[label].index > 0 ? xRefs[label].index : ""}
          </b>
        )}
      </div>
      {open && (
        <div
          style={{
            padding: "10px 30px",
            background: "rgb(252, 252, 252)",
            fontSize: "14px",
            paddingBottom: "45px",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export const ErrorComponent = ({ Error, message }: any) => {
  console.error(Error);
  return (
    <span title={Error?.stack || ""} style={{ color: "red" }}>
      {message} check console for details
    </span>
  );
};

interface ErrorBoundaryProps {
  Error: (error: Error, message: string) => ReactNode;
  children?: any;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorMessage: string;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorMessage: "",
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
      errorMessage: error.message,
    });
  }

  render() {
    const { error, errorMessage } = this.state;
    const { Error }: any = this.props;

    if (error) {
      return <Error error={error} message={errorMessage} />;
    }

    return this.props && this.props.children ? (
      <>{this.props.children}</>
    ) : (
      <>Error</>
    );
  }
}

export const LabelRenderer = ({ label }: any) => {
  return (
    <span>
      {label.endsWith("[M]") ? (
        <span title={"Modified"} style={{ color: "#bc7a00" }}>
          {/* <span
              style={{ color: "#bc7a00", fontSize: "large", fontWeight: "bold" }}
            >
              *
            </span>{" "} */}
          {label.substr(0, label.length - 3)}{" "}
        </span>
      ) : label.endsWith("[A]") ? (
        <span title={"Added"} style={{ color: "green" }}>
          {/* <span
              style={{ color: "green", fontSize: "large", fontWeight: "bold" }}
            >
              +
            </span> */}
          {label.substr(0, label.length - 3)}{" "}
        </span>
      ) : label.endsWith("[D]") ? (
        <span title={"Deleted"} style={{ color: "#df0000" }}>
          {/* <span style={{ color: "red", fontSize: "large", fontWeight: "bold" }}>
              -
            </span> */}
          {label.substr(0, label.length - 3)}{" "}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </span>
  );
};

export const StateView = ({
  state,
  boldFont = true,
  autoOpenFirstLevel = false,
}: any) => {
  return (
    <ErrorBoundary Error={ErrorComponent}>
      <div style={{ marginLeft: "-30px" }}>
        <Treeview
          autoOpenFirstLevel={autoOpenFirstLevel}
          state={state}
          boldFont={boldFont}
        />
      </div>
    </ErrorBoundary>
  );
};

export const Switch = ({ State }: any) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ["State", "Dispatch Logs", "Events", "xLogs"];
  const [count, setCount] = useState(0);

  const spanStyle = (isSelected: boolean) => {
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

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          paddingBottom: "5px",
          width: "100%",
          margin: "0 auto",
          marginBottom: "10px",
          textAlign: "left",
        }}
      >
        {tabs.map((item, i) => (
          <span
            key={i}
            onMouseDown={() => setSelectedTab(i)}
            //@ts-ignore
            style={spanStyle(selectedTab === i)}
          >
            {item} {i === 1 && <ValueRenderer text={State.index} />}
          </span>
        ))}
      </div>
      <div style={{ display: selectedTab === 0 ? "block" : "none" }}>
        <StateView state={State.state} />
      </div>

      <div style={{ display: selectedTab === 1 ? "block" : "none" }}>
        {State.setLogs.length > 0 && (
          <div style={{ textAlign: "right" }}>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                State.setLogs = [];
                State.index = 0;
                setCount(count + 1);
              }}
            >
              <i>Clear Logs</i>
            </span>
          </div>
        )}

        {State.setLogs?.map((log: any, index: number) => {
          let lastone = State.setLogs[index - 1];
          let timeDurationSinceLast = lastone ? lastone.time - log.time : 0;
          let groupLog = false;
          if (
            lastone &&
            timeDurationSinceLast < 2000 &&
            lastone.functionName === log.functionName
          ) {
            groupLog = true;
          }
          return (
            <div
              key={" set " + index + log.name}
              style={{
                // background: Timer(log.at) === "Just now" ? "#EEE" : "none",
                borderTop:
                  timeDurationSinceLast < 2000 || index == 0
                    ? "none"
                    : "1px solid #CCC",
                marginBottom: "5px",
                marginTop: groupLog ? "-10px" : "0px",
                paddingBottom: "5px",

                position: "relative",
              }}
            >
              {!groupLog && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <span
                    style={{
                      // backgroundColor: "#EEE",
                      padding: "2px 5px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      textAlign: "left",
                      fontSize: "16px",
                      // background: "#EFEFEF",
                    }}
                  >
                    {/* {log.functionName}() */}
                  </span>{" "}
                  <span style={{ color: "#777" }}></span>
                  <span style={{}}>
                    <TimeRenderer time={log.at} />
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  verticalAlign: "top",
                  width: "330px",
                }}
              >
                <StateView
                  autoOpenFirstLevel={false}
                  state={
                    {
                      [log.name]: {
                        changes: log.changeList,
                        payload: log.payload,
                        from: log.fileName,
                        "triggered at": formatTimeExtended(log.at),
                      },
                    } || {}
                  }
                />{" "}
                <div
                  style={{ position: "absolute", top: "6px", right: "50px" }}
                >
                  ~ {log.duration}
                </div>
                <div
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    marginTop: "10px",
                    right: "5px",
                    top: "-3px",
                  }}
                >
                  {log.index}
                </div>
                <div
                  title={
                    log.errorOccured
                      ? "check console for error deails"
                      : "Success"
                  }
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    marginTop: "10px",
                    right: "30px",
                    top: "3px",
                    borderRadius: "30px",
                    width: "10px",
                    height: "10px",
                    background: log.errorOccured ? "red" : "green",
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "10px" }}></div>

      <div style={{ display: selectedTab === 2 ? "block" : "none" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          Registered Events (
          {State.state?.events ? Object.keys(State.state?.events).length : 0}){" "}
          {":"}
        </div>
        <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
          {State.state?.events &&
            Object.keys(State.state?.events).map((item: any) => (
              <div>
                <b>{item}</b>
              </div>
            ))}
        </div>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          Logs ({State.eventLogs.length.toString()}):
        </div>
        {State.eventLogs.map((item: any, i: number) => (
          <div style={{ paddingLeft: "10px" }}>
            <span>{State.eventLogs.length - i} </span>
            <span style={{ display: "inline-block" }}>
              {" "}
              <StateView state={item} autoOpenFirstLevel={true} />
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: selectedTab === 3 ? "block" : "none" }}>
        {State.xlogs.length > 0 && (
          <div style={{ textAlign: "right" }}>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                State.xlogs = [];
                setCount(count + 1);
              }}
            >
              <i>Clear Logs</i>
            </span>
          </div>
        )}{" "}
        {State?.xlogs &&
          State?.xlogs.map((log: any, i: number) => (
            <div key={State.xlogs.length - i}>
              <StateView state={log} />
            </div>
          ))}
      </div>
    </div>
  );
};
export const SwitchY = ({ State }: any) => {
  debugger;
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ["data", "errors", "globalError", "logs"];
  const [count, setCount] = useState(0);

  const spanStyle = (isSelected: boolean) => {
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

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          paddingBottom: "5px",
          width: "100%",
          margin: "0 auto",
          marginBottom: "10px",
          textAlign: "left",
        }}
      >
        {tabs.map((item, i) => (
          <span
            key={i}
            onMouseDown={() => setSelectedTab(i)}
            //@ts-ignore
            style={spanStyle(selectedTab === i)}
          >
            {item}
          </span>
        ))}
      </div>
      <div style={{ display: selectedTab === 0 ? "block" : "none" }}>
        <StateView state={State.data} />
      </div>
      <div style={{ display: selectedTab === 1 ? "block" : "none" }}>
        <StateView state={State.errors} />
      </div>
      <div style={{ display: selectedTab === 2 ? "block" : "none" }}>
        <div>{State.globalError}</div>
      </div>

      <div style={{ display: selectedTab === 3 ? "block" : "none" }}>
        {State.logs.length > 0 && (
          <div style={{ textAlign: "right" }}>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                State.logs = [];
                // State.index = 0;
                setCount(count + 1);
              }}
            >
              <i>Clear Logs</i>
            </span>
          </div>
        )}

        {State.logs.map((log: any, index: number) => (
          <div key={index}>
            {" "}
            <StateView state={log} />
          </div>
        ))}

        {/* {State.logs?.map((log: any, index: number) => {
          // let lastone = State.logs[index - 1];
          // let timeDurationSinceLast = lastone ? lastone.time - log.time : 0;
          // let groupLog = false;
          // if (
          //   lastone &&
          //   timeDurationSinceLast < 2000 &&
          //   lastone.functionName === log.functionName
          // ) {
          //   groupLog = true;
          // }
          return (
            <div
              key={" set " + index + log.name}
              style={{
                // background: Timer(log.at) === "Just now" ? "#EEE" : "none",
                // borderTop:
                //   timeDurationSinceLast < 2000 || index == 0
                //     ? "none"
                //     : "1px solid #CCC",
                marginBottom: "5px",
                // marginTop: groupLog ? "-10px" : "0px",
                paddingBottom: "5px",

                position: "relative",
              }}
            >
              {!groupLog && (
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <span
                    style={{
                      padding: "2px 5px",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      textAlign: "left",
                      // background: "#EFEFEF",
                    }}
                  >
                    {log.functionName}() - {log.fileName}
                  </span>
                  <span style={{ float: "right" }}>
                    <TimeRenderer time={log.at} />
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  verticalAlign: "top",
                  width: "330px",
                }}
              >
                <StateView
                  autoOpenFirstLevel={false}
                  state={
                    {
                      [log.name]: {
                        changes: log.changeList,
                        payload: log.payload,
                        // from: log.fileName,
                        "triggered at": formatTimeExtended(log.at),
                      },
                    } || {}
                  }
                />{" "}
                <div
                  style={{ position: "absolute", top: "6px", right: "50px" }}
                >
                  ~ {log.duration}
                </div>
                <div
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    marginTop: "10px",
                    right: "5px",
                    top: "-3px",
                  }}
                >
                  {log.index}
                </div>
                <div
                  title={
                    log.errorOccured
                      ? "check console for error deails"
                      : "Success"
                  }
                  style={{
                    position: "absolute",
                    textAlign: "center",
                    marginTop: "10px",
                    right: "30px",
                    top: "3px",
                    borderRadius: "30px",
                    width: "10px",
                    height: "10px",
                    background: log.errorOccured ? "red" : "green",
                  }}
                ></div>
              </div>
            </div>
          );
        })} */}
      </div>

      {/* <div style={{ marginTop: "10px" }}></div>

      <div style={{ display: selectedTab === 2 ? "block" : "none" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          Registered Events (
          {State.state?.events ? Object.keys(State.state?.events).length : 0}){" "}
          {":"}
        </div>
        <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
          {State.state?.events &&
            Object.keys(State.state?.events).map((item: any) => (
              <div>
                <b>{item}</b>
              </div>
            ))}
        </div>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          Logs ({State.eventLogs.length.toString()}):
        </div>
        {State.eventLogs.map((item: any, i: number) => (
          <div style={{ paddingLeft: "10px" }}>
            <span>{State.eventLogs.length - i} </span>
            <span style={{ display: "inline-block" }}>
              {" "}
              <StateView state={item} autoOpenFirstLevel={true} />
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: selectedTab === 3 ? "block" : "none" }}>
        {State.xlogs.length > 0 && (
          <div style={{ textAlign: "right" }}>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                State.xlogs = [];
                setCount(count + 1);
              }}
            >
              <i>Clear Logs</i>
            </span>
          </div>
        )}{" "}
        {State?.xlogs &&
          State?.xlogs.map((log: any, i: number) => (
            <div key={State.xlogs.length - i}>
              <StateView state={log} />
            </div>
          ))}
      </div> */}
    </div>
  );
};
function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

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

export function XPlusWrapper(props: TXDevToolsProps) {
  const { enableDevTools = true, keepOpen = false } = props;
  return (
    <>
      <ErrorBoundary Error={ErrorComponent}>
        <div style={{ paddingRight: keepOpen ? "400px" : "0px" }}>
          {" "}
          {props.children && props.children}
        </div>
      </ErrorBoundary>
      {enableDevTools && (
        <ErrorBoundary Error={ErrorComponent}>
          <UseXDevTools {...props} />
        </ErrorBoundary>
      )}
    </>
  );
}

export const Treeview = ({ state, autoOpenFirstLevel = false }: any) => {
  const [openList, setOpen] = useState<string[]>([]);

  useEffect(() => {
    setOpen(
      autoOpenFirstLevel && typeof state === "object" ? Object.keys(state) : []
    );
  }, []);
  const toggleOpen = (key: string) => {
    if (openList.includes(key)) {
      setOpen(openList.filter((item) => item !== key));
    } else {
      setOpen([...openList, key]);
    }
  };
  return (
    <ErrorBoundary Error={ErrorComponent}>
      <div
        style={{
          paddingLeft: "25px",
          textAlign: "left",
          paddingBottom: "2px",
          minWidth: "300px",
          height: "auto",
          transition: "height 0.3s ease",
          color: "rgb(92 92 92)",
        }}
      >
        {" "}
        {Object.keys(state).length === 0 && (
          <i style={{ color: "#999" }}>
            {Array.isArray(state) ? "Array " : "Object "} is Empty
          </i>
        )}
        {Object.keys(state)
          .filter((key) => typeof state[key] !== "function")
          .map((item, i) => {
            return typeof state[item] === "object" && state[item] !== null ? (
              <div key={i}>
                <div
                  className="x-devtools-treview-header"
                  style={{
                    cursor: "pointer",
                    marginTop: "003px",
                    paddingBottom: "5px",
                    paddingLeft: "4px",
                  }}
                  onMouseDown={() => toggleOpen(item)}
                >
                  {" "}
                  <b>
                    <span
                      style={{ display: "inline-block", paddingTop: "5px" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="13"
                        viewBox="0 -960 960 960"
                        width="24"
                        style={{
                          transform: !openList.includes(item)
                            ? "rotate(-32deg)"
                            : "rotate(60deg)",
                          transition: "transform ease 0.2s",
                          marginRight: "0px",
                          fill: "#444",
                        }}
                      >
                        <path d="m80-160 400-640 400 640H80Z" />
                      </svg>
                    </span>
                    <LabelRenderer label={item} />{" "}
                  </b>
                  :{" "}
                  {Array.isArray(state[item]) ? (
                    <b>
                      <i
                        title="Array"
                        style={{ color: "#555", fontSize: "12px" }}
                      >
                        {state[item].length > 0
                          ? buildObjectOrArrayPreview(state[item])
                          : " []"}
                      </i>
                    </b>
                  ) : (
                    <b>
                      <i
                        title="Object"
                        style={{ color: "#555", fontSize: "12px" }}
                      >
                        {Object.keys(state[item]).length > 0
                          ? buildObjectOrArrayPreview(state[item])
                          : " {}"}
                      </i>
                    </b>
                  )}
                </div>
                {openList.includes(item) &&
                  state[item] &&
                  typeof state[item] === "object" && (
                    <Treeview state={state[item]} />
                  )}
              </div>
            ) : (
              <div style={{ marginTop: "3px", width: "auto" }}>
                <b style={{ marginLeft: "10px" }}>
                  <LabelRenderer label={item} />{" "}
                </b>
                : <ValueRenderer text={state[item]} />
              </div>
            );
          })}
      </div>
    </ErrorBoundary>
  );
};

export const UseXDevTools = ({
  XIconPosition = { bottom: "50px", right: "50px" },
  enableConsoleLogging = false,
  keepOpen = false,
  hideXPlusIcon = false,
  disableToggleESCKey = false,
}: TXDevToolsProps) => {
  const [showTools, setShowTools] = useState(keepOpen || false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    function handleKeyPress(event: any) {
      if (event.key === "Escape") {
        setShowTools(keepOpen || !showTools);
      }
    }

    if (!disableToggleESCKey) {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [showTools, setShowTools]);
  useEffect(() => {
    listeners.onStateChange = () => {
      setTimeout(() => setCount(count + 1), 50);
    };
    return () => {
      listeners.onStateChange = null;
    };
  }, [setCount, count]);

  xConfig.enableDebugging = true;
  xConfig.enableConsoleLogging = enableConsoleLogging;

  return (
    <ErrorBoundary Error={ErrorComponent}>
      <div id="xplus-devtools-container">
        {" "}
        <div
          id="usex-devtools"
          style={{
            zIndex: 1000000000,
            height: "100%",
            width: "420px",
            maxWidth: "100%",
            position: "fixed",
            // background: "rgb(250,250,250)",
            background: "white",
            transition: "right 0.2s ",
            top: 0,
            right: showTools ? "0px" : "-400px",
            color: "#444",
            overflow: "auto",
            boxShadow: "rgb(202 204 204) 0px 0px 10px 0px",

            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "white)",
              borderLeft: "1px solid #CCC",
              padding: "10px",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              x-plus Dev Tools
            </span>
          </div>

          <ErrorBoundary Error={ErrorComponent}>
            {Object.keys(xRefs).map((key: any) => {
              const stateValue = xRefs[key];
              return stateValue ? (
                <ErrorBoundary Error={ErrorComponent}>
                  <div key={key}>
                    <Collapsable label={key} state={stateValue}>
                      <ErrorBoundary Error={ErrorComponent}>
                        <Switch State={stateValue} />
                      </ErrorBoundary>
                    </Collapsable>
                  </div>
                </ErrorBoundary>
              ) : (
                <></>
              );
            })}
          </ErrorBoundary>
          <ErrorBoundary Error={ErrorComponent}>
            {Object.keys(yRefs).map((key: any) => {
              const stateValue = yRefs[key];
              return stateValue ? (
                <ErrorBoundary Error={ErrorComponent}>
                  <div key={key}>
                    <Collapsable
                      label={key + " (Y)"}
                      state={stateValue}
                      isUseXState={false}
                    >
                      <ErrorBoundary Error={ErrorComponent}>
                        <SwitchY State={stateValue} />
                      </ErrorBoundary>
                    </Collapsable>
                  </div>
                </ErrorBoundary>
              ) : (
                <></>
              );
            })}
          </ErrorBoundary>

          {Object.keys(xRefs).length === 0 && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              {" "}
              <i>No States are created using useX</i>
            </div>
          )}
        </div>
        {!hideXPlusIcon && (
          <div
            onMouseDown={() => {
              setShowTools(keepOpen || !showTools);
            }}
            id="usex-devtools-holder"
            style={{
              zIndex: 1000000001,
              width: "50px",
              height: "50px",
              //background: "#E74C3C",
              background: "green",
              borderRadius: "50px",
              position: "fixed",
              boxShadow: "0px 0px 10px 1px #CCC",
              cursor: "pointer",
              ...XIconPosition,
            }}
          >
            {/* <span
                className={"usex-devtools-dots"}
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "white",
                  width: "5px",
                  height: "5px",
                  left: "21.5px",
                  top: "10px",
                  position: "absolute",
                }}
              ></span>
              <span
                className={"usex-devtools-dots"}
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "white",
                  width: "5px",
                  height: "5px",
                  left: "12px",
                  top: "30px",
                  position: "absolute",
                }}
              ></span>
              <span
                className={"usex-devtools-dots"}
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  background: "white",
                  width: "5px",
                  height: "5px",
                  left: "32px",
                  top: "30px",
                  position: "absolute",
                }}
              ></span> */}
            <span
              style={{
                left: "14px",
                position: "absolute",
                top: "3px",
                fontFamily:
                  '"Comic Sans MS", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontWeight: "bold",
                fontSize: "25px",
                color: "white",
                fontStyle: "italic",
              }}
            >
              x
              <span
                style={{
                  display: "inline-block",
                  marginTop: "6px",
                  fontSize: "20px",
                  verticalAlign: "top",
                }}
              >
                +
              </span>
            </span>
            {/* //   style={{
            //     zIndex: 1000000001,
            //     width: "50px",
            //     height: "50px",
            //     background: "rgb(2 137 101)",
            //     borderRadius: "50px",
            //     position: "fixed",
  
            //     userSelect: "none",
            //     boxShadow: "0px 0px 10px 1px #CCC",
            //     cursor: "pointer",
            //     ...XIconPosition,
            //   }}
            // >
  
            // </div> */}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export const ValueRenderer = ({ text }: any) => {
  const [highlighted, setHighlighted] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    if (!firstRender) {
      setHighlighted(true);
      const timer = setTimeout(() => {
        setHighlighted(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
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

  return (
    <span
      title={text + ""}
      style={{
        ...highlightStyle,
        padding: "0px 5px",
        borderRadius: "4px",
      }}
    >
      {text === null ? (
        <span style={{ color: "orange" }}>null</span>
      ) : text === undefined ? (
        <span style={{ color: "orange" }}>undefined</span>
      ) : typeof text === "function" ? (
        <b>Function</b>
      ) : text === "" ? (
        <i>''</i>
      ) : typeof text === "string" ? (
        <span style={{ color: "#444" }}>{text}</span>
      ) : (
        (text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : "")
      )}
    </span>
  );
};
export type RequestParamsType = {
  url: string;
  method: string;
  payload: any;
  qsObj: any;
  headers: Record<string, string>;
};

export const XFetchConfig: {
  onBeforeFetch?: (requestParams: RequestParamsType) => void;
} = {
  onBeforeFetch: undefined,
};

export async function xFetch(
  url = "/",
  method = "get",
  payload = null,
  qsObj: any = {},
  headers = {},
  signal: any = null
) {
  // Create query string from qsObj

  const options: RequestParamsType = {
    url,
    method,
    headers: {
      "Content-Type": "application/json", // You can adjust headers as needed
      ...headers,
    },
    qsObj,
    payload,
  };

  XFetchConfig.onBeforeFetch && (await XFetchConfig.onBeforeFetch(options));

  // if (payload) options.body = JSON.stringify(payload);

  if (options.qsObj) {
    const queryString = Object.keys(options.qsObj)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(options.qsObj[key])}`
      )
      .join("&");

    url += `?${queryString}`;
  }

  return await fetch(url, {
    headers: options.headers || {},
    body: options.payload ? JSON.stringify(options.payload) : undefined,
    method: options.method,
    signal,
  });
  // const data = await response.json();

  // if (response.ok) {
  //   return data; // Resolve with the data if the API call is successful
  // } else {
  //
  //   throw new Error(
  //     JSON.stringify({
  //       status: response.status,
  //       statusText: response.statusText,
  //       error: response.body,
  //     })
  //   );
  // }
}
export const useXFetch = (
  url = "/",
  qsObj: Object | null = {},
  method = "get",
  payload: any = null,
  headers = {}
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("");
  const [count, setCount] = useState(0);
  const [loadSilently, setLoadSilently] = useState(false);
  const [statusCode, setStatusCode] = useState(0);

  const [controller, setController] = useState<any>(null);
  const cancel = () => {
    if (controller && controller.abort()) setStatus("cancelled");
    setController(null);
  };

  useEffect(() => {
    const doit = () => {
      if (count > 0) {
        if (controller) {
          cancel();
          setCount(count + 1);
        } else {
          !loadSilently && setIsLoading(true);
          setError(null);

          setStatus("loading");
          const controller = new AbortController();
          setController(controller);
          xFetch(url, method, payload, qsObj, headers, controller.signal)
            .then(async (response) => {
              setStatusCode(response.status);
              if (response.ok) {
                setData(await response.json());
                setStatus("success");
                setError(null);
              } else {
                setError({
                  body: await response.json(),
                  message: "error occured",
                });
                setStatus("error");
                setData(null);
              }
            })
            .catch((error) => {
              setError({ body: error, message: error?.message || "" });
            })
            .finally(() => {
              setController(null);
              setIsLoading(false);
              setLoadSilently(false);
            });
        }
      }
    };
    doit();
  }, [count]);
  useEffect(() => {
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

  return {
    isLoading,
    data,
    error,
    status,
    call,
    cancel,
    callSilently,
    statusCode,
  };
};

type Status = "idle" | "loading" | "success" | "error";

interface AsyncHookResult {
  isLoading: boolean;
  data: any | null;
  error: Error | null;
  status: Status;
  call: (...args: any[]) => Promise<void>;
}

export const useXAsync = (
  asyncFunction: (...args: any[]) => any
): AsyncHookResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const call = async (...args: any[]): Promise<void> => {
    if (!isLoading) {
      setIsLoading(true);
      setStatus("loading");
      setError(null);
      try {
        const result = await asyncFunction(...args);
        setData(result);
        setError(null);
        setStatus("success");
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setError(err);
          setData(null);
          setStatus("error");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    isLoading,
    data,
    error,
    status,
    call,
  };
};

export function hasNonEmptyValue(obj: any) {
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      if (typeof obj[key] === "string" && obj[key].trim() !== "") {
        return true;
      } else if (typeof obj[key] === "object" && hasNonEmptyValue(obj[key])) {
        return true;
      }
    }
  }
  return false;
}
type ValidationFunction<T> = (data: T, errors: T) => void;

type YReturnType<T> = {
  logs: any[];
  data: T;
  errors: T;
  resetForm: (resetWith?: T) => void;
  setData: (fn: () => void) => void;
  setErrors: (fn: () => void) => void;
  globalError: string;
  setGlobalError: React.Dispatch<React.SetStateAction<string>>;
  validate: () => boolean;
  resetErrors: () => T;
};

export function useY<T>(
  CL: new () => T,
  validateForm: ValidationFunction<T>
): YReturnType<T> {
  const name = CL.name;
  const [globalError, setGlobalError] = useState<string>("");

  const [data, setD] = useState<T>(new CL());
  const [showValidations, setShowValidations] = useState(false);

  const resetErrors = (): T => {
    return resetPrimitiveValues(deepClone(data));
  };

  const [errors, setE] = useState<T>(resetErrors());
  const [count, setCount] = useState(0);

  const setData = (fn: () => void) => {
    const copy = deepClone(data);
    typeof fn === "function" && fn();
    const changeList = findDiff(copy, data);
    const logs: any[] = yRefs[name].logs;

    Object.keys(changeList).forEach((key: any) => {
      logs.unshift({ [key]: changeList[key] });
      if (logs.length > 20) {
        logs.pop();
      }
    });

    resetErrors();
    showValidations && validateForm(data, errors);
    if (hasNonEmptyValue(errors)) {
    } else {
      setShowValidations(false);
    }

    setCount(count + 1);

    //@ts-ignore
    setD(Array.isArray(data) ? [...data] : { ...data });
  };

  const setErrors = (fn: () => void) => {
    typeof fn === "function" && fn();
    setCount(count + 1);
    setE({ ...errors });
  };

  if (!yRefs[name]) {
    yRefs[name] = {
      logs: [],
    };
  }

  useEffect(() => {
    return () => {
      delete yRefs[name];
    };
  }, []);

  yRefs[name] = {
    ...yRefs[name],
    data,
    errors,
    resetForm: (resetWith: T = new CL()) => {
      setD(resetWith);
      setTimeout(() => {
        resetErrors();
        setShowValidations(false);
      }, 100);
    },
    setData,
    setErrors,
    globalError,
    setGlobalError,
    validate: (): boolean => {
      validateForm(data, errors);
      setShowValidations(true);
      setCount(count + 1);

      if (hasNonEmptyValue(errors)) {
        return false;
      } else {
        return true;
      }
    },
    resetErrors,
  };
  return yRefs[name];
}

export function getY<T>(CL: new () => T): YReturnType<T> {
  return yRefs[CL.name];
}

export function useXForm<T>(Obj: T, validateForm: Function) {
  const [data, setD] = useState<T>(Obj);
  const [showValidations, setShowValidations] = useState(false);
  const resetErrors = () => {
    return resetPrimitiveValues(deepClone(data));
  };
  const [errors, setE] = useState<T>(resetErrors());
  const [count, setCount] = useState(0);

  const setData = (fn: Function) => {
    typeof fn === "function" && fn();
    resetErrors();
    showValidations && validateForm(data, errors);
    if (hasNonEmptyValue(errors)) {
    } else {
      setShowValidations(false);
    }
    setCount(count + 1);
    //@ts-ignore
    setD(Array.isArray(data) ? [...data] : { ...data });
  };
  const setErrors = (fn: Function) => {
    typeof fn === "function" && fn();
    setCount(count + 1);
    setE({ ...errors });
  };

  return {
    data,
    errors,
    resetForm: (resetWith: any = Obj) => {
      setD(resetWith);
      setTimeout(() => resetErrors(), 100);
    },
    setData,
    // showErrors: showValidations,
    // setShowErros: setShowValidations,
    setErrors,

    validate: (): boolean => {
      validateForm(data, errors);
      setShowValidations(true);
      setCount(count + 1);

      if (hasNonEmptyValue(errors)) {
        return false;
      } else {
        return true;
      }
    },
    resetErrors,
  };
}

function resetPrimitiveValues(obj: any) {
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
      } else {
        // Recursively reset values in nested objects
        obj[key] = resetPrimitiveValues(obj[key]);
      }
    }
  }

  return obj;
}

// usePrimitive

export function useQ<T>(val: T): {
  val: T;
  set: (newVal: T) => void;
  setQ: (pathToObjectToChange: string, newVal: any) => void;
} {
  const setState = (val: any) => {
    set({ ...state, val });
  };
  const [state, set] = useState({
    val,
    set: setState,
  });
  state.set = setState;
  return {
    ...state,
    setQ: (pathToObjectToChange: string, newVal: any) => {
      setStateX(
        state,
        pathToObjectToChange.split(".").slice(1).join("."),
        newVal
      );
      setState(state.val);
    },
  };
}

export function xEvents<T extends string>(arr: T[]): Record<T, { name: T }> {
  const result = {} as Record<T, { name: T }>;

  for (const item of arr) {
    result[item] = { name: item };
  }

  return result;
}

export function usePagination(
  initialPage = 1,
  initialTotalPages = -1,
  initialItemsPerPage = 10
) {
  const [currentPage, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

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
function TimeRenderer({ time }: any) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const clear = setInterval(() => {
      setCount(count + 1);
    }, 10000);
    return () => {
      clearInterval(clear);
    };
  }, [count]);
  return <span>{Timer(time)}</span>;
}
export function hasScrollReachedTheEnd(event: any, reverse = false) {
  if (event.target === document) {
    // Document scroll
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    if (reverse) {
      return scrollY === 0;
    } else {
      return scrollY + windowHeight >= documentHeight;
    }
  } else if (event.target instanceof HTMLElement) {
    // Element scroll

    const element = event.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    if (reverse) {
      return scrollTop === 0;
    } else {
      return scrollTop + clientHeight >= scrollHeight;
    }
  } else {
    // Window scroll
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = window.innerHeight;

    if (reverse) {
      return scrollTop === 0;
    } else {
      return scrollTop + clientHeight >= scrollHeight;
    }
  }
}

export function deepClone(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item: any) => deepClone(item));
  }

  return Object.keys(obj).reduce((acc: any, key) => {
    acc[key] = deepClone(obj[key]);
    return acc;
  }, {});
}

function getMethodNames(obj: any): string[] {
  const methodNames: string[] = [];

  let prototype = obj;

  while (prototype && prototype !== Object.prototype) {
    const keys = Reflect.ownKeys(prototype);

    keys.forEach((key) => {
      const value = prototype[key];
      if (typeof value === "function" && key !== "constructor") {
        methodNames.push(key as string);
      }
    });

    prototype = Object.getPrototypeOf(prototype);
  }

  return methodNames;
}

function getFunctionParameterNames(func: Function) {
  const functionString = func.toString();
  const parameterList = functionString
    .slice(functionString.indexOf("(") + 1, functionString.lastIndexOf(")"))
    .split(",")
    .map((param) => param.trim());

  const namedParameters: any = [];
  let isRestParameter = false;

  for (const param of parameterList) {
    if (param.startsWith("...")) {
      // Handle rest parameter
      const paramName = param.substring(3).trim();
      isRestParameter = true;

      // Add the rest parameter and exit the loop
      namedParameters.push(`...${paramName}`);
      break;
    } else if (param.includes("{") || param.includes("[")) {
      throw new Error("Destructuring or invalid parameter found");
    } else {
      // Handle named parameter
      const defaultIndex = param.indexOf("=");
      if (defaultIndex !== -1) {
        // Handle default parameter
        const paramName = param.substring(0, defaultIndex).trim();
        namedParameters.push(paramName);
      } else {
        namedParameters.push(param);
      }
    }
  }

  if (isRestParameter) {
    // If there's a rest parameter, return just that
    return namedParameters;
  } else {
    // Return the named parameters
    return namedParameters;
  }
}

function objFromArray(keys: string[], values: any) {
  if (keys.length > values.length) {
    throw new Error("Keys array is longer than values array");
  }

  const result: any = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (key.startsWith("...")) {
      const restKey = key.substring(3);
      result[restKey] = values.slice(i);
      break;
    } else {
      result[key] = values[i];
    }
  }

  return result;
}

function buildPayload(fn: Function, props: any[]) {
  try {
    return objFromArray(getFunctionParameterNames(fn), props);
  } catch (e) {
    return props;
  }
}

function buildObjectOrArrayPreview(obj: any) {
  let val = Object.keys(obj).slice(0, 5).join(", ");
  if (val.length > 10) val = val.substring(0, 15) + "...";
  else if (Object.keys(obj).length > 4) {
    val = val + "...";
  }
  return Array.isArray(obj) ? "[" + val + "]" : "{" + val + "}";
}

function Timer(targetTime: any) {
  if (!targetTime || typeof targetTime !== "string") {
    return "";
  }
  const now: any = new Date();
  const target: any = new Date();
  const [hh, mm, ss, ms] = targetTime.split(":").map(Number);

  target.setHours(hh);
  target.setMinutes(mm);
  target.setSeconds(ss);
  target.setMilliseconds(ms);

  const timeDifference: any = now - target;

  if (timeDifference < 2000) {
    return "Just now";
  } else if (timeDifference < 60000) {
    const secondsAgo = Math.floor(timeDifference / 1000);
    return `${secondsAgo} s ago`;
  } else if (timeDifference < 3600000) {
    const minutesAgo = Math.floor(timeDifference / 60000);
    return `${minutesAgo} m ago`;
  } else {
    return targetTime;
  }
}

function formatTimeExtended(timeString: string) {
  const [hh, mm, ss, ms] = timeString.split(":").map(Number);
  const date = new Date(); // Create a new Date object
  date.setHours(hh);
  date.setMinutes(mm);
  date.setSeconds(ss);
  date.setMilliseconds(ms);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();

  const amPm = hours >= 12 ? "pm" : "am";
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedTime =
    hours.toString().padStart(2, "0") +
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

/// useX(CL);
