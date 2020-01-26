import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-event",
  templateUrl: "./edit-event.component.html",
  styleUrls: ["./edit-event.component.css"]
})
export class EditEventComponent implements OnInit {
  dateForm: FormGroup;
  minutes = Array.from({ length: 59 }, (_, x) => {
    return x - 1 + 1;
  });
  hours = Array.from({ length: 24 }, (_, x) => {
    return x - 1 + 1;
  });
  constructor(
    private fb: FormBuilder,
    public acr: ActivatedRoute,
    private location: Location
  ) {
    this.dateForm = this.fb.group({
      date: ["", Validators.required],
      title: ["", Validators.required],
      starth: ["", Validators.required],
      startm: ["", Validators.required],
      endh: ["", Validators.required],
      endm: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    const event: any = JSON.parse(localStorage.getItem("events"));
    const existing = event.find(
      id => id.id === Number(this.acr.snapshot.params.id)
    );
    if (existing) {
      this.dateForm.get('date').clearValidators();
      this.dateForm.get('date').updateValueAndValidity();
      this.dateForm.get('title').clearValidators();
      this.dateForm.get('title').updateValueAndValidity();
      let x = {};
      x["starth"] = new Date(existing.startTime).getHours();
      x["startm"] = new Date(existing.startTime).getMinutes();
      x["endh"] = new Date(existing.endTime).getHours();
      x["endm"] = new Date(existing.endTime).getMinutes();
      x['title'] = existing.title;
      this.dateForm.patchValue(x);
    }
  }

  submit() {
    if (this.dateForm.valid) {
      const event: any = JSON.parse(localStorage.getItem("events"));
      if (this.acr.snapshot.params.id) {
        const existing = event.find(
          id => id.id === Number(this.acr.snapshot.params.id)
        );
        if (existing) {
          existing.startTime = new Date(
            new Date(existing.startTime).setHours(
              Number(this.dateForm.getRawValue().starth)
            )
          );
          existing.startTime = new Date(
            new Date(existing.startTime).setMinutes(
              Number(this.dateForm.getRawValue().startm)
            )
          );
          existing.endTime = new Date(
            new Date(existing.endTime).setHours(
              Number(this.dateForm.getRawValue().endh)
            )
          );
          existing.endTime = new Date(
            new Date(existing.endTime).setMinutes(
              Number(this.dateForm.getRawValue().endm)
            )
          );
          existing.title = this.dateForm.get('title').value;
          localStorage.setItem("events", JSON.stringify(event));
        }
      } else {
        let newDate = {};
        newDate["startTime"] = new Date(
          new Date(this.dateForm.get("date").value).setHours(
            Number(this.dateForm.getRawValue().starth)
          )
        );
        newDate["startTime"] = new Date(
          new Date(newDate["startTime"]).setMinutes(
            Number(this.dateForm.getRawValue().startm)
          )
        );
        newDate["endTime"] = new Date(
          new Date(newDate["startTime"]).setHours(
            Number(this.dateForm.getRawValue().endh)
          )
        );
        newDate["endTime"] = new Date(
          new Date(newDate["endTime"]).setMinutes(
            Number(this.dateForm.getRawValue().endm)
          )
        );
        newDate["title"] = this.dateForm.get("title").value;
        newDate["id"] = event.length + 1;
        event.push(newDate);
        localStorage.setItem("events", JSON.stringify(event));
      }
      this.location.back();
    } else {
      alert("Please fill all the fields");
    }
  }
}
