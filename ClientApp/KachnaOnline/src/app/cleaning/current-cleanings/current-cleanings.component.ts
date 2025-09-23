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
  cleanings: Cleaning[] = [];
  grouped: {[place:string]: Cleaning[]} = {};
  currentMonth: Date = new Date();
  loading: boolean = false;
  now: Date = new Date();

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

    this.cleaningsService.getMonthCleanings(new Date(), false).subscribe(
      (res: Cleaning[]) => {
        this.makeCleanings(res);
      },
      (_) => {
        this.toastrService.error("Nepodařilo se stáhnout úklidy.", "Stažení úklidů")
      }
    );
  }

  openCleaningDetail(cleaningDetail: Cleaning) {
    this.router.navigate([`/cleanings/${cleaningDetail.id}`]).then();
  }

  onJoinButtonClicked(selectedCleaningDetail: Cleaning) {
    // this.cleaningsService.openCleaningJoinConfirmationModal(selectedCleaningDetail);
  }

  onModifyButtonClicked(selectedCleaningDetail: Cleaning) {
    this.router.navigate([`/cleanings/${selectedCleaningDetail.id}/edit`]).then();
  }

  makeCleanings(cleaningModels: Cleaning[]): void {
    this.cleanings = [];
    this.grouped = {};
    let waiting: Observable<any>[] = [];

    for (let c of cleaningModels) {
      // let cleaning: CleaningItem = {
      //   from: c.from,
      //   to: c.to,
      //   id: c.id,
      //   title: c.name,
      //   cleaningInstructions: c.cleaningInstructions,
      //   place: c.place,
      //   idealParticipantsCount: c.idealParticipantsCount,
      //   finished: c.finished,
      //   multipleDays: (c.to.getTime() - c.from.getTime() <= 86400000)
      // };

      this.cleanings.push(c);
      if (!this.grouped[c.place]) {
        this.grouped[c.place] = [];
      }
      this.grouped[c.place].push(c);
    }

    forkJoin(waiting).pipe(endWith(null)).subscribe(_ => {
      // this.updateNextCleanings();
      this.loading = false;
    });
  }

  sortCleanings(cleanings: CleaningItem[]): CleaningItem[] {
    return cleanings.sort((a, b) => a.from.getTime() - b.from.getTime());
  }

  monthChanged(month: Date) {
    // this.cleaningsService.getMonthCleanings(month, false).subscribe(res => this.makeNextCleanings(res));
  }

  // updateNextCleanings(): void {
  //   this.update(this.nextCleanings, this.shownNextCleanings);
  //   this.shownNextCleanings = this.sortCleanings(this.shownNextCleanings)
  // }

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
