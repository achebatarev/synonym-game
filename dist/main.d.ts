interface globalStateObject {
    word: string;
    synonyms: string[];
    points: number;
}
declare const globalState: globalStateObject;
declare function registerEventListener(): void;
declare const registerNewWord: (_: Event) => void;
declare const options: {
    method: string;
    headers: {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
    };
};
declare function checkIfSynonym(word: string): boolean;
declare function evaluateWord(): void;
declare function createGameDiv(): HTMLDivElement;
declare function processRequest(): Promise<void>;
declare function sendRequest(word: string): Promise<any>;
