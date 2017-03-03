import { Component, OnInit } from '@angular/core';
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})
export class FormComponent implements OnInit {

  form = {
    successMessage: "Ok",
    errorMessage: "Error",
    formId: "1",
    successText: "Go",
    elements: [
      {
        id: "input1",
        model: "",
        type: "input",
        label: "text",
        class: ['input-field', 'col', 's6'],
        style: {'font-weight': 'bold'},
        wrap: ['row'],
        placeholder: "text",
        required: true,
        maxlength: "7",
        minlength: "5",
      },
      {
        id: "input2",
        model: "",
        type: "input",
        label: "email",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row'],
        placeholder: "text",
        required: false,
        maxlength: "24",
        minlength: "5"
      },
      {
        id: "input3",
        model: "",
        type: "input",
        label: "date",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row'],
        placeholder: "",
        required: false,
        maxlength: "24",
        minlength: "5"
      },
      {
        id: "textarea1",
        model: "sdfsdfsd",
        type: "textarea",
        label: "text",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row'],
        required: false,
        maxlength: "24",
        minlength: "5"
      },
    ],
  };

  onSubmit(){
    alert(this.form.successMessage);
  }

  constructor() { }

  ngOnInit() {
  }

}
