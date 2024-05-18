import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import { TemperatureData } from '../Models/TemperatureData';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { WeatherRecommendationModalComponent } from '../weather-recommendation-modal/weather-recommendation-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  weatherMessage: string;
  temperatureData: TemperatureData;
  modalRef: BsModalRef;
  showSidebar = true;
  constructor(private weatherService: WeatherService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getWeatherForUser('Tunis');
  }

  getWeatherForUser(city: string): void {
    this.weatherService.getLocationDetails(city, 'en-US').subscribe({
      next: (locationDetails) => {
        const latitude = locationDetails.location.latitude[0];
        const longitude = locationDetails.location.longitude[0];
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        this.weatherService.getWeatherReport(date, latitude, longitude, 'en-US', 'm').subscribe({
          next: (weatherDetails) => {
            this.weatherService.weatherDetails = weatherDetails;
            this.weatherService.prepareData();

            this.temperatureData = this.weatherService.temperatureData;
            this.weatherMessage = this.weatherService.getClothingRecommendation(this.temperatureData.temperature);
            
            // Ouvrir le modal après 2 secondes
            setTimeout(() => {
              this.openModal();
            }, 100);
          }
        });
      }
    });
  }

  openModal(): void {
    const initialState = {
      recommendation: this.weatherMessage
    };
    this.modalRef = this.modalService.show(WeatherRecommendationModalComponent, { initialState });
  }
}
