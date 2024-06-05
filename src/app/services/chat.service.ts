import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../interfaces/ChatMessage';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { AuthUserService } from './auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  stompClient:any
  messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);

  imageReceiver:string = ""

  constructor(private userService:UsersService, private authService:AuthUserService) {
    this.initConnectionSocket()
   }

  initConnectionSocket(){
    const socketUrl = "http://localhost:9090/chat-socket"
    const socket = new SockJS(socketUrl);
    this.stompClient = Stomp.over(socket);
  }

  joinRoom(roomId: string){
    this.stompClient.connect({}, () =>{
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body);
        const currentMessage = this.messageSubject.getValue();

        console.log(currentMessage)

        currentMessage.push(messageContent)

        this.messageSubject.next(currentMessage);

        if(this.authService.getUserData().id != messageContent.user && this.imageReceiver == ""){
          this.obtainDataUserSender(messageContent.user)
        }
      });
    })
  }

  sendMessage(roomId:string, chatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  getMessageSubject(){
    return this.messageSubject.asObservable();
  }

  obtainDataUserSender(idUser:string): string{
    let id:number = Number.parseInt(idUser);
    this.userService.getUser(id).subscribe({
      next: data =>{
        this.imageReceiver = data.image
      }
    })
    return this.imageReceiver;
  }
}
