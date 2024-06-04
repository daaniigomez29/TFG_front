import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/ChatMessage';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrl: './chat-user.component.css'
})
export class ChatUserComponent implements OnInit{

  messageInput:string = ""
  userId:string = ""
  messageList:any[] = [];

  constructor(private chatService:ChatService, private route:ActivatedRoute, public authService:AuthUserService, private userService:UsersService){}


  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
    this.chatService.joinRoom("ABC")
    this.listenerMessage()
  }

  sendMessage(){
    const chatMessage: ChatMessage = {
      message: this.messageInput,
      user: this.userId
    }
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = ""
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages;
      
    });
  }

  obtainDataUserSender(idUser:string): string{
    let id:number = Number.parseInt(idUser);
    let imageString:string = "";
    this.userService.getUser(id).subscribe({
      next: data =>{
        imageString = data.image
      },
      error: err =>{
        return ""
      }
    })
    return imageString;
  }
}
