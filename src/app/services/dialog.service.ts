import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/portal';

@Injectable()
export class DialogService {
  constructor(private dialog: MatDialog) {
  }

  public open(component: ComponentType<unknown>, config?: MatDialogConfig) {
    this.removeActiveFocus();
    return this.dialog.open(component, config);
  }

  /**
   * Remove active focus from the document
   */
  private removeActiveFocus() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }
}
