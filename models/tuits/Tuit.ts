/**
 * @file shows the model of the tuit
 */

/**
 * @class Tuit Represents a tuit that is posted by the user
 * @property {string} tuit content of the tuit posted
 * @property {Date} postedOn creation time of tuit
 * @property {User} postedBy reference to the user who posted the tuit
 */
export default class Tuit {
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: string;

   constructor(tuit?: string, postedOn?: Date, 
      postedBy?: string) {
         this.tuit = tuit||'';
         this.postedOn = postedOn||new Date();
         this.postedBy = postedBy||"";
      }


   get getPostedBy() : string {
      return this.postedBy;
   }

   set setPostedBy(uid : string) {
      this.postedBy = uid;
   }

}
