import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SocketIoService } from './socket-io.service';
import { ChatService } from './chat.service';
import { SocketClientComponent } from './socket-client/socket-client.component';

@NgModule({
  declarations: [
    AppComponent,
    SocketClientComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [SocketIoService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
