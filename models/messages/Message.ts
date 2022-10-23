/**
 * @file shows the model of the message
 */

/**
 * @class Message Represents a message between users
 * @property {User} sender user who send msg
 * @property {User} receiver user who receives msg
 * @property {string} message message that is sent 
 * @property {Date} sentOn the date on which the message was sent
 */
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