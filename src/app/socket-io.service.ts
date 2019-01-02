import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
import { BasicMessage } from './socket-client/socket-client.component';

export interface ConfigMsg { messageLog: BasicMessage[]; onlineUsers: any; noOfOnlineUsers: number; };

export const MESSAGE_EVENT = 'message';
export const INIT_EVENT = 'init';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  // Our socket connection
  private socket: SocketIOClient.Socket;

  constructor() {

    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    this.socket = io(environment.ws_url);
  }

  connect(eventName: string): Subject<MessageEvent> {

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    const observable = new Observable((observerInstnc) => {
      this.socket.on(eventName, (data: any) => {
        console.log('Received message from Websocket Server');
        observerInstnc.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    const observer = {
      next: (data: Object) => {
        this.socket.emit(eventName, data);
      },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Subject.create(observer, observable);
  }

  getClientid(): string {
    return this.socket.id;
  }

}
