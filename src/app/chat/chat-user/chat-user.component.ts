import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../interfaces/ChatMessage';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrl: './chat-user.component.css'
})
export class ChatUserComponent implements OnInit, OnDestroy{

  messageInput:string = ""
  userFriendId:string = ""
  messageList:any[] = [];

  chatUser:string = ""

  isFriend:boolean = false

  enterKeyListener: (event: KeyboardEvent) => void;


  constructor(public chatService:ChatService, private route:ActivatedRoute, public authService:AuthUserService, private userService:UsersService, private router:Router){
    this.enterKeyListener = this.onEnterPress.bind(this);
  }

  ngOnInit(): void {
    this.userFriendId = this.route.snapshot.params['id']
    this.getFriends()
    this.chatService.initConnectionSocket()
    document.addEventListener('keydown', this.enterKeyListener);
    const roomId = this.generateRoomId(this.authService.getUserData().id, this.userFriendId);
    if(!this.userService.chatsUser[roomId]){
      this.userService.chatsUser[roomId] = roomId;
    }
    this.chatUser = this.userService.chatsUser[roomId]
    this.chatService.joinRoom(this.userService.chatsUser[roomId]);
    this.listenerMessage()
  }

  sendMessage(){
    if(this.messageInput != ""){
      const chatMessage: ChatMessage = {
        message: this.messageInput,
        user: this.authService.getUserData().id
      }
      this.chatService.sendMessage(this.chatUser, chatMessage);
      this.messageInput = ""
    }
  }

  listenerMessage(){
    this.chatService.getMessageSubject(this.chatUser).subscribe((messages: any) => {
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

   generateRoomId(userId1: string, userId2: string): string {
    return [userId1, userId2].sort((a, b) => Number(a) - Number(b)).join('-');
  }

  ngOnDestroy(): void {
    this.chatService.disconnect()
  }

    getFriends(){
      let id = Number.parseInt(this.userFriendId)
          this.userService.getFriends(this.authService.getUserData().id).subscribe({
            next: data =>{
              data.forEach(user =>{
                if(user.id == id){
                  this.isFriend = true
                }
              })
              if(this.isFriend == false){
                this.router.navigate(['home/users', this.userFriendId])
              }
            }
          })
    }
}
