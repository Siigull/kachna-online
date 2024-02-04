import { Component, Input, OnInit } from '@angular/core';
import { ClubInfoService } from "../../shared/services/club-info.service";
import { ClubOffer, ClubOfferItem } from "../../models/clubinfo/offer.model";

@Component({
  selector: 'app-current-offer',
  templateUrl: './current-offer.component.html',
  styleUrls: ['./current-offer.component.css']
})
export class CurrentOfferComponent implements OnInit {

  constructor(private infoService: ClubInfoService) {
  }

  loaded: boolean = false;
  hasError: boolean = false;
  hasTaps: boolean = false;
  hasProducts: boolean = false;

  categories: string[] = [];
  products: { [categoryName: string]: ClubOfferItem[] } = {};

  taps: ClubOfferItem[];

  @Input() tearoomMode: boolean = false;

  ngOnInit(): void {
    this.loadOffer();
  }

  loadOffer() {
    this.loaded = false;
    this.hasError = false;
    this.hasTaps = false;
    this.hasProducts = false;

    this.infoService.getOffer().subscribe(res => this.showOffer(res), _ => this.hasError = true);
  }

  showOffer(offer: ClubOffer) {
    this.loaded = true;

    if (offer.beersOnTap?.length > 0) {
      this.hasTaps = true;
      this.taps = offer.beersOnTap;
    }

    if (offer.products?.length > 0) {
      this.hasProducts = true;

      offer.products.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });

      let tea = [];
      let wine = [];
      let cider = [];
      let bev = [];
      let coffee = [];
      let food = [];
      let bottledBeer = [];
      let others = [];

      for (let p of offer.products) {
        if (p.labels.includes("Čaj")) {
          tea.push(p);
        } else if (p.labels.includes("Káva")) {
          coffee.push(p);
        } else if (p.labels.includes("Nealko")) {
          bev.push(p);
        } else if (p.labels.includes("Pivo") && p.labels.includes("Sklo")) {
          bottledBeer.push(p);
        } else if (p.labels.includes("Jídlo")) {
          food.push(p);
        } else if (p.labels.includes("Víno")) {
          if (!p.name.includes("lahev")) {
            wine.push(p);
          }
        } else if (p.labels.includes("Cider")) {
          cider.push(p);
        } else if (!p.labels.includes("Zálohovaný obal")) {
          others.push(p);
        }
      }

      if (this.tearoomMode) {
        this.makeCategories({
          "Čaj": tea,
          "Káva": coffee,
          "Nealko": bev,
          "Jídlo": food,
          "Další nabídka": others
        })
      } else {
        this.makeCategories({
          "Cider": cider,
          "Lahvové pivo": bottledBeer,
          "Víno": wine,
          "Káva": coffee,
          "Čaj": tea,
          "Nealko": bev,
          "Jídlo": food,
          "Další nabídka": others
        });
      }
    }
  }

  makeCategories(definitions: { [id: string]: ClubOfferItem[] }) {
    for (let [key, value] of Object.entries(definitions)) {
      if (value.length > 0) {
        this.categories.push(key);
        this.products[key] = value;
      }
    }
  }
}
