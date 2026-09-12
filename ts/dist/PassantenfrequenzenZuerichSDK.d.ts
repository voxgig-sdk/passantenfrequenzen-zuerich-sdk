import { FrequenzenEntity } from './entity/FrequenzenEntity';
import { StandorteEntity } from './entity/StandorteEntity';
export type * from './PassantenfrequenzenZuerichTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PassantenfrequenzenZuerichEntityBase } from './PassantenfrequenzenZuerichEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PassantenfrequenzenZuerichSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Frequenzen(entopts?: Record<string, any>): FrequenzenEntity;
    Standorte(entopts?: Record<string, any>): StandorteEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PassantenfrequenzenZuerichSDK;
    tester(testopts?: any, sdkopts?: any): PassantenfrequenzenZuerichSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PassantenfrequenzenZuerichSDK;
export { stdutil, config, BaseFeature, PassantenfrequenzenZuerichEntityBase, PassantenfrequenzenZuerichSDK, SDK, };
