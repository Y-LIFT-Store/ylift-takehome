import { Component, OnInit } from '@angular/core';
import { ToDoTaskService } from '../api-manager/todotask.service';
import { ToDoTask } from '../models/task.model';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})

export class TodolistComponent implements OnInit {
  
  toDoTasks: Array<ToDoTask> = [];
 
  constructor(public taskService: ToDoTaskService) {}

  ngOnInit(): void {  this.getTasks();  }
  
  addNewTask(newTask: string) {}

   allItems = [
    { task_name: 'eat', _id: "1" },
    { task_name: 'sleep', _id:  "2" },
    { task_name: 'play', _id:  "3" },
    { task_name: 'laugh', _id:  "4" },
  ];

  getTasks() {    
       this.taskService.getTasks().subscribe((response) =>{ this.toDoTasks = response;  })  ;         
  }

  addTask(taskName: string)
  {
    this.allItems.push({task_name:taskName,_id:"5"});
  }

  editTask(taskId: string)
  {

  }

  deleteTask(taskId: string)
  {
    this.allItems.forEach((value,index)=>{
      if(value._id==taskId)  this.allItems.splice(index,1);
    });
  }
}


