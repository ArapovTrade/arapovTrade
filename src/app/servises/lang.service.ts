import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor() {}
  private numberSubject = new BehaviorSubject<number>(0);

  // number = 1;
  // getNumber() {
  //   return this.number;
  // }
  // setNumber(num: number) {
  //   this.number = num;
  // }
  getNumber(): Observable<number> {
    return this.numberSubject.asObservable();
  }
  setNumber(newValue: number): void {
    this.numberSubject.next(newValue);
  }
}
