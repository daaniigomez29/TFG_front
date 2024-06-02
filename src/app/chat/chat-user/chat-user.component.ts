import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/ChatMessage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrl: './chat-user.component.css'
})
export class ChatUserComponent implements OnInit{

  messageInput:string = ""
  userId:string = ""
  messageList:any[] = []

  constructor(private chatService:ChatService, private route:ActivatedRoute){}


  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']
    this.chatService.joinRoom("ABC")
  }

  sendMessage(){
    const chatMessage: ChatMessage = {
      message: this.messageInput,
      user: this.userId
    }
    this.chatService.sendMessage("ABC", chatMessage);
    this.messageInput = ""
  }
}
