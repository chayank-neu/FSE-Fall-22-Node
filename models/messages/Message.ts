export default class Message {

    private message: string;
    private to: string;
    private from: string;
    private sentOn: Date = new Date();

    constructor(message?: string, to?: string, from?: string) {
           this.message = message||'';
           this.to = to||"";
           this.from = from||"";
        }
}