export class BaseCleaning {
  id: number = -1;
  name: string = "";
  place: string = "";
  cleaningInstructions: string = "";
  madeById: string = "";
  assignedUsersIds: number[] | null = [];
  idealParticipantsCount: number | null = null;
  finished: boolean = false;
}
