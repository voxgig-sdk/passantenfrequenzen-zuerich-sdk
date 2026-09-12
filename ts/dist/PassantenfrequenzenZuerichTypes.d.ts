export interface Frequenzen {
    age_group?: string;
    count?: number;
    direction?: string;
    location?: string;
    temperature?: number;
    timestamp?: string;
    weather?: string;
    zone?: number;
}
export interface FrequenzenListMatch {
    end_date?: string;
    location?: string;
    start_date?: string;
    zone?: number;
}
export interface Standorte {
    geometry?: Record<string, any>;
    properties?: Record<string, any>;
    type?: string;
}
export interface StandorteListMatch {
    geometry?: Record<string, any>;
    properties?: Record<string, any>;
    type?: string;
}
