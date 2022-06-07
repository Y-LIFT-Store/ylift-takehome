import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalConstants } from '../common/global-constants';


@Injectable({
    providedIn: 'root',
  })

  export class ToDoTaskService {
    
    constructor(public httpClient: HttpClient) {}
  
    getTasks() {      

       return this.httpClient
       .get<any>(GlobalConstants.apiURL)
       .pipe(catchError(this.handleError));    //, this.getHeaders()
    }

    addTask(newTask: string) {
      
      //construct request body payload
     const addPayload = {task_name:  newTask  }; 
         
     return this.httpClient
        .post<any>(GlobalConstants.apiURL, addPayload)
        .pipe(catchError(this.handleError));     
  
    }

    updateTask(taskId: string, taskName: string) {
      
        //construct request body payload
       const updatePaylod = {_id: taskId ,task_name: taskName };        
       return this.httpClient
          .put<any>( GlobalConstants.apiURL, updatePaylod)
          .pipe(catchError(this.handleError));    
      }
    
      deleteTask(taskId: string) {
             
       return this.httpClient
          .delete<any>( GlobalConstants.apiURL +"?id="+taskId)
          .pipe(catchError(this.handleError));    
      }

    handleError(error: HttpErrorResponse) {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
    }     
  }
  