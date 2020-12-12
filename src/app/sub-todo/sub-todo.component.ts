import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { TodoStorageService } from '../todo-storage-service';


@Component({
  selector: 'app-sub-todo',
  templateUrl: './sub-todo.component.html',
  styleUrls: ['./sub-todo.component.css']
})
export class SubTodoComponent implements OnInit {

  subTodoForm: FormGroup;
  subTodoArray: FormArray = new FormArray([]);
  // description: FormControl;
  imageUrl: string;
  @ViewChild('imageFile') imageFile: ElementRef;
  


  constructor(private fb: FormBuilder, private http: HttpClient, private todoSvc: TodoStorageService ) { }

  ngOnInit(): void {
    this.subTodoForm = this.fb.group({
      "image-file": this.fb.control('', [ Validators.required ]),
      subTodoArray: this.fb.array([this.subTodoArray])
      
    })
  }

  addSub() {
    // const subtodo = this.fb.group({
    //   description: this.fb.control('', [ Validators.required ]),
    // })
    this.subTodoArray.push(new FormControl('', [Validators.required]))
  }

  deleteSub(i: number) {
    this.subTodoArray.removeAt(i)
  }

  submit() {
    this.todoSvc.push(this.subTodoForm.value) 
    const formData = new FormData()
    formData.set('upload', this.imageFile.nativeElement.files[0])
    formData.set('todoDetails', this.todoSvc.results)
    this.http.post('http://localhost:3000/upload', formData)
      .toPromise()
      .then((result) => {
        this.imageUrl = result['s3_file_key']
        console.log('upload image result: ', result)
        this.todoSvc.push(this.imageUrl) 
        console.log('todoStore: ', this.todoSvc.results)  
      }).catch((error) => {
        console.log(error)
      })
  }

  sendToExpress() {
    this.todoSvc.sendDataToExpress(this.todoSvc.results)
    console.log('data sent to express')
  }
}
