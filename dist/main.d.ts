interface globalStateObject {
    word: string;
    synonyms: string[];
    points: number;
    wordsEntered: string[];
    time: number;
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
declare function updateTime(): void;
declare function updateParent(div: HTMLElement): void;
declare function sendRequest(word: string): Promise<any>;
declare function evaluateWord(): void;
declare function launchTimer(): void;
declare function registerEventListener(): void;
declare function startGame(_: Event): Promise<void>;
declare function endGame(): void;
declare function createStartGameDiv(): HTMLDivElement;
declare function createEndGameDiv(): HTMLDivElement;
declare function createGameDiv(): HTMLDivElement;
