export const atomApp = (initData) => {
    let appStoreMap;
    if (!(wx.$appStoreMap instanceof Map)) {
        appStoreMap = new Map();
        wx.$appStoreMap = appStoreMap;
    }
    else {
        appStoreMap = wx.$appStoreMap;
    }
    const { state, setMiddlewares = [], getMiddlewares = [], key } = initData;
    if (appStoreMap.has(Symbol.for(key))) {
        throw `${key}已经被注册,key值必须唯一`;
    }
    const atomSymbol = Symbol.for(key);
    const setFnList = [];
    const data = {
        setMiddlewares,
        getMiddlewares,
        state,
        setFnList,
    };
    appStoreMap.set(atomSymbol, data);
};
export const atomPage = (initData) => {
    let pageStoreMap;
    if (!(wx.$pageStoreMap instanceof WeakMap)) {
        pageStoreMap = new WeakMap();
        wx.$pageStoreMap = pageStoreMap;
    }
    else {
        pageStoreMap = wx.$pageStoreMap;
    }
    const { state, setMiddlewares = [], getMiddlewares = [], key } = initData;
    const atomSymbol = {
        key: Symbol.for(key),
    };
    if (pageStoreMap.has(atomSymbol)) {
        throw `${key}已经被注册,key值必须唯一`;
    }
    const setFnList = [];
    pageStoreMap.set(atomSymbol, {
        setMiddlewares,
        getMiddlewares,
        state,
        key: atomSymbol,
        setFnList,
    });
    return atomSymbol;
};
