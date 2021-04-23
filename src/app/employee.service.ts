import { Injectable } from '@angular/core';
import {employee} from './employee'
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/employee/all`)
}

public addEmployee(employee: employee): Observable<employee>{
    return this.http.post<employee>(`${this.apiServerUrl}/employee/add`,employee)
}
public updateEmployee(employee: employee): Observable<employee>{
    return this.http.put<employee>(`${this.apiServerUrl}/employee/update`, employee)
}

public deleteEmployee(employeeId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`)
}
}
