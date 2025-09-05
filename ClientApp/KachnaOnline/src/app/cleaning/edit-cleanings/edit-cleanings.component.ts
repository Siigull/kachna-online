import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CleaningsService } from "../../shared/services/cleanings.service";

@Component({
  selector: 'app-edit-cleanings',
  templateUrl: './edit-cleanings.component.html',
  styleUrls: ['./edit-cleanings.component.css']
})
export class EditCleaningsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public cleaningsService: CleaningsService,
  ) { }

  cleaningsBackRoute: string = "..";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let cleaningId = Number(params.get('cleaningId'));
      this.cleaningsService.getCleaningData(cleaningId);
    });

    this.cleaningsBackRoute = this.cleaningsService.getBackRoute();
  }

  ngOnDestroy() {
    this.cleaningsService.resetBackRoute();
  }

}
