import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MaterialModule

  ]
})
export class CompanyModule { }
