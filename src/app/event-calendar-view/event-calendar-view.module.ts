import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventCalendarViewRoutingModule } from './event-calendar-view-routing.module';
import { EventViewComponent } from './event-view/event-view.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditEventComponent } from './edit-event/edit-event.component';

@NgModule({
  declarations: [
    EventViewComponent,
    EditEventComponent
  ],
  imports: [
    CommonModule,
    EventCalendarViewRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventCalendarViewModule { }
