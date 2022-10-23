/**
 * @file shows the model of the user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @class this class represents all th information about a User
 * @property {String} username the username of the user
 * @property {String} password the password of the user
 * @property {String} firstName user's first name
 * @property {String} lastName user's last name
 * @property {String} email user's email
 * @property {String} profilePhoto user's profile phot
 * @property {String} headerImage user's header image
 * @property {String} accountType user's accounttype
 * @property {String} maritalStatus user's maritalstatus
 * @property {String} biography user's biogrpahy 
 * @property {Date} dateOfBirth user's dat of birth
 * @property {Date} joined date user joined tuiter
 * @property {Number} location user's location
 */
export default class User {


   private username: string = '';
   private password: string = '';
   private firstName: string | null = null;
   private lastName: string | null = null;
   private email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;

   constructor(username?: string, password?: string, 
      firstName?: string, lastName?: string, email?: string) {
         this.username = username|| '';
         this.password = password||'';
         this.firstName = firstName||'';
         this.lastName = lastName||'';
         this.email = email||'';
      }

   public get getUsername(): string {
         return this.username;
      }
}
