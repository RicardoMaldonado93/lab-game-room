import { DialogData } from '../models/dialogModel';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'; 
import { first } from 'rxjs/operators';
import { DialogComponent } from '../components/modal/modal.component';

// Services
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class DialogFactoryService<T = undefined> {
  private dialogRef!:MatDialogRef<any,any>;

  constructor(private dialog: MatDialog) {}
  open(
    dialogData: DialogData<T>,
    options: MatDialogConfig = { width: '500', disableClose: true }
  ): DialogService<T> {
    this.dialogRef = this.dialog.open<DialogComponent<T>,DialogData<MatDialogConfig>>(DialogComponent, { data: dialogData,...options,});
    this.dialogRef.afterClosed().pipe(first());

    return new DialogService(this.dialogRef);
  }

  close(result?:any){
    return this.dialogRef.close(result);
  }
}
