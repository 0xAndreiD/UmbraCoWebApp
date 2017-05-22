import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {DataParseService} from "../../services/DataParseService";

declare var classie;

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css']
})

export class FormComponent implements OnInit, AfterViewInit {

// rename class to cssclass
  form1:any = {
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
        subType: "text",
        class: ['input-field', 'col', 's6'],
        style: {'font-weight': 'bold'},
        wrap: [''],
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
        subType: "email",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: [''],
        placeholder: "text",
        required: true,
        maxlength: "24",
        minlength: "5"
      },
      {
        id: "input3",
        model: "",
        type: "input",
        label: "date",
        subType: "text",
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
        label: "",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row'],
        required: false,
        maxlength: "24",
        minlength: "5"
      },
      {
        id: "select",
        model: "",
        type: "select",
        label: "select",
        multiline: false,
        selectOptions: [{value: "1", name: "1"}, {value: "11", name: "11"}],
        placeholder: "Select Item",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row']
      },
      {
        id: "selectMultiple",
        model: "",
        type: "select",
        label: "selectMultiple",
        multiline: true,
        selectOptions: [{value: "1", name: "1"}, {value: "11", name: "11"}],
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row'],
        required: false,
        maxlength: "24",
        minlength: "5"
      },
      {
        id: "checkbox",
        model: true,
        type: "input",
        subType: "checkbox",
        label: "",
        class: ['input-field', 'col', 's6'],
        style: {'font-weight': 'bold'},
        wrap: ['row'],
        placeholder: "text",
        required: true,
        maxlength: "7",
        minlength: "5",
      },
      {
        id: "radio",
        model: true,
        type: "input",
        subType: "radio",
        label: "",
        class: ['input-field', 'col', 's6'],
        style: {'font-weight': 'bold'},
        wrap: ['row'],
        placeholder: "text",
        required: true,
        maxlength: "7",
        minlength: "5",
      },
      {
        id: "textarea1",
        model: "",
        type: "textarea",
        label: "text",
        class: ['input-field', 'col', 's6'],
        style: {},
        wrap: ['row'],
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

  form:any = {};

  onSubmit(){
    alert(this.form.successMessage);
  }

//  constructor(public httpService:HttpService) {
//    var id = 1132;
//    this.httpService.getForm(id).subscribe((response:any) => {
//      this.form = response.data[0];
//      this.form.elements = this.form1.elements;
//    })
//  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  //  window.addEventListener('scroll', function(e){
  //    var distanceY = window.pageYOffset || document.documentElement.scrollTop,
  //      shrinkOn = 300,
  //      header = document.querySelector("header");
  //    if (distanceY > shrinkOn) {
  //      classie.add(header,"smaller");
  //    } else {
  //      if (classie.has(header,"smaller")) {
  //        classie.remove(header,"smaller");
  //      }
  //    }
  //  })

  }
}
