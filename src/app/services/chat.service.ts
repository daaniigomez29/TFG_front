import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage } from '../interfaces/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  stompClient:any

  constructor() {
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
        console.log(messageContent);
      });
    })
  }

  sendMessage(roomId:string, chatMessage: ChatMessage){
    this.stompClient.send(`app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
    console.log(chatMessage)
  }
}
