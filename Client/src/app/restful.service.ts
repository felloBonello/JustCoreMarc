import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';

@Injectable()
export class RestfulService {

  constructor(public http: HttpClient) {
  } // constructor

  /**
   * Retrieves the json, pass back to a subscriber
   */
  load(url) {
    const headers = new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    return this.http.get<any>(url, {headers: headers});
  } // load

  /**
   * update an entity on the server using http put return number of entities updated
   */
  update(url: string, entity: any) {
    return this.http.put<any>(url, entity);
  } // update

  /**
   * send an entity on the server using http post, return id (could be string)
   */
  add(url: string, entity: any) {
    return this.http.post<any>(url, entity);
  } // add

  /**
   * login to start session with user credentials
   */
  login(url: string, entity: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = JSON.stringify(entity);
    return this.http.post<any>(url + '/login', params, {headers: headers});
  } // add

  /**
   * select run
   */
  selectRun(url: string, entity: any)
  {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
       .set('Authorization', localStorage.getItem('token'));
    console.log(headers);
    const params = JSON.stringify({workId: entity});
    console.log(params)
    return this.http.post<any>(url + '/selectWorkItem', params, {headers: headers});
  }//select run

  /**
   * delete an entity using http delete, return number of entities deleted
   */
  delete(url: string, id: any) {
    return this.http.delete<any>(url + '/' + id);
  } // delete

} // class RestfulService
