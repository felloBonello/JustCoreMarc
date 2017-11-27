import { Component } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { UpdateFlagService } from './updateflag.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private socket: Socket, private updateFlag: UpdateFlagService)
  {
    socket.on('updateFlag', (data) => {
      this.updateFlag.update();
    })
  }
}
