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

  stompClient:any //Socket

  chatsMessages: Map<string, BehaviorSubject<ChatMessage[]>> = new Map();

  //Imagen de perfil de la otra persona con la que estamos chateando
  imageReceiver:string = ""

  constructor(private userService:UsersService, private authService:AuthUserService) {
   }

  initConnectionSocket(){
    const socketUrl = "http://localhost:8080/chat-socket" //Api declarada en la configuración del WebSocket en el back
    const socket = new SockJS(socketUrl); //Instancia del Socket
    this.stompClient = Stomp.over(socket); //añade el cliente al socket
  }

  joinRoom(roomId: string){
    if(!this.chatsMessages.has(roomId)){
      this.chatsMessages.set(roomId, new BehaviorSubject<ChatMessage[]>([]));
    }
    let idUser:string = roomId.split('-')[1]
  
    idUser == this.authService.getUserData().id ? idUser = roomId.split('-')[0] : idUser
    this.obtainDataUserSender(idUser);

    this.stompClient.connect({}, () =>{ //Conecta el usuario a una room en la que podrán chatear
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body); //mensaje en JSON
        const currentMessage = this.chatsMessages.get(roomId)!.getValue() //Obtiene el valor del mensaje

        currentMessage.push(messageContent) //Añade el nuevo mensaje al array de mensajes

        this.chatsMessages.get(roomId)!.next(currentMessage); //Actualiza los mensajes para que se queden guardados
      });
    })
  }

  sendMessage(roomId:string, chatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  //Obtiene messageSubject como observable para que nos podamos suscribir
  getMessageSubject(roomId: string){
    return this.chatsMessages.get(roomId)!.asObservable();
  }

  //Obtiene imagen del usuario con el que hablamos
  obtainDataUserSender(idUser:string): string{
    let id:number = Number.parseInt(idUser);
    this.userService.getUser(id).subscribe({
      next: data =>{
        this.imageReceiver = data.image
      }
    })
    return this.imageReceiver;
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Socket disconnected');
      });
    }
  }
}
