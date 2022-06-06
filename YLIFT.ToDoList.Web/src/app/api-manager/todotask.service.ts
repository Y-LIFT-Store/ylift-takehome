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

       return this.httpClient.get<any>(GlobalConstants.apiURL, this.getHeaders());    
    }

    addTask(newTask: string) {
      
      //construct request body payload
      const addPayload = {"task_name":  newTask  };
      
     return this.httpClient
        .post<string>( GlobalConstants.apiURL, addPayload)
        .pipe(catchError(this.handleError));     
  
    }

    updateTask(taskId: string, taskName: string) {
      
        //construct request body payload
        const updatePaylod = {"_id": taskId ,"task_name": taskName };
        
       return this.httpClient
          .put<string>( GlobalConstants.apiURL, updatePaylod)
          .pipe(catchError(this.handleError));    
      }
    
      deleteTask(taskId: string) {
             
       return this.httpClient
          .delete<string>( GlobalConstants.apiURL +"?id="+taskId)
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

    getHeaders() {
        
        const headers = new HttpHeaders({'api-key': '7hQce2uD29nfWRpw38ASCOupUSaZ74KH1ZXjodtoeQij3Gm0URv9hhmIR2BBe0Rg'
        //, 'Access-Control-Allow-Origin':'*' 
        //, "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE"
       // ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      });    
        const options = {
          headers: headers,
        };
        return options;
      }
  }
  