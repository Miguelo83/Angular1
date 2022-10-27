import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyI } from './company';
import { CompanyService } from './company.service';

import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, OnDestroy {

  dataSource: any= [];
  displayedColumns: string[] = ['id', 'company_name', 'company_rut', 'dir', 'action'];
  private subscribe:Subscription= new Subscription();
  constructor(
    private companySvc: CompanyService,
    private matDialog: MatDialog

  
  ) { }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  ngOnInit(): void {
    this.companySvc.getAllCompanies().subscribe(res => {
      console.log("companies", res);	
    });

    this.getCompanies();
  }

getCompanies(): void {
  this.companySvc.getAllCompanies().subscribe((companies:CompanyI[]) => {
    this.dataSource = new MatTableDataSource<CompanyI>(companies);
  });
 }
 
 onDelete(id: string): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, bórralo!'  
  }).then((result) => {
    if (result.isConfirmed) {
      this.companySvc.delete(id).subscribe(res => {
        console.log('Deleted');
        this.getCompanies();
      });
      Swal.fire(
        '¡Eliminado!',
        'El registro ha sido eliminado.',
        'success'
      )
    }
  } )

 }  

  onEdit(id: number): void {
  console.log( id);

}

onNewCompany(company:CompanyI): void {  
  this.subscribe?.add(
  this.companySvc.newCompany(company).subscribe(res => {
    if(res){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '¡Registro guardado!',
        showConfirmButton: false,
        timer: 1500
      })
      this.getCompanies();

    }
    
   })
  )

}

openDialog(): void {
  const dialoConfig = new MatDialogConfig();
  dialoConfig.disableClose = true;
  dialoConfig.autoFocus = true;
  const dialogRef = this.matDialog.open(FormComponent, dialoConfig);
  dialogRef.afterClosed().subscribe(res => {
    if(res){
      this.onNewCompany(res);
    }
  });

} 


}
