import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventViewComponent } from './event-view/event-view.component';
import { EditEventComponent } from './edit-event/edit-event.component';

const routes: Routes = [
  { path: '', component: EventViewComponent },
  { path: 'event', component: EditEventComponent },
  { path: 'event/:id', component: EditEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventCalendarViewRoutingModule { }
