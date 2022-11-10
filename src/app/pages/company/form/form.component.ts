import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryI, CompanyI } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  category:CategoryI[] = [];


  constructor(
  private fb:FormBuilder,
  private companySvc:CompanyService,
  public dialogRef: MatDialogRef<FormComponent>,
  @Inject(MAT_DIALOG_DATA) public data: CompanyI
  ) { }


  form = this.fb.group({
    company_name: ['', [Validators.required]],
    company_rut: ['', [Validators.required]],
      
    dir:['']
  });


  ngOnInit(): void {
    
   
  }

  // onSave(){
  //   const valueForm={
  //     company_name:this.form.value.company_name,
  //     company_rut:this.form.value.company_rut,
  //     dir:this.form.value.dir
  //   }

  //   console.log(this.form.value);
  //   this.companySvc.newCompany(valueForm).subscribe(
  //     res=>console.log(res)
  //   )
  // }
  close(){
    this.dialogRef.close();
  }

  isValidField(field: string):string{
    const validatedField = this.form.get(field);
    return (!validatedField?.valid && validatedField?.touched) ? 'is-invalid' : validatedField?.touched ? 'is-valid' : '';
   }

}
