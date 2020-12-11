import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoStorageService } from '../todo-storage-service';

@Component({
  selector: 'app-main-todo',
  templateUrl: './main-todo.component.html',
  styleUrls: ['./main-todo.component.css']
})
export class MainTodoComponent implements OnInit {
  todoForm: FormGroup;
  name: FormControl;
  dueDate: FormControl;
  priority: FormControl;

  constructor(private fb: FormBuilder, private todoSvc: TodoStorageService) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      name: this.fb.control('', [ Validators.required ]),
      dueDate: this.fb.control(''),
      priority: this.fb.control('')
    })
  }

  createTodo() {
    // console.log('FormGroup: ', this.todoForm)
    this.todoSvc.add(this.todoForm.value)
    console.log('todoStore: ', this.todoSvc.results)
  }

}
