import { PassantenfrequenzenZuerichEntityBase } from '../PassantenfrequenzenZuerichEntityBase';
import type { PassantenfrequenzenZuerichSDK } from '../PassantenfrequenzenZuerichSDK';
import type { Control } from '../types';
import type { Standorte, StandorteListMatch } from '../PassantenfrequenzenZuerichTypes';
declare class StandorteEntity extends PassantenfrequenzenZuerichEntityBase<Standorte> {
    constructor(client: PassantenfrequenzenZuerichSDK, entopts: any);
    make(this: StandorteEntity): StandorteEntity;
    list(this: any, reqmatch?: StandorteListMatch, ctrl?: Control): Promise<StandorteEntity[]>;
}
export { StandorteEntity };
