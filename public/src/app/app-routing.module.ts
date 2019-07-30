import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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


const routes: Routes = [
    { path: 'home', component: HomeComponent, children: [           // Home Main component
        {path: 'login', component: LoginComponent},
        {path: 'registration', component: RegistrationComponent},
    ] },
    { path: 'user', component: UserComponent, children: [           // User MAIN component
        { path: 'profile/:id', component: ProfileComponent},
        { path: 'friend/:id', component: FriendComponent, children: [
            { path: 'suggestion' , component: FriendSuggestionComponent },
            { path: 'search' , component: FriendSearchComponent },
            { path: 'friends' , component: FriendShowAllComponent },
            { path: '', pathMatch: 'full', redirectTo: 'friends' },
        ]},
        { path: 'home/:id', component: UserHomeComponent},           // User Home page
        { path: 'event/:id', component: EventComponent, children: [
            { path: 'create', component: EventCreateComponent },
            { path: 'calendar', component: EventCalendarComponent },
            { path: 'showAll', component: EventShowAllComponent, children: [
                { path: 'details/:id', component: EventDetailsComponent },
            ]},
            { path: '', pathMatch: 'full', redirectTo: 'showAll' },
        ]},
        { path: 'chat/:id', component: ChatComponent, children: [
            { path: 'new_message', component: ChatNewMessageComponent },    // may not need...
        ]},
    ]},
    { path: 'message/:id', component: ChatMessageComponent },
    { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

