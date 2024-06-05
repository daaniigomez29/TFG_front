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
  messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]); //Mensajes con el usuario

  //Imagen de perfil de la otra persona con la que estamos chateando
  imageReceiver:string = ""

  constructor(private userService:UsersService, private authService:AuthUserService) {
    this.initConnectionSocket() //Inicia la conexión al socket
   }

  initConnectionSocket(){
    const socketUrl = "http://localhost:9090/chat-socket" //Api declarada en la configuración del WebSocket en el back
    const socket = new SockJS(socketUrl); //Instancia del Socket
    this.stompClient = Stomp.over(socket); //añade el cliente al socket
  }

  joinRoom(roomId: string){
    this.stompClient.connect({}, () =>{ //Conecta el usuario a una room en la que podrán chatear
      this.stompClient.subscribe(`/topic/${roomId}`, (message: any) => {
        const messageContent = JSON.parse(message.body); //mensaje en JSON
        const currentMessage = this.messageSubject.getValue(); //Obtiene el valor del mensaje

        currentMessage.push(messageContent) //Añade el nuevo mensaje al array de mensajes

        this.messageSubject.next(currentMessage); //Actualiza los mensajes para que se queden guardados

        if(this.authService.getUserData().id != messageContent.user && this.imageReceiver == ""){
          this.obtainDataUserSender(messageContent.user) //Obtiene imagen del otro usuario con el que hablamos
          this.imageReceiver = ""
        }
      });
    })
  }

  sendMessage(roomId:string, chatMessage: ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(chatMessage))
  }

  //Obtiene messageSubject como observable para que nos podamos suscribir
  getMessageSubject(){
    return this.messageSubject.asObservable();
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
}
