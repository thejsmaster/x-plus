import { Component, ReactNode, useEffect, useState } from "react";
import "./App.css";
export const xRefs: any = {};
export const xConfig = {
  enableDebugging: false,
  enableConsoleLogging: false,
  autoDestructureState: false,
};
export const listeners: any = {
  onStateChange: null,
};
export function getParentState<T>(CL: new () => T): {
  state: T;
  set: Function;
} {
  //
  const item = xRefs[CL.name];
  if (!item) {
    throw Error(
      "Error Occured in getParentState. The requested state is not created by any of the parent components."
    );
  }
  return { state: item.state, set: item.renderer };
}
// let tempCallStack: any = [];
// function call(fn: any, state: any) {
//   if (tempCallStack.indexOf(fn) === -1) {
//     tempCallStack.push(fn);
//     setTimeout(() => {
//       fn.call(state);
//       tempCallStack = tempCallStack.filter((item: any) => item !== fn);
//     }, 0);
//   }
// }

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
        changes[`${newPath} [D]`] = undefined;
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

// export let actions: any = [];
// called actions
// function extractSubstring(inputString: string) {
//   const lastIndex = inputString.lastIndexOf(" [");

//   if (lastIndex !== -1) {
//     return inputString.slice(0, lastIndex);
//   }

//   return inputString;
// }

export function useX<T extends Object>(
  CL: new () => T,
  label?: any
): {
  state: T;
  set: Function;
  stateChanged: number;
  onPlus: Function;
  plus: Function;
  saveCopy: Function;
  resetState: Function;
  // trigger: (fn: Function) => any;
} {
  const [count, setCount] = useState(0);

  if (!label) {
    label = CL.name;
  }
  const intiate = () => {
    if (!xRefs[label]) {
      const state = new CL();

      xRefs[label] = {
        state,
        label,
        setLogs: [],
        index: 0,
        copy: deepClone(state),
      };
      //@ts-ignore
      state && state.onChange && state.onChange();
    }
  };
  const setAgain = () => {
    if (!xRefs[label]) {
      intiate();
    }
    xRefs[label].renderer = (fn: Function, ...props: any) => {
      const copy = deepClone(xRefs[label].state);
      let errorOccured = false;
      let errorMessage = "";
      try {
        if (typeof fn === "function") {
          fn.apply(xRefs[label].state, props);

          // actions.push(fn);
          // xRefs[label].state = { ...xRefs[label].state };
        }
      } catch (e: any) {
        console.error(e);
        errorOccured = true;
        errorMessage = e?.message;
      }

      if (typeof fn !== "function") {
        throw new Error("set is called and no action is passed");
      }
      let { fileName, functionName, lineNumber }: any = getCallStack();
      let fname = fileName.split("/")[fileName.split("/").length - 1];
      const updateSet = () => {
        console.time();

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
          updateNestedObject(
            xRefs[label].state,
            path
              .split(".")
              .slice(1, path.split(".").length - 1)
              .join(".")
          );
        });

        if (xConfig.enableDebugging) {
          const log = {
            fileName: fname.split("?")[0],
            functionName,
            lineNumber,
            changeList,
            props,
            index: xRefs[label].index + 1,
            name: fn.name || "",
            errorOccured,
            errorMessage,
          };
          xConfig.enableConsoleLogging &&
            console.log("useX - " + log.name, log);
          xConfig.enableConsoleLogging &&
            console.log("useX - updated state", xRefs[label]?.state);
          xRefs[label].setLogs.unshift(log);
          xRefs[label].index++;
          xRefs[label].setLogs.length > 10 && xRefs[label].setLogs.pop();
        }

        console.timeEnd();
      };
      xRefs[label].state.onChange && xRefs[label].state.onChange();
      updateSet();
      xRefs[label].state = destructureWithProto(xRefs[label].state);
      setCount(count + 1);
      listeners?.onStateChange && listeners.onStateChange();
    };
    xRefs[label].actionRenderer = (fn: Function, ...props: any) => {
      let copy = {};
      if (xConfig.enableDebugging) {
        copy = deepClone(xRefs[label].state);
      }
      let errorOccured = false;
      let errorMessage = "";
      try {
        if (typeof fn === "function") {
          fn.apply(xRefs[label].state, props);
          xRefs[label].onPlus && xRefs[label].onPlus(fn);
          // actions.push(fn);
          // xRefs[label].state = { ...xRefs[label].state };
        }
      } catch (e: any) {
        console.error(e);
        errorOccured = true;
        errorMessage = e?.message;
      }

      if (typeof fn !== "function") {
        throw new Error("set is called and no action is passed");
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

        const log = {
          fileName: fname.split("?")[0],
          functionName,
          lineNumber,
          changeList,
          props,
          index: xRefs[label].index + 1,
          name: fn.name || "",
          errorOccured,
          errorMessage,
        };
        xConfig.enableConsoleLogging && console.log("useX - " + log.name, log);
        xConfig.enableConsoleLogging &&
          console.log("useX - updated state", xRefs[label]?.state);
        xRefs[label].setLogs.unshift(log);
        xRefs[label].index++;
        xRefs[label].setLogs.length > 10 && xRefs[label].setLogs.pop();
      };
      xRefs[label].state.onChange && xRefs[label].state.onChange();
      xConfig.enableDebugging && updateSet();
      xRefs[label].state = destructureWithProto(xRefs[label].state);
      setCount(count + 1);
      listeners?.onStateChange && listeners.onStateChange();
    };
  };
  setAgain();
  useEffect(() => {
    setAgain();

    return () => {
      delete xRefs[label];
      listeners?.onStateChange && listeners.onStateChange();
    };
  }, []);

  return {
    state: xRefs[label].state,
    set: xRefs[label].renderer,
    stateChanged: count,
    plus: xRefs[label].actionRenderer,
    onPlus: (fn: Function) => {
      if (typeof fn === "function") xRefs[label].onPlus = fn;
    },
    saveCopy() {
      xRefs[label].copy = deepClone(xRefs[label].state);
    },
    resetState() {
      xRefs[label].renderer(function reset() {
        xRefs[label].state = {
          ...destructureWithProto(xRefs[label].state),
          ...xRefs[label].copy,
        };
      });
    },
    // trigger(fn: Function) {
    //   if (typeof fn === "function") {
    //     setCount(count + 1);
    //     return fn();
    //   }
    // },
  };
}

// export const onPlus = (actionsList: any) => {
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
function destructureWithProto(obj: any) {
  const result = { ...obj };
  const prototype = Object.getPrototypeOf(obj);

  if (prototype) {
    const prototypeProps = Object.getOwnPropertyNames(prototype);

    for (const prop of prototypeProps) {
      result[prop] = prototype[prop];
    }
  }

  return result;
}
function updateNestedObject<T>(obj: T, path: string): T {
  const keys = path.split(".");
  const newObj = obj;
  let current: any = newObj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key])
      ? [...current[key]]
      : { ...current[key] };
    current = current[key];
  }

  return newObj;
}
export const Collapsable = ({ children, label }: any) => {
  const [open, setOpen] = useState(false);

  return xRefs[label] ? (
    <>
      <div
        key={label}
        style={{
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
        {!open && (
          <b style={{ float: "right", color: "green", fontSize: "small" }}>
            {xRefs[label].index > 0 ? xRefs[label].index : ""}
          </b>
        )}
      </div>
      {open && (
        <div
          style={{
            padding: "10px 30px",
            background: "rgb(250 250 250)",
            fontSize: "14px",
            paddingBottom: "45px",
          }}
        >
          {children}
        </div>
      )}
    </>
  ) : (
    <></>
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
  const tabs = ["State", "Set/Action", "memos", "events"];
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
          return (
            <div
              key={" set " + index + log.name}
              style={{
                borderBottom: "1px solid #CCC",
                marginBottom: "5px",
                paddingBottom: "5px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              >
                <StateView
                  autoOpenFirstLevel={false}
                  state={
                    {
                      [log.name]: {
                        changes: log.changeList,
                        props: log.props,
                        "Triggered by": log.functionName,
                        from: log.fileName,
                        status: log.errorOccured
                          ? "Error!" + log.errorMessage
                          : "Success",
                      },
                    } || {}
                  }
                />
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
          );
        })}
      </div>

      <div style={{ marginTop: "10px" }}></div>

      <div style={{ display: selectedTab === 2 ? "block" : "none" }}>
        <StateView state={State.state?.memos || {}} autoOpenFirstLevel={true} />{" "}
      </div>
      <div style={{ display: selectedTab === 3 ? "block" : "none" }}>
        <StateView
          state={State.state?.events || {}}
          autoOpenFirstLevel={true}
        />{" "}
      </div>
    </div>
  );
};

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

export function XPlusWrapper(props: TXDevToolsProps) {
  const { enableDevTools = true } = props;
  return (
    <>
      <ErrorBoundary Error={ErrorComponent}>
        {props.children && props.children}
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
          .map((item) => {
            return typeof state[item] === "object" && state[item] !== null ? (
              <>
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
                      <i title="Array">
                        {state[item].length > 0 ? " [..]" : " []"}
                      </i>
                    </b>
                  ) : (
                    <b>
                      <i title="Object">
                        {Object.keys(state[item]).length > 0 ? " {..}" : " {}"}
                      </i>
                    </b>
                  )}
                </div>
                {openList.includes(item) &&
                  state[item] &&
                  typeof state[item] === "object" && (
                    <Treeview state={state[item]} />
                  )}
              </>
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
  hideXPlusIcon = false,
  disableToggleESCKey = false,
}: TXDevToolsProps) => {
  const [showTools, setShowTools] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    function handleKeyPress(event: any) {
      if (event.key === "Escape") {
        setShowTools(!showTools);
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

            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "rgb(250, 250, 250)",
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
                <div key={key}>
                  <Collapsable label={key} state={stateValue}>
                    <ErrorBoundary Error={ErrorComponent}>
                      <Switch State={stateValue} />
                    </ErrorBoundary>
                  </Collapsable>
                </div>
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
              setShowTools(!showTools);
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
      style={{ ...highlightStyle, padding: "0px 5px", borderRadius: "4px" }}
    >
      {text === null ? (
        "null"
      ) : text === undefined ? (
        "undefined"
      ) : typeof text === "function" ? (
        <b>Function</b>
      ) : text === "" ? (
        <i>''</i>
      ) : typeof text === "string" ? (
        `'${text}'`
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

  try {
    const response = await fetch(url, {
      headers: options.headers || {},
      body: options.payload ? JSON.stringify(options.payload) : undefined,
      method: options.method,
      signal,
    });
    const data = await response.json();

    if (response.ok) {
      return data; // Resolve with the data if the API call is successful
    } else {
      throw new Error(
        data.message || "An error occurred while making the API call"
      );
    }
  } catch (error) {
    throw error; // Reject with the error if there's an issue with the API call
  }
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

  const [controller, setController] = useState<any>(null);
  const cancel = () => {
    if (controller && controller.abort()) setStatus("cancelled");
    setController(null);
  };

  useEffect(() => {
    if (count > 0) {
      if (controller) {
        cancel();
        setCount(count + 1);
      } else {
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
            if (error?.name !== "AbortError") {
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

  return { isLoading, data, error, status, call, cancel, callSilently };
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
    setE(errors);
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

// quick state

export function useQ<T>(val: T): {
  val: T;
  set: (newVal_Or_Fn: Function | any) => void;
} {
  const setState = (val: any) => {
    if (typeof val === "function") {
      val();
      set({
        ...state,
      });
    } else {
      set({ ...state, val });
    }
  };
  const [state, set] = useState({
    val,
    set: setState,
  });
  state.set = setState;
  return state;
}

// // Utility function to deep compare two objects by values
// function compareByValues(objA: any, objB: any) {
//   if (objA === objB) return true;

//   if (typeof objA !== "object" || typeof objB !== "object") return false;

//   const keysA = Object.keys(objA);
//   const keysB = Object.keys(objB);

//   if (keysA.length !== keysB.length) return false;

//   for (const key of keysA) {
//     if (!objB.hasOwnProperty(key) || !compareByValues(objA[key], objB[key]))
//       return false;
//   }

//   return true;
// }

// function useXEffect(effect: any, dependencies: any) {
//   const prevDependencies = useRef(JSON.parse(JSON.stringify(dependencies)));
//   if (!compareByValues(prevDependencies.current, dependencies)) {
//     // Dependencies have changed, execute the effect function
//     effect();
//     // Save a copy of the new dependencies
//     prevDependencies.current = JSON.parse(JSON.stringify(dependencies));
//   }
// }

// function useXMemo(effect: any, dependencies: any) {
//   const prevDependencies = useRef(JSON.parse(JSON.stringify(dependencies)));
//   if (!compareByValues(prevDependencies.current, dependencies)) {
//     // Dependencies have changed, execute the effect function
//     effect();
//     // Save a copy of the new dependencies
//     prevDependencies.current = JSON.parse(JSON.stringify(dependencies));
//   }
// }

// export default useXEffect;
// export interface IXEvent {
//   eventName: string;
//   trigger: Function;
//   count: number;
// }

type ParamsToObject<T extends string[]> = {
  [K in T[number]]: number;

  // {
  //   name: K;
  //   trigger: Function;
  // };
};

export function XEvents<T extends string[]>(
  ...eventNames: T
): ParamsToObject<T> {
  const events: Partial<ParamsToObject<T>> = eventNames.reduce((a: any, b) => {
    // let temp = {
    //   name: b,
    //   trigger() {
    //     a[b] = { ...temp };
    //   },
    // };
    a[b] = 0;
    return a;
  }, {});
  return events as ParamsToObject<T>;
}
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
export function paginateArray<T>(
  array: T[],
  currentPage: number,
  itemsPerPage: number
): T[] {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
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

