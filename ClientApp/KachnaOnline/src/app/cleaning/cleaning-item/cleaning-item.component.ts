
export class CleaningItem {
  title: string;
  from: Date;
  to: Date;
  id: number;
  place: string | null;
  cleaningInstructions: string;
  idealParticipantsCount: number | null;
  finished: boolean;
  multipleDays: boolean;
}
