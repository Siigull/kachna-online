import { User } from "../users/user.model";

export class BaseCleaning {
  id: number = -1;
  name: string = "";
  place: string = "";
  cleaningInstructions: string = "";
  madeById: string = "";
  assignedUsersIds: number[] | null = [];
  assignedUsersDtos: User[] | null = [];
  idealParticipantsCount: number | null = null;
  finished: boolean = false;
}
