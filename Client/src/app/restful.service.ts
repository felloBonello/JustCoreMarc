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
    return this.http.get<any>(url);
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
   * delete an entity using http delete, return number of entities deleted
   */
  delete(url: string, id: any) {
    return this.http.delete<any>(url + '/' + id);
  } // delete

} // class RestfulService
