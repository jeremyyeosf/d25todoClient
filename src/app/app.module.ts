import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainTodoComponent } from './main-todo/main-todo.component';
import { SubTodoComponent } from './sub-todo/sub-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoDisplayComponent } from './todo-display/todo-display.component';

const ROUTES: Routes = [
  { path: '', component: MainTodoComponent },
  { path: 'subtodo', component: SubTodoComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainTodoComponent,
    SubTodoComponent,
    TodoDisplayComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
