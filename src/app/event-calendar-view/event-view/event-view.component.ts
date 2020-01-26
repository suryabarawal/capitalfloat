import { Component, OnInit } from "@angular/core";
import { EventsService } from "src/app/events/events.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-event-view",
  templateUrl: "./event-view.component.html",
  styleUrls: ["./event-view.component.css"]
})
export class EventViewComponent implements OnInit {
  dateForm: FormGroup;
  todayDate: any = new Date();
  todayEvents = [];
  constructor(private eventsService: EventsService, private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      date: [""]
    });
  }

  ngOnInit() {
    this.getTodayDate();
  }

  getTodayDate() {
    this.todayDate = `${this.todayDate.getFullYear() +
      "-" +
      this.todayDate.getMonth() +
      1 +
      "-" +
      this.todayDate.getDate()}`;
    this.dateForm.get("date").setValue(this.todayDate);
    this.getDate(this.todayDate);
  }

  getEvents(date) {
    const events = localStorage.getItem("events");
    if (events) {
      this.mapTodayEvents(JSON.parse(events), date);
    } else {
      this.eventsService.getEvents().subscribe(res => {
        localStorage.setItem("events", JSON.stringify(res));
        this.mapTodayEvents(res, date);
      });
    }
  }

  mapTodayEvents(events, date) {
    this.todayEvents = events.filter(res => {
      const todayDate = new Date(date);
      const presentDate = new Date(res.startTime);
      res.startTime = this.dateObject(res.startTime, "startTime");
      res.endTime = this.dateObject(res.endTime, "end");
      if (
        todayDate.getFullYear() === presentDate.getFullYear() &&
        todayDate.getDate() === presentDate.getDate() &&
        todayDate.getMonth() === presentDate.getMonth()
      ) {
        return res;
      }
    });
  }

  delete(idd) {
    const events: any = JSON.parse(localStorage.getItem("events"));
    const index = events.findIndex(id => id.id === Number(idd));
    if (index !== -1) {
      events.splice(index, 1);
    }
    localStorage.setItem("events", JSON.stringify(events));
    this.getEvents(this.dateForm.get("date").value);
  }

  dateObject(date, startORend) {
    const returndate = new Date(date);
    let x = {};
    x["date"] = returndate.getDate();
    x["month"] = returndate.getMonth() + 1;
    if (startORend === "startTime") {
      x["startDate"] = returndate;
      x["startTime"] = returndate.toLocaleTimeString();
    } else {
      x["endTime"] = returndate.toLocaleTimeString();
      x["endDate"] = returndate;
    }
    return x;
  }

  getDate(date) {
    this.getEvents(date);
  }
}
