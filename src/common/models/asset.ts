/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Asset {
    id: string;
    name: string;
    type: string;
    createdAt: Date;
}

export interface Category {
    id: string;
    categoryName: string;
    categoryType: string;
    createdAt: Date;
}
