import { Component, Input, OnInit } from '@angular/core';
import { ToDoTaskService } from '../api-manager/todotask.service';
import { ToDoTask } from '../models/task.model';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html', 
  styleUrls: ['./todolist.component.scss']
})

export class TodolistComponent implements OnInit {
  
  toDoTasks: Array<ToDoTask> = [];  
  actionHeader: string ="New Task";
  taskName:string = "";
  taskId:string ="";
  errMessage:string ="";

  constructor(public taskService: ToDoTaskService) {}

  ngOnInit(): void {  this.getTasks();  }  
  
  getTasks() {    

       this.taskService.getTasks()
       .subscribe((response) =>
       { 
         this.toDoTasks = response; 
       });         
  }

  addTask(taskName: string)
  {    
    if(this.isExist("",taskName)){
      return this.setMessage();
    }

    this.taskService.addTask(taskName)
    .subscribe((response) =>
    {     
      if(response.insertedId != undefined && response.insertedId != "")
      {     
        this.toDoTasks.push({_id: response.insertedId , task_name: taskName });       
      }    
    });     
  }

  deleteTask(taskId: string)
  {
    this.taskService.deleteTask(taskId)
    .subscribe((response) =>
    { 
      if(response.deletedCount === 1)
      {
        this.toDoTasks.forEach((value, index)=>{
          if(value._id === taskId)  
          {
             this.toDoTasks.splice(index, 1); 
             return;       
          }     
        });
      }
    
    });    
  }

  editTask(taskName: string)
  {
    if(this.taskId !="")
    {
      if(this.isExist(this.taskId, taskName)){
        return this.setMessage();
      }

      this.taskService.updateTask(this.taskId, taskName)
      .subscribe((response) =>
      { 
        if(response.modifiedCount === 1)
        {
          this.toDoTasks.forEach((value, index)=>{
            if(value._id === this.taskId)  
            {
              this.toDoTasks[index].task_name = taskName;   
              return this.cancelEditTask();
            }     
          });
        }
      
      });   
  } 

  }

  enableEditTask(taskId: string, taskName: string)
  {
    this.actionHeader="Edit Task";
    this.taskName = taskName;
    this.taskId = taskId;
    this.clearMessage();
  }

  cancelEditTask()
  {
    this.actionHeader="New Task";
    this.taskName = "";
    this.taskId = "";
    this.clearMessage();
  }

  isExist(taskId: string, taskName: string): any{
    
    for (let i = 0; i < this.toDoTasks.length; i++) {     
      if(this.toDoTasks[i].task_name.trim().toLowerCase() === taskName.trim().toLowerCase() 
      && this.toDoTasks[i]._id!==taskId)  
      {
        return true;             
      }        
    }

    return false; 
  }

  setMessage(){
    this.errMessage="Task already exists!"
  }

  clearMessage(){
    this.errMessage=""
  }
 
}


