import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SocketIoService, MESSAGE_EVENT, INIT_EVENT, ConfigMsg } from './socket-io.service';
import { BasicMessage } from './socket-client/socket-client.component';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  messages: Subject<BasicMessage>;
  configs: Subject<ConfigMsg>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: SocketIoService) {
    this.messages = <Subject<BasicMessage>>wsService
      .connect(MESSAGE_EVENT)
      .pipe(
        map((response: any): any => {
          return response;
        })
      );
    this.configs = <Subject<ConfigMsg>>wsService
      .connect(INIT_EVENT)
      .pipe(
        map((response: any): any => {
          return response;
        })
      );
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(msg) {
    this.messages.next(msg);
  }

  get clientId(): string {
    return this.wsService.getClientid();
  }
}
