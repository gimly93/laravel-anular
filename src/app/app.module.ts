import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";


import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {ChatModule} from "./chat/chat.module";
import {AuthModule} from "./auth/auth.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {ChatRoutingModule} from "./chat/chat-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpModule,
        ChatModule,
        AuthModule,
        AuthRoutingModule,
        ChatRoutingModule,
        AppRoutingModule

    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
