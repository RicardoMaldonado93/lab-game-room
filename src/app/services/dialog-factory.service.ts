import { DialogData } from '../models/dialogModel';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DialogComponent } from '../components/modal/modal.component';

// Services
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class DialogFactoryService<T = undefined> {
  constructor(private dialog: MatDialog) {}

  open(
    dialogData: DialogData<T>,
    options: MatDialogConfig = { width: '500', disableClose: true }
  ): DialogService<T> {
    const dialogRef = this.dialog.open<
      DialogComponent<T>,
      DialogData<MatDialogConfig>
    >(DialogComponent, {
      data: dialogData,
      ...options,
    });

    dialogRef.afterClosed().pipe(first());

    return new DialogService(dialogRef);
  }
}
