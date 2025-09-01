import { environment } from '../../environments/environment';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanCleaningComponent } from "./plan-cleaning/plan-cleaning.component";
import { CleaningManagerGuard } from "./cleaning-manager.guard";
// import { CleaningArchiveComponent } from "./cleaning-archive/cleaning-archive.component";

const routes: Routes = [
  { path: 'cleanings',
    children: [
      {
        path: '',
        children: [
          // {
          //   path: '',
          //   redirectTo: 'archive',
          //   pathMatch: 'full'
          // }
          { 
            path: 'plan',
            component: PlanCleaningComponent,
            canActivate: [CleaningManagerGuard],
            data: {
              title: `${environment.siteName} | Plánování úklidu`,
              description: 'Plánování nového úklidu',
            }
          },
          // { 
          //   path: 'archive',
          //   component: CleaningArchiveComponent,
          //   data: {
          //     title: `${environment.siteName} | Archiv úklidů`,
          //     description: 'Přehled minulých úklidů',
          //   }
          // },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CleaningRoutingModule { }