import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

const UPDATES = [
  {date: '2024-12-30', version: '3.2.37-BETA', content: 'Felvasalható anyag megadás implementálása a folt lapon, számítási függvény módosítása. A SZÁMÍTÁSI BEÁLLÍTÁSOKBAN NYOMJ AZ ÁTÁLLÍT VAGY VISSZAÁLLÍT GOMBRA!'},
  {date: '2024-12-30', version: '3.2.36-BETA', content: 'Kosár összeg érték és kosár ürítés javítása.'},
  {date: '2024-12-30', version: '3.2.35-BETA', content: 'Új frissítések dialógus hozzáadása. Itt láthatók milyen újítások kerültek be!'},
]

@Component({
  selector: 'app-updates-dialog',
  templateUrl: './updates-dialog.component.html',
  styleUrls: ['./updates-dialog.component.scss']
})
export class UpdatesDialogComponent{
  updates = [];
  constructor(
    public dialogRef: MatDialogRef<UpdatesDialogComponent>,
    
  ) {
    this.updates = UPDATES
  }

  close() {
    this.dialogRef.close();
  }
}
