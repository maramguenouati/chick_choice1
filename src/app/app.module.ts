import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftContainerComponent } from './left-container/left-container.component';
import { RightContainerComponent } from './right-container/right-container.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeServiceComponent } from './home-service/home-service.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { RegisterComponent } from './register/register.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { CalendarComponent } from './calendar/calendar.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { EventComponent } from './event/event.component'

@NgModule({
  declarations: [
    AppComponent,
    LeftContainerComponent,
    RightContainerComponent,
    WeatherComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AccountComponent,
    NavbarComponent,
    HomeServiceComponent,
    HowItWorkComponent,
    RegisterComponent,
    CategorieComponent,
    ChatbotComponent,
    CalendarComponent,
    WardrobeComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
