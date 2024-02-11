declare function hello(): string;
declare function btnClick(word: string): void;
declare const options: {
    method: string;
    headers: {
        'X-RapidAPI-Key': string | undefined;
        'X-RapidAPI-Host': string;
    };
};
declare function handleAPI(word: any): Promise<void>;
