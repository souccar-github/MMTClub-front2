import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateQrCodeRequestDto, ProductDto, ProductServiceProxy, QrCodeRequestServiceProxy } from '@shared/service-proxies/service-proxies';
import { result } from 'lodash-es';
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-create-qr-code-dialog',
  templateUrl: './create-qr-code-dialog.component.html',
  styleUrls: ['./create-qr-code-dialog.component.scss']
})
export class CreateQrCodeDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  qrCodeRequest: CreateQrCodeRequestDto = new CreateQrCodeRequestDto();
  products: ProductDto[] = [];
  public productFields: Object = { text: "name", value: "id" };
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _qrCodeRequestService: QrCodeRequestServiceProxy,
    public _productService: ProductServiceProxy,

    public dialogRef: NbDialogRef<CreateQrCodeDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialProducts();
  }

  initialProducts() {
    this._productService.getAll()
      .subscribe(result => {
        this.products = result;
      });
  }

  save(): void {
    this.saving = true;

    this._qrCodeRequestService
      .create(this.qrCodeRequest)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.dialogRef.close();
        this.onSave.emit();
      });
  }

  print(id){
    
  }
}
