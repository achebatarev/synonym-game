declare function hello(): string;
declare function registerEventListener(): void;
declare const options: {
    method: string;
    headers: {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
    };
};
declare function processRequest(word: string): Promise<void>;
declare function sendRequest(word: string): Promise<string>;
