import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendComponent } from './friend/friend.component';
import { FriendShowAllComponent } from './friend-show-all/friend-show-all.component';
import { FriendSearchComponent } from './friend-search/friend-search.component';
import { FriendSuggestionComponent } from './friend-suggestion/friend-suggestion.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventCalendarComponent } from './event-calendar/event-calendar.component';
import { EventShowAllComponent } from './event-show-all/event-show-all.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ChatComponent } from './chat/chat.component';
import { ChatNewMessageComponent } from './chat-new-message/chat-new-message.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    FriendComponent,
    UserHomeComponent,
    EventComponent,
    EventCreateComponent,
    EventCalendarComponent,
    EventShowAllComponent,
    EventDetailsComponent,
    ChatComponent,
    ChatNewMessageComponent,
    ChatMessageComponent,
    FriendShowAllComponent,
    FriendSearchComponent,
    FriendSuggestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
