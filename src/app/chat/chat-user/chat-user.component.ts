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


  enterKeyListener: (event: KeyboardEvent) => void;


  constructor(public chatService:ChatService, private route:ActivatedRoute, public authService:AuthUserService, private userService:UsersService){
    this.enterKeyListener = this.onEnterPress.bind(this);
  }


  ngOnInit(): void {
    document.addEventListener('keydown', this.enterKeyListener);
    this.userId = this.route.snapshot.params['id']
    this.chatService.joinRoom("ABC")
    this.listenerMessage()
  }

  sendMessage(){
    if(this.messageInput != ""){
      const chatMessage: ChatMessage = {
        message: this.messageInput,
        user: this.userId
      }
      this.chatService.sendMessage("ABC", chatMessage);
      this.messageInput = ""
    }
  }

  listenerMessage(){
    this.chatService.getMessageSubject().subscribe((messages: any) => {
      this.messageList = messages;
    });
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if(this.messageInput != ""){
        this.sendMessage();
      }
    }
  }
}
