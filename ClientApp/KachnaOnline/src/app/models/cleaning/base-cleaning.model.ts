export class BaseCleaning {
  id: number = -1;
  name: string = "";
  place: string = "";
  cleaningInstructions: string = "";
  madeById: string = "";
  assignedUsersIds: string[] | null = [];
  idealParticipantsCount: number | null = null;
  finished: boolean = false;
}
