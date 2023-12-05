import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
// import Calendar from 'tui-calendar-angular';

@Component({
  selector: 'shift-calender',
  templateUrl: './caldendar.component.html',
  styleUrls: ['./caldendar.component.scss'],
})
export class ShiftCalendarComponent {
  @ViewChild('calendar') calendarContainer!: ElementRef;
//   @ViewChild('#currentWeek') currentWeekContainer!: ElementRef;

  currentDate!: Date;
  currentWeek!: { startDate: Date | null; endDate: Date | null };

  //   _calenderModule = inject(Calendar);
  // calendar!: Calendar

  options: {} = {
    usageStatistics: false,
    defaultView: 'week',
    taskView: ['allday'],
    week: {
      startDayOfWeek: 1,
      //   eventView: false,
      taskView: false,
    },
    gridSelection: {
      enableDblClick: false,
      enableClick: true,
    },
    timezone: {
      zones: [
        {
          timezoneName: 'Europe/London',
          displayLabel: 'London',
        },
      ],
      //   calendars: [
      //     {
      //       id: 'cal1',
      //       name: 'Unallocated',
      //     },
      //   ],
    },
  };

  // ngAfterViewInit(): void {
  //   // this.currentWeek = this.getCurrentWeek();
  //   // this.calendar = new Calendar(
  //   //   this.calendarContainer.nativeElement,
  //   //   this.options
  //   // );
  //   // this.calendar.setTheme({
  //   //   common: {
  //   //     // holiday: {
  //   //     //   color: 'rgba(255, 64, 64, 0.5)',
  //   //     // },
  //   //   },
  //   //   week: {
  //   //     today: {
  //   //       color: '#673ab7',
  //   //       backgroundColor: 'rgba(81, 230, 92, 0.05)',
  //   //     },
  //   //     weekend: {
  //   //         backgroundColor: 'rgba(255,229,229, 05)'
  //   //     },
  //   //   },
  //   // });
  //   // calendar.createEvents([
  //   //   {
  //   //     id: 'event1',
  //   //     calendarId: 'cal2',
  //   //     title: 'Weekly meeting',
  //   //     start: '2023-011-19T09:00:00',
  //   //     end: '2023-011-19T12:00:00',
  //   //   },
  //   //   {
  //   //     id: 'event2',
  //   //     calendarId: 'cal1',
  //   //     title: 'Lunch appointment',
  //   //     start: '2023-011-19T13:00:00',
  //   //     end: '2023-011-19T16:00:00',
  //   //   },
  //   //   {
  //   //     id: 'event3',
  //   //     calendarId: 'cal2',
  //   //     title: 'Vacation',
  //   //     start: '2023-011-17',
  //   //     end: '2023-011-18',
  //   //     isAllday: true,
  //   //     category: 'allday',
  //   //   },
  //   // ]);
  // }

  // previuos() {
  //   this.calendar.prev();
  // }

  // next() {
  //   this.calendar.next();
  // }

  getCurrentWeek() {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1)));
    const lastDay = new Date(currentDate.setDate(firstDay.getDate() + 6));

    return {
      startDate: firstDay,
      endDate: lastDay
    };
  }
}
