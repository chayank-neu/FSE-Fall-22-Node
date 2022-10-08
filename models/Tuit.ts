import User from "./User";

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
