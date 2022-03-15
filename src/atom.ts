interface ininDataType<stateType> {
  key: string;
  state: stateType;
  setMiddlewares?: ((state: stateType) => void)[];
  getMiddlewares?: ((state: stateType) => void)[];
}

type Omit<stateType, K> = Pick<
  ininDataType<stateType>,
  Exclude<keyof ininDataType<stateType>, K>
>;

type storeMapValue<stateType> = Omit<stateType, "key"> & {
  setFnList: ((state: stateType) => void)[];
};

export const atomApp = <stateType>(initData: ininDataType<stateType>): void => {
  let appStoreMap: Map<symbol, storeMapValue<stateType>>;
  if (!(wx.$appStoreMap instanceof Map)) {
    appStoreMap = new Map();
    wx.$appStoreMap = appStoreMap;
  } else {
    appStoreMap = wx.$appStoreMap;
  }
  const { state, setMiddlewares = [], getMiddlewares = [], key } = initData;
  if (appStoreMap.has(Symbol.for(key))) {
    throw `${key}已经被注册,key值必须唯一`;
  }
  const atomSymbol = Symbol.for(key);
  const setFnList: ((state: stateType) => void)[] = [];
  const data: storeMapValue<stateType> = {
    setMiddlewares,
    getMiddlewares,
    state,
    setFnList,
  };
  appStoreMap.set(atomSymbol, data);
};

export const atomPage = <stateType>(
  initData: ininDataType<stateType>
): { key: symbol } => {
  let pageStoreMap;
  if (!(wx.$pageStoreMap instanceof WeakMap)) {
    pageStoreMap = new WeakMap();
    wx.$pageStoreMap = pageStoreMap;
  } else {
    pageStoreMap = wx.$pageStoreMap;
  }
  const { state, setMiddlewares = [], getMiddlewares = [], key } = initData;
  const atomSymbol = {
    key: Symbol.for(key),
  };
  if (pageStoreMap.has(atomSymbol)) {
    throw `${key}已经被注册,key值必须唯一`;
  }
  const setFnList: ((state: stateType) => void)[] = [];
  pageStoreMap.set(atomSymbol, {
    setMiddlewares,
    getMiddlewares,
    state,
    key: atomSymbol,
    setFnList,
  });
  return atomSymbol;
};
