import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HowItWorkComponent } from './how-it-work/how-it-work.component';
import { HomeServiceComponent } from './home-service/home-service.component';
import { RegisterComponent } from './register/register.component';
import { LeftContainerComponent } from './left-container/left-container.component';
import { RightContainerComponent } from './right-container/right-container.component';
import { CategorieComponent } from './categorie/categorie.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { EventComponent } from './event/event.component';
import { SidebareComponent } from './sidebare/sidebare.component';
import { WeatherRecommendationModalComponent } from './weather-recommendation-modal/weather-recommendation-modal.component';
import { ClothingCategoriesComponent } from './clothing-categories/clothing-categories.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
{path:"weather",component:WeatherComponent},
{path:"account",component:AccountComponent},
{path:"footer",component:FooterComponent},
{path:"navbar",component:NavbarComponent},
{path:"howitwork",component:HowItWorkComponent},
{path:"service",component:HomeServiceComponent},
{path:"register",component:RegisterComponent},
{path:"leftmeteo",component:LeftContainerComponent},
{path:"rightmeteo",component:RightContainerComponent},
{path:"categorie",component:CategorieComponent},
{path:"calendar",component:CalendarComponent},
{path:"chatbot",component:ChatbotComponent},
{path:"wardrob",component:WardrobeComponent , children:[{path:'',component:ClothingCategoriesComponent}]},
{path:"event",component:EventComponent},
{path:"sidebar",component:SidebareComponent},
{path:"weatherRecommendation",component:WeatherRecommendationModalComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
