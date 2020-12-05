import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(public http?: HttpClient) {}

  async api<T, K>(url: string, method: string, data?: T, headers?: any): Promise<K> {
    try {
      return await this.http[method](url, data , headers).toPromise();
    } catch (e) {
      return await e;
    }
  }
}
