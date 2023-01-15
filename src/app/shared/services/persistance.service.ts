import { Injectable } from '@angular/core';

@Injectable()
export class PersistanceService {

  constructor() { }

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to localStorage', error)
    }
  }

  get(key: string): any {
    try {
      JSON.parse(localStorage.getItem(key))      
    } catch (error) {
      console.error('Error getting from localStorage', error)
      return null
    }
  }
}
