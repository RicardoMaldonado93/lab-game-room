import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private __customConfig:MatSnackBarConfig<any>;
  constructor(private snack:MatSnackBar) {
    this.__customConfig = {
      duration: 2000,
      horizontalPosition:"right",
      verticalPosition:"bottom"
    }
   }


  openSuccess( message = "Success!! 🤖" ){
    this.snack.open(message, '', {
      panelClass:["success-snackbar"],
      ...this.__customConfig
    })
  }

  openError( message = "Error!! 🤕" ){
    this.snack.open(message, '', {
      ...this.__customConfig,
      panelClass:["error-snackbar"]

    })
  }
}
