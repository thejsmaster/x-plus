import React, { Component, ReactNode, useEffect, useState } from "react";
import "./App.css";
export const xRefs: any = {};
export const xConfig = {
  enableDebugging: false,
  enableConsoleLogging: false,
};
export const listeners: any = {
  onStateChange: null,
};
export function getParentState(CL: any): any {
  const item = xRefs[CL.name];
  return [item.state, item.renderer];
}
let tempCallStack: any = [];
function call(fn: any, state: any) {
  if (tempCallStack.indexOf(fn) === -1) {
    tempCallStack.push(fn);
    setTimeout(() => {
      fn.call(state);
      tempCallStack = tempCallStack.filter((item: any) => item !== fn);
    }, 0);
  }
}

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
      const newPath = path
        ? Array.isArray(obj1)
          ? `${path}[${key}]`
          : `${path}.${key}`
        : key;
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
export function useX<T extends Object>(
  CL: new () => T,
  label?: any
): [T, Function] {
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
        actionLogs: [],
        index: 0,
        copy:
          state && typeof state === "object"
            ? //@ts-ignore
              JSON.parse(JSON.stringify(state))
            : {},
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
      let errorOccured = false;
      let errorMessage = "";
      try {
        if (typeof fn === "function") fn.apply(xRefs[label].state, props);
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
        const copy = JSON.parse(JSON.stringify(xRefs[label].state));
        let changeList: any = {};
        if (xRefs[label].copy) {
          changeList = findDiff(xRefs[label].copy, copy);
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
          console.log("useX - new state", xRefs[label]?.state);
        xRefs[label].setLogs.unshift(log);
        xRefs[label].index++;
        xRefs[label].setLogs.length > 10 && xRefs[label].setLogs.pop();
        xRefs[label].copy = copy;
      };
      console.log(xRefs);
      if (xRefs[label].state.onChange) {
        call(xRefs[label].state.onChange, xRefs[label].state);
        window.setTimeout(() => {
          xConfig.enableDebugging && updateSet();
          setCount(count + 1);
          listeners?.onStateChange && listeners.onStateChange();
        }, 0);
      } else {
        xConfig.enableDebugging && updateSet();
        setCount(count + 1);
        listeners?.onStateChange && listeners.onStateChange();
      }
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

  return [xRefs[label].state, xRefs[label].renderer];
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
  return (
    <span title={Error?.stack || ""} style={{ color: "red" }}>
      {message}
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
  const tabs = ["State", "Set Logs", "Memos"];
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
                  right: "20px",
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
    </div>
  );
};

export const UseXWrapper = (props: any) => {
  return (
    <>
      <ErrorBoundary Error={ErrorComponent}>{props.children}</ErrorBoundary>
      {props.enableDevTools && (
        <ErrorBoundary Error={ErrorComponent}>
          <UseXDevTools {...props} />
        </ErrorBoundary>
      )}
    </>
  );
};

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

type TXDevToolsProps = {
  XIconPosition: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  enableConsoleLogging: boolean;
};
export const UseXDevTools = ({
  XIconPosition = { bottom: "50px", right: "50px" },
  enableConsoleLogging = false,
}: TXDevToolsProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    listeners.onStateChange = () => {
      setTimeout(() => setCount(count + 1), 50);
    };
    return () => {
      listeners.onStateChange = null;
    };
  }, [setCount, count]);
  useEffect(() => {
    console.log("count changed", count);
  }, [count]);
  xConfig.enableDebugging = true;
  xConfig.enableConsoleLogging = enableConsoleLogging;
  const [showTools, setShowTools] = useState(false);
  return (
    <ErrorBoundary Error={ErrorComponent}>
      <>
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
              useX Dev Tools
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
        <div
          onMouseDown={() => {
            setShowTools(!showTools);
          }}
          id="usex-devtools-holder"
          style={{
            zIndex: 1000000001,
            width: "50px",
            height: "50px",
            background: "rgb(2 137 101)",
            borderRadius: "50px",
            position: "fixed",

            userSelect: "none",
            boxShadow: "0px 0px 10px 1px #CCC",
            cursor: "pointer",
            ...XIconPosition,
          }}
        >
          <span
            style={{
              left: "17px",
              position: "absolute",
              top: "2px",
              fontFamily:
                'Comic Sans MS, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              fontWeight: "bold",
              fontSize: "25px",
              color: "white",
              fontStyle: "italic",
            }}
          >
            x
          </span>
        </div>
      </>
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
