import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserResponseI } from 'src/app/auth/interfaces/user';
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
  delete(id: string): Observable<UserResponseI | void> {
    return this.http.delete<UserResponseI | void>(`${environment.baseUrl}/company/${id}`).pipe(
      map((res: UserResponseI) => {
        return res;
        })
        );   
  
  }

}
