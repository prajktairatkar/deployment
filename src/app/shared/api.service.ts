import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/projectdetails';
  apiUrl2 = 'http://localhost:3000/resourcedetails';
  apiUrl3 = 'http://localhost:3000/subtask';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // postProjectDetails(filedata: any) {
  //   return this.http
  //     .post<any>('http://localhost:3000/projectdetails', filedata)
  //     .pipe(
  //       map((res: any) => {
  //         return res;
  //       })
  //     );
  // }
  //Get all project Data
  getAllData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  //Create Data
  postProjectDetails(filedata: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, filedata, this.httpOptions);
  }

  // Create resource Data
  postResourceDetails(fileresdata: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}`, fileresdata, this.httpOptions);
  }

  //Create subtask Data
  postSubtaskDetails(filesubdata: any): Observable<any> {
    return this.http.post(`${this.apiUrl3}`, filesubdata, this.httpOptions);
  }

  //Delete  Data
  deleteData(): Observable<any> {
    let endpoint = 'id';
    return this.http.delete(`${this.apiUrl}/${endpoint}`, this.httpOptions);
  }

  //Get all resource Data
  getAllResData(): Observable<any> {
    return this.http.get(`${this.apiUrl2}`);
  }

  //Get Subtask Data
  gettaskData(pname: any): Observable<any> {
    let endpoint = pname;
    return this.http.get(`${this.apiUrl3}/${endpoint}`);
  }

  getProjectName(email: any): Observable<any> {
    let endpoint = email;
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  //Delete data
  deleteResData(): Observable<any> {
    let endpoint = 'id';
    return this.http.delete(`${this.apiUrl2}/${endpoint}`, this.httpOptions);
  }

  //Update Project Details
  putProject(data: any, id: number): Observable<any> {
    let ids = id;
    console.log(id);
    return this.http.put(`${this.apiUrl}/${ids}`, data);
  }

  //Update Resource Details
  putResourcest(data: any, id: number): Observable<any> {
    let ids = id;
    console.log(id);
    return this.http.put(`${this.apiUrl2}/${ids}`, data);
  }

  //Update Subtask Details
  putSubtask(data: any, id: number): Observable<any> {
    let ids = id;
    console.log(id);
    return this.http.put(`${this.apiUrl3}/${ids}`, data);
  }

  //Delete project by ID
  deleteProject(id: number) {
    return this.http.delete<any>('http://localhost:3000/projectdetails/' + id);
  }

  //Delete Resources by Id
  deleteResource(id: number) {
    return this.http.delete<any>('http://localhost:3000/resourcedetails/' + id);
  }

  //Delete Subtask by Id
  deleteTask(id: number) {
    return this.http.delete<any>('http://localhost:3000/subtask/' + id);
  }
}
