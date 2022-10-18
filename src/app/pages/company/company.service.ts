import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyI } from './company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companies$ : Observable<CompanyI[]> | undefined;
  constructor(
    private http: HttpClient
  
  ) { }
  getAllCompanies():Observable<CompanyI[]>{
    this.companies$= this.http.get<CompanyI[]>(environment.baseUrl + '/company');
    return this.companies$;
  }
}
