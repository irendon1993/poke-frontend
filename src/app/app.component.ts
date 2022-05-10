import { ConstantPool } from '@angular/compiler';
import { Component } from '@angular/core';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poke-frontend';

  constructor() {
    type HttpResponse = { code: number, data: string };

    const observable = new Observable<HttpResponse>(subscriber => {
      console.log('inside subscriber');
      subscriber.next({ code: 200, data: "this is data 1..."})
      subscriber.next({ code: 200, data: "this is data 2..."})
      subscriber.next({ code: 200, data: "this is data 3..."})
      // subscriber.error({code: 500, msg: 'An errot occured'})
      setTimeout(() => {
        subscriber.next({ code: 200, data: "this is more data"})
        subscriber.complete();
        }, 3 * 1000);
        console.log("subscriber is done emmiting...")
    });

    observable.subscribe({
      next(response: HttpResponse) {
        console.log("got response:", response);
      },
      error(error: any) {
        console.error('something wrong occurred: ', error);
      },
      complete() {
        console.log("done")
      }
    });
  }
}
