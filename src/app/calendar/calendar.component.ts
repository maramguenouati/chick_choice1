import { Component, OnInit } from '@angular/core';
import { faArrowCircleLeft, faArrowCircleRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  faArrowCircleLeft: any = faArrowCircleLeft;
  faArrowCircleRight: any = faArrowCircleRight;
  faUser: any = faUser;
  showSidebar = true;
  currentDate: string = "";
  days: number[] = [];
  currYear!: number;
  currMonth!: number;
  selectedDay!: number;
  months: string[] = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  events: { date: number, title: string, color: string, month: number, year: number }[] = [];
  
  firstDayofMonth: number;
  lastDateofMonth: number;
  constructor(private router: Router) {}

  ngOnInit() {
    this.goToToday();
  }

  goToToday() {
    let date = new Date();
    this.currYear = date.getFullYear();
    this.currMonth = date.getMonth();
    this.renderCalendar();
  }

  renderCalendar() {
    this.days = [];
    this.firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    this.lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(this.currYear, this.currMonth, this.lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();

    for (let i = this.firstDayofMonth; i > 0; i--) {
      this.days.push(lastDateofLastMonth - i + 1);
    }

    for (let i = 1; i <= this.lastDateofMonth; i++) {
      this.days.push(i);
    }

    for (let i = lastDayofMonth; this.days.length % 7 !== 0; i++) {
      this.days.push(i - lastDayofMonth + 1);
    }

    this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
  }

  prevNextClick(isPrev: boolean) {
    this.currMonth = isPrev ? this.currMonth - 1 : this.currMonth + 1;

    if (this.currMonth < 0 || this.currMonth > 11) {
      let date = new Date(this.currYear, this.currMonth, new Date().getDate());
      this.currYear = date.getFullYear();
      this.currMonth = date.getMonth();
    } else {
      this.currYear = new Date().getFullYear();
    }
    this.renderCalendar();
  }

  handleDayClick(day: number) {
    this.selectedDay = day;
    $('#formModal').modal('show');
    console.log('Clicked on day:', day);
  }
  createEvent(eventTitle: string, eventColor: string) {
    console.log('Event Title:', eventTitle);
    console.log('Event Color:', eventColor);
    
    // Récupérer la date actuelle
    const currentDate = new Date();
    
    // Si le mois en cours ne correspond pas au mois de la date sélectionnée, ajuster la date
    if (this.currMonth !== currentDate.getMonth()) {
        this.currMonth = currentDate.getMonth();
        this.currYear = currentDate.getFullYear();
        this.renderCalendar();
    }
    
    // Ajouter l'événement
    this.events.push({ date: this.selectedDay, title: eventTitle, color: eventColor, month: this.currMonth, year: this.currYear });
    
    $('#formModal').modal('hide');
    this.renderCalendar(); 
}

  hasEvent(day: number): boolean {
    return this.events.some(event => 
      event.date === day && 
      event.month === this.currMonth && 
      event.year === this.currYear
    );
  }
  
  getEvents(day: number) {
    return this.events.filter(event => 
      event.date === day && 
      event.month === this.currMonth && 
      event.year === this.currYear
    );
  }
  
  isCurrentDate(day: number): boolean {
    const currentDate = new Date();
    const calendarDate = new Date(this.currYear, this.currMonth, day);
    return currentDate.getDate() === calendarDate.getDate() &&
           currentDate.getMonth() === calendarDate.getMonth() &&
           currentDate.getFullYear() === calendarDate.getFullYear();
  }
  deleteEvent(){}
  
}
