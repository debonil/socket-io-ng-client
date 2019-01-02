import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigMsg } from '../socket-io.service';

export interface BasicMessage {
  senderId: string;
  sender: string;
  msg: string;
  time: Date;
  sendByMe?: boolean;
}

@Component({
  selector: 'app-socket-client',
  templateUrl: './socket-client.component.html',
  styleUrls: ['./socket-client.component.css']
})
export class SocketClientComponent implements OnInit {
  messageThread: BasicMessage[];
  onlineUsers: any;
  noOfOnlineUsers: number;
  msgForm: FormGroup;

  constructor(private chat: ChatService, private fb: FormBuilder) {
    this.msgForm = this.fb.group({
      msg: new FormControl('', Validators.required)
    });
    this.messageThread = [];
  }

  ngOnInit() {

    this.chat.configs.subscribe((cnfigMsg: ConfigMsg) => {
      this.messageThread = cnfigMsg.messageLog
        /*       .map(
                (msg: BasicMessage) => {
                  msg.sendByMe = msg.senderId === this.chat.clientId;
                  return msg;
                }
              ) */
        ;
      this.onlineUsers = cnfigMsg.onlineUsers;
      this.noOfOnlineUsers = cnfigMsg.noOfOnlineUsers;
      console.log(cnfigMsg.noOfOnlineUsers);
    });
    this.chat.messages.subscribe((msg: BasicMessage) => {
      this.messageThread.push(msg);
      console.log(msg);
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.msgForm.value);
    this.sendMsg(this.msgForm.value.msg);
    this.msgForm.reset();
  }
  sendMsg(msg: string) {
    this.chat.sendMsg(msg);
    this.messageThread.push({ senderId: this.chat.clientId, sender: this.chat.clientId, msg: msg, time: new Date(), sendByMe: true });
  }
}
