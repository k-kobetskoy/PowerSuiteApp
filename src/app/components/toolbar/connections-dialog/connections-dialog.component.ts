import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IConnectionsDialogData } from 'src/app/models/connections-dialog-data';


@Component({
  selector: 'app-connections-dialog',
  templateUrl: './connections-dialog.component.html',
  styleUrls: ['./connections-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConnectionsDialogComponent implements OnInit {



  constructor(
    private dialogRef: MatDialogRef<ConnectionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConnectionsDialogData,
  ) { }

  ngOnInit() {
    
  }

  closeDialog(): void {
    this.dialogRef.close()
  }
}
