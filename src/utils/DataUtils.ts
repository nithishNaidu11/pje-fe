import _ from 'lodash';
import jsonmergepatch from 'json-merge-patch';

export const DataUtils = {
    isEmpty(value: unknown): boolean {
        if (typeof value === 'object') {
            if (value === null) {
                return true;
            }
            if (Array.isArray(value) && value.length === 0) {
                return true;
            }
            return false;
        }
        if (_.isNumber(value)) {
            return !_.isFinite(value); // if finite, return false. Covers NaN
        }
        if (value === false) {
            return value;
        }

        return _.isEmpty(value);
    },
    getFormattedBody<Type>(object: Type) {
        const formBodyKeys = Object.keys(object || {}) as Array<keyof Type>;
        const formattedBody = formBodyKeys.reduce(
            (body: any, formKey: keyof Type) => {
                const formKeyValue = object[formKey];
                const isEmpty =
                    (Array.isArray(formKeyValue) &&
                        formKeyValue.length === 0) ||
                    formKeyValue === null ||
                    (formKeyValue as unknown) === '';
                if (!isEmpty) {
                    body = {
                        ...body,
                        [formKey]: formKeyValue
                    };
                }
                return body;
            },
            {}
        );
        return formattedBody;
    },
    getPatchFormattedBody<Type>(object: Type): Type {
        const formBodyKeys = Object.keys(object || {}) as Array<keyof Type>;
        const formattedBody = formBodyKeys.reduce(
            (body: any, formKey: keyof Type) => {
                const formKeyValue = object[formKey];

                if ((formKeyValue as unknown) === '') {
                    body = {
                        ...body,
                        [formKey]: null
                    };
                } else {
                    body = {
                        ...body,
                        [formKey]: formKeyValue
                    };
                }
                return body;
            },
            {}
        );

        return formattedBody;
    },
    get(
        obj1: Record<string, unknown>,
        obj2: Record<string, unknown>
    ): Record<string, unknown> | undefined {
        const result: Record<string, unknown> = {};
        if (Object.is(obj1, obj2)) {
            return undefined;
        }
        if (!obj2 || typeof obj2 !== 'object') {
            return obj2;
        }
        Object.keys(obj1 || {})
            .concat(Object.keys(obj2 || {}))
            .forEach((key: string) => {
                if (
                    obj2[key] !== obj1[key] &&
                    !Object.is(obj1[key], obj2[key])
                ) {
                    result[key] = obj2[key] === '' ? null : obj2[key];
                }
                if (
                    typeof obj2[key] === 'object' &&
                    typeof obj1[key] === 'object'
                ) {
                    const value = this.getDiff(obj1[key], obj2[key]);
                    if (value !== undefined) {
                        result[key] = value;
                    }
                }
            });
        return result;
    },

    getDiff<T>(obj1?: T, obj2?: T): Record<string, unknown> | undefined | T {
        const val = jsonmergepatch.generate(obj1, obj2);
        return val;
    },

    convertArrayToCamelCase(data: string[]): string[] {
        return data.map(datum => _.camelCase(datum));
    },
    getFormattedForm<Type>(form: any): Type {
        const formKeys = Object.keys(form) as Array<keyof typeof form>;
        const formattedForm = formKeys.reduce(
            (formattedObject: any, current: keyof typeof form) => {
                if ((form[current] as unknown) === '') {
                    return {
                        ...formattedObject,
                        [current]: null
                    };
                } else {
                    return {
                        ...formattedObject,
                        [current]: form[current]
                    };
                }
            },
            {}
        );
        return formattedForm;
    },
    isArray(
        input: Record<string, unknown> | Record<string, unknown>[] | unknown
    ): input is Record<string, unknown>[] {
        return Array.isArray(input);
    },

    isObject(
        obj: Record<string, unknown> | Record<string, unknown>[] | unknown
    ): obj is Record<string, unknown> {
        return (
            obj === Object(obj) &&
            !Array.isArray(obj) &&
            typeof obj !== 'function'
        );
    },
    camelize<T>(input: T, exclude?: string): T {
        return (function recurse<
            K extends
                | Record<string, unknown>
                | Record<string, unknown>[]
                | unknown
        >(input: K): K {
            if (exclude && DataUtils.isObject(input)) {
                const formatted = { ...input };
                delete formatted[exclude];
                const camelizedInput = Object.keys(input).reduce(
                    (acc: any, key: string) => {
                        return Object.assign(acc, {
                            [DataUtils.toCamel(key)]: recurse(input[key])
                        });
                    },
                    {} as K
                );
                return {
                    ...camelizedInput,
                    [exclude]: input[exclude]
                };
            } else {
                if (DataUtils.isObject(input)) {
                    return Object.keys(input).reduce(
                        (acc: any, key: string) => {
                            return Object.assign(acc, {
                                [DataUtils.toCamel(key)]: recurse(input[key])
                            });
                        },
                        {} as K
                    );
                } else if (DataUtils.isArray(input)) {
                    return input.map(i => recurse(i)) as K;
                }
                return input;
            }
        })(input);
    },

    snakize<T>(input: T, exclude?: string): T {
        return (function recurse<
            K extends
                | Record<string, unknown>
                | Record<string, unknown>[]
                | unknown
        >(input: K): K {
            if (exclude && DataUtils.isObject(input)) {
                const formatted = { ...input };
                delete formatted[exclude];
                const snakizedInput = Object.keys(formatted).reduce(
                    (acc: any, key: string) => {
                        if (key === exclude) return acc;
                        return Object.assign(acc, {
                            [DataUtils.toSnake(key)]: recurse(formatted[key])
                        });
                    },
                    {} as K
                );
                return {
                    ...snakizedInput,
                    [exclude]: input[exclude]
                };
            } else {
                if (DataUtils.isObject(input)) {
                    return Object.keys(input).reduce(
                        (acc: any, key: string) => {
                            if (key === exclude) return acc;
                            return Object.assign(acc, {
                                [DataUtils.toSnake(key)]: recurse(input[key])
                            });
                        },
                        {} as K
                    );
                } else if (DataUtils.isArray(input)) {
                    return input.map(i => recurse(i)) as K;
                }
                return input;
            }
        })(input);
    },
    snakizeWithSeparator<T>(input: T): T {
        return (function recurse<
            K extends
                | Record<string, unknown>
                | Record<string, unknown>[]
                | unknown
        >(input: K): K {
            if (DataUtils.isObject(input)) {
                return Object.keys(input).reduce((acc: any, key: string) => {
                    return Object.assign(acc, {
                        [DataUtils.sortKeyToSnake(key)]: recurse(input[key])
                    });
                }, {} as K);
            } else if (DataUtils.isArray(input)) {
                return input.map(i => recurse(i)) as K;
            }
            return input;
        })(input);
    },
    toCamel(str: string) {
        return str.replace(/([_-][a-z])/gi, ($1: string) => {
            return $1.toUpperCase().replace('-', '').replace('_', '');
        });
    },
    toSnake(str: string): string {
        return _.snakeCase(str);
    },
    toSnakeWrapper(str: string): string {
        const splitStrings = str.split('.');
        const snakizedSplitStrings = splitStrings.map(datum =>
            _.snakeCase(datum)
        );
        return snakizedSplitStrings.join('.');
    },
    sortKeyToSnake(str: string): string {
        const splitStrings = str.split('.');
        const snakizedSplitStrings = splitStrings.map(datum =>
            _.snakeCase(datum)
        );
        return snakizedSplitStrings.join('.');
    }
};
