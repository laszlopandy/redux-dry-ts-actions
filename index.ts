


export type ActionCreator<T extends string> = {
    actionType: T,
    (): { type: T };
};

export type ActionCreatorWithPayload<T extends string, Payload, Args extends Array<any>> = {
    actionType: T,
    (...args: Args): { type: T, payload: Payload },
};

export type KeysToFunctions = {
    [key: string]: (...args: Array<any>) => any;
};

export type ActionTypeFromActionCreators<T extends KeysToFunctions> = ReturnType<T[keyof T]>;


export function createAction<T extends string>(
    type: T,
): ActionCreator<T>;

export function createAction<T extends string, Payload, Args extends Array<any>>(
    type: T,
    payloadCreator: (...args: Args) => Payload,
): ActionCreatorWithPayload<T, Payload, Args>;

export function createAction<T extends string, Payload, Args extends Array<any>>(
    type: T,
    payloadCreator?: (...args: Args) => Payload,
): ActionCreatorWithPayload<T, Payload, Args> | ActionCreator<T> {

    if (payloadCreator == null) {
        const action = { type };
        // TypeScript gives type errors when using object spread (ie. { ...x })
        // with functions, so we have to use Object.assign here instead.
        // tslint:disable-next-line:prefer-object-spread
        return Object.assign(() => action, { actionType: type });

    } else {
        const f = (...args: Args) => ({
            payload: payloadCreator(...args),
            type: type,
        });
        // TypeScript gives type errors when using object spread (ie. { ...x })
        // with functions, so we have to use Object.assign here instead.
        // tslint:disable-next-line:prefer-object-spread
        return Object.assign(f, { actionType: type });
    }
}
