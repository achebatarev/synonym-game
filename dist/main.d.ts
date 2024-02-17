interface globalStateObject {
    word: string;
    synonyms: string[];
    points: number;
    wordsEntered: string[];
}
declare const globalState: globalStateObject;
declare const options: {
    method: string;
    headers: {
        'X-RapidAPI-Key': string;
        'X-RapidAPI-Host': string;
    };
};
declare function checkIfSynonym(word: string): boolean;
declare function updatePoints(): void;
declare function sendRequest(word: string): Promise<any>;
declare function evaluateWord(): void;
declare function registerEventListener(): void;
declare const registerNewWord: (_: Event) => void;
declare function processRequest(): Promise<void>;
declare function createGameDiv(): HTMLDivElement;
