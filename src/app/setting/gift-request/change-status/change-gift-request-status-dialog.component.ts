import { Component, Injector, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppComponentBase } from '@shared/app-component-base';
import { ChangeStatusInputDto, UserGiftServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-change-gift-request-status-dialog',
  templateUrl: './change-gift-request-status-dialog.component.html',
  styleUrls: ['./change-gift-request-status-dialog.component.scss']
})
export class ChangeGiftRequestStatusDialogComponent extends AppComponentBase implements OnInit {

  id:number;
  saving: boolean = false;
  input: ChangeStatusInputDto = new ChangeStatusInputDto();
  public fields: Object = { text: "name", value: "id" };
  statuses: object[] = [];

  constructor(
    injector: Injector,
    public dialogRef: NbDialogRef<ChangeGiftRequestStatusDialogComponent>,
    private _userGiftService: UserGiftServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.input.id = this.id;

    this.statuses=[
      {'id': 0,'name': this.l('Pending')},
      {'id': 1,'name': this.l('Informed')},
      {'id': 2,'name': this.l('Handing')}
    ]
  }

  save(): void {
    this.saving = true;
    this._userGiftService
    .changeStatus(
        this.input
    )
    .pipe(
        finalize(() => {
        this.saving = false;
        })
    )
    .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.dialogRef.close();
    });
}

}
