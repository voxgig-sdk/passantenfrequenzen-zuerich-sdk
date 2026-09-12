import { PassantenfrequenzenZuerichEntityBase } from '../PassantenfrequenzenZuerichEntityBase';
import type { PassantenfrequenzenZuerichSDK } from '../PassantenfrequenzenZuerichSDK';
import type { Control } from '../types';
import type { Frequenzen, FrequenzenListMatch } from '../PassantenfrequenzenZuerichTypes';
declare class FrequenzenEntity extends PassantenfrequenzenZuerichEntityBase<Frequenzen> {
    constructor(client: PassantenfrequenzenZuerichSDK, entopts: any);
    make(this: FrequenzenEntity): FrequenzenEntity;
    list(this: any, reqmatch?: FrequenzenListMatch, ctrl?: Control): Promise<FrequenzenEntity[]>;
}
export { FrequenzenEntity };
