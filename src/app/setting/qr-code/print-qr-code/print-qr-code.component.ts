import { Component, Inject, Injector, OnInit, Optional, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { API_BASE_URL, QrCodeDto, QrCodeRequestServiceProxy, QrCodeServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
    selector: 'app-print-qr-code',
    templateUrl: './print-qr-code.component.html',
    styleUrls: ['./print-qr-code.component.scss']
  })
export class PrintQrCodeComponent extends AppComponentBase implements OnInit {

    requestId: number;
    codes: QrCodeDto[] = [];
    baseUrl: string;
    constructor(
        injector: Injector,
        private _qrCodeAppService: QrCodeServiceProxy,
        private _route: ActivatedRoute,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
        ){
        super(injector);
        this.baseUrl = baseUrl;
    }

    ngOnInit(): void {
        this._route.queryParams.subscribe((params:any)=>{
            this.requestId = params.id;
        });

        if(this.requestId != undefined){
            this.getGrCode();
        }
        
    }

    getGrCode(){
        this._qrCodeAppService.getAllByRequestId(this.requestId)
        .subscribe(result => {
            console.log(result);
            this.codes = result;
        })
    }
}