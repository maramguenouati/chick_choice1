import { Component, OnInit } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Importez Router depuis @angular/router

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

  currentDate: string = "";
  days: number[] = [];
  currYear!: number;
  currMonth!: number;
  months: string[] = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  events: { date: number, title: string, color: string }[] = [];

  constructor(private router: Router) {} 

  ngOnInit() {
    let date = new Date();
    this.currYear = date.getFullYear();
    this.currMonth = date.getMonth();
    this.renderCalendar();
  }

  renderCalendar() {
    let firstDayofMonth = new Date(this.currYear, this.currMonth, 1).getDay();
    let lastDateofMonth = new Date(this.currYear, this.currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(this.currYear, this.currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(this.currYear, this.currMonth, 0).getDate();
    let daysArray = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      daysArray.push(lastDateofLastMonth - i + 1);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      daysArray.push(i);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      daysArray.push(i - lastDayofMonth + 1);
    }

    this.currentDate = `${this.months[this.currMonth]} ${this.currYear}`;
    this.days = daysArray;
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
    $('#formModal').modal('show');
    console.log('Clicked on day:', day);
  }

  formModal() {
    $('#formModal').modal('hide');
    this.formModal(); 
}

  createEvent(eventTitle: string, eventColor: string) {
    console.log('Event Title:', eventTitle);
    console.log('Event Color:', eventColor);
    this.events.push({ date: this.currMonth + 1, title: eventTitle, color: eventColor });
    $('#formModal').modal('hide');
  }

  areFieldsFilled(eventTitle: string): boolean {
    return !!eventTitle; 
  }

  hasEvent(day: number): boolean {
    return this.events.some(event => event.date === day);
  }
}
