import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PlanCleaningComponent } from './plan-cleaning/plan-cleaning.component';
import { ComponentsModule } from '../shared/components/components.module';
import { CleaningRoutingModule } from './cleaning-routing.module';
import { CleaningFormComponent } from './cleaning-form/cleaning-form.component';

@NgModule({
  declarations: [
    PlanCleaningComponent,
    CleaningFormComponent,
    // CleaningArchiveComponent,
  ],
  imports: [
    CommonModule,
    CleaningRoutingModule,
    NgbModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class CleaningModule { }