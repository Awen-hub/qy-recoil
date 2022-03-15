import * as jsx2mp from "jsx2mp-runtime/dist/jsx2mp-runtime.wechat.esm";

export const useAppState = <stateType>(
  key: string
): [stateType, (newState: stateType) => void] => {
  const appStoreMap = wx.$appStoreMap;
  const atomSymbol = Symbol.for(key);
  if (!appStoreMap.has(atomSymbol)) {
    console.error(`${key}尚未注册`);
    throw `${key}尚未注册`;
  }
  let stateObj = appStoreMap.get(atomSymbol);
  const { setMiddlewares, getMiddlewares, state, setFnList } = stateObj;
  const [activeState, setActiveState] = jsx2mp.useState(state);
  //@ts-ignore
  getMiddlewares.forEach((middlewareFn) => middlewareFn(state));
  const setFn = (newState: stateType): void => {
    let oldState = state;
    //@ts-ignore
    setMiddlewares.forEach((middlewareFn) => middlewareFn(oldState, newState));
    while (setFnList.length !== 0) {
      const setFn = setFnList.pop();
      setFn(newState);
    }
    stateObj.state = newState;
  };
  setFnList.push(setActiveState);
  return [activeState as stateType, setFn];
};

export const usePageState = <stateType>(keyObj: {
  key: symbol;
}): [stateType, (newState: stateType) => void] => {
  const pageStoreMap = wx.$pageStoreMap;
  if (!pageStoreMap.has(keyObj)) {
    console.error(`${Symbol.keyFor(keyObj.key)}尚未注册`);
    throw `${Symbol.keyFor(keyObj.key)}尚未注册`;
  }
  let stateObj = pageStoreMap.get(keyObj);
  const { setMiddlewares, getMiddlewares, state, setFnList } = stateObj;
  const [activeState, setActiveState] = jsx2mp.useState(state);
  //@ts-ignore
  getMiddlewares.forEach((middlewareFn) => middlewareFn(state));
  const setFn = (newState: stateType): void => {
    let oldState = state;
    //@ts-ignore
    setMiddlewares.forEach((middlewareFn) => middlewareFn(oldState, newState));
    while (setFnList.length !== 0) {
      const setFn = setFnList.pop();
      setFn(newState);
    }
    stateObj.state = newState;
  };
  setFnList.push(setActiveState);
  return [activeState as stateType, setFn];
};
