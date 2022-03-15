interface ininDataType<stateType> {
    key: string;
    state: stateType;
    setMiddlewares?: ((state: stateType) => void)[];
    getMiddlewares?: ((state: stateType) => void)[];
}
export declare const atomApp: <stateType>(initData: ininDataType<stateType>) => void;
export declare const atomPage: <stateType>(initData: ininDataType<stateType>) => {
    key: symbol;
};
export {};
