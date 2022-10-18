import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyI } from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  dataSource: any= [];
  displayedColumns: string[] = ['id', 'company_name', 'company_rut', 'dir', 'action'];
  

  constructor(
    private companySvc: CompanyService
  
  ) { }

  ngOnInit(): void {
    this.companySvc.getAllCompanies().subscribe(res => {
      console.log(res);
    });

    this.getCompanies();
  }

getCompanies(): void {
  this.companySvc.getAllCompanies().subscribe((companies:CompanyI[]) => {
    this.dataSource = new MatTableDataSource<CompanyI>(companies);
  });
 }

onEdit(id: number): void {
  console.log( id);

}
onDelete(id: number): void {
  console.log(id);
} 




}
