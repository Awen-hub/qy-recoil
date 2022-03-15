export declare const useAppState: <stateType>(key: string) => [stateType, (newState: stateType) => void];
export declare const usePageState: <stateType>(keyObj: {
    key: symbol;
}) => [stateType, (newState: stateType) => void];
