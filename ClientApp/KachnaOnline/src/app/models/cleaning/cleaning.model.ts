import { BaseCleaning } from "./base-cleaning.model";

export class Cleaning extends BaseCleaning {
  from: Date = new Date();
  to: Date = new Date();
}
