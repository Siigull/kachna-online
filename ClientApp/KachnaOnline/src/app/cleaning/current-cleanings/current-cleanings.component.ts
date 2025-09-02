import { CleaningsService } from '../../shared/services/cleanings.service';
import { Component, OnInit } from '@angular/core';
import { Cleaning } from "../../models/cleaning/cleaning.model";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CleaningItem } from "../cleaning-item/cleaning-item.component";
import { StatesService } from "../../shared/services/states.service";
import { forkJoin, Observable } from "rxjs";
import { ClubStateTypes } from "../../models/states/club-state-types.model";
import { endWith } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { UrlUtils } from "../../shared/utils/url-utils";

@Component({
  selector: 'app-current-cleanings',
  templateUrl: './current-cleanings.component.html',
  styleUrls: ['./current-cleanings.component.css']
})
export class CurrentCleaningsComponent implements OnInit {
  currentCleanings: CleaningItem[] = [];
  nextCleanings: CleaningItem[] = [];
  shownNextCleanings: CleaningItem[] = [];
  currentMonth: Date = new Date();
  loading: boolean = false;

  getImageUrl = UrlUtils.getAbsoluteImageUrl;

  constructor(
    public cleaningsService: CleaningsService,
    private stateService: StatesService,
    private toastrService: ToastrService,
    private router: Router,
    public authenticationService: AuthenticationService,
    private _modalService: NgbModal,
  ) { }


  ngOnInit(): void {
    this.loading = true;
    this.cleaningsService.getCurrentCleaningsRequest().subscribe(
      (res: Cleaning[]) => {
        this.makeCurrentCleanings(res);
      },
      (_) => {
        this.toastrService.error("Nepodařilo se stáhnout aktuální úklidy.", "Stažení úklidů")
      }
    );

    this.cleaningsService.getMonthCleanings(new Date(), false).subscribe(
      (res: Cleaning[]) => {
        this.makeNextCleanings(res);
      },
      (_) => {
        this.toastrService.error("Nepodařilo se stáhnout následující úklidy.", "Stažení úklidů")
      }
    );
  }

  openCleaningDetail(cleaningDetail: Cleaning) {
    this.router.navigate([`/cleanings/${cleaningDetail.id}`]).then();
  }

  onDeleteButtonClicked(selectedCleaningDetail: Cleaning) {
    this.cleaningsService.openCleaningDeletionConfirmationModal(selectedCleaningDetail);
  }

  onModifyButtonClicked(selectedCleaningDetail: Cleaning) {
    this.router.navigate([`/cleanings/${selectedCleaningDetail.id}/edit`]).then();
  }

  makeCurrentCleanings(cleaningModels: Cleaning[]): void {
    this.currentCleanings = [];
    let waiting: Observable<any>[] = [];

    for (let e of cleaningModels) {
      let cleaning: CleaningItem = {
        from: e.from,
        to: e.to,
        id: e.id,
        title: e.name,
        cleaningInstructions: e.cleaningInstructions,
        place: e.place,
        idealParticipantsCount: e.idealParticipantsCount,
        finished: e.finished,
        multipleDays: (e.to.getTime() - e.from.getTime() <= 86400000)
      };

      this.currentCleanings.push(cleaning);
    }

    forkJoin(waiting).pipe(endWith(null)).subscribe(_ => {
      this.currentCleanings = this.sortCleanings(this.currentCleanings);
      //this.loading = false;
    });
  }

  makeNextCleanings(cleaningModels: Cleaning[]): void {
    this.nextCleanings = [];
    let waiting: Observable<any>[] = [];

    for (let e of cleaningModels) {
      let cleaning: CleaningItem = {
        from: e.from,
        to: e.to,
        id: e.id,
        title: e.name,
        cleaningInstructions: e.cleaningInstructions,
        place: e.place,
        idealParticipantsCount: e.idealParticipantsCount,
        finished: e.finished,
        multipleDays: (e.to.getTime() - e.from.getTime() <= 86400000)
      };

      // Skip current cleanings.
      let now = new Date();
      if (cleaning.from <= now && cleaning.to >= now) {
        continue;
      }

      this.nextCleanings.push(cleaning);
    }

    forkJoin(waiting).pipe(endWith(null)).subscribe(_ => {
      this.updateNextCleanings();
      this.loading = false;
    });
  }

  sortCleanings(cleanings: CleaningItem[]): CleaningItem[] {
    return cleanings.sort((a, b) => a.from.getTime() - b.from.getTime());
  }

  monthChanged(month: Date) {
    this.cleaningsService.getMonthCleanings(month, false).subscribe(res => this.makeNextCleanings(res));
  }

  updateNextCleanings(): void {
    this.update(this.nextCleanings, this.shownNextCleanings);
    this.shownNextCleanings = this.sortCleanings(this.shownNextCleanings)
  }

  update(source: { to: Date }[], target: { to: Date }[]): void {
    const now = new Date().getTime();
    target.length = 0;

    for (let e of source) {
      if (e.to.getTime() < now)
        continue;

      target.push(e);
    }
  }
}
