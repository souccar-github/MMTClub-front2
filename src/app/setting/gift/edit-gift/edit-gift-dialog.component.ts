import {
    Component,
    Injector,
    OnInit,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    Inject,
    Optional
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AppComponentBase } from '@shared/app-component-base';
import {
    API_BASE_URL,
    FileUploadDto,
    GiftServiceProxy, UpdateGiftDto,
    

} from '@shared/service-proxies/service-proxies';
import { NbDialogRef } from '@nebular/theme';
const MAX_SIZE: number = 1048576;

@Component({
    templateUrl: 'edit-gift-dialog.component.html',
    styleUrls: ['edit-gift-dialog.component.scss']
})
export class EditGiftDialogComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    gift: UpdateGiftDto = new UpdateGiftDto();
    id: number;
    levelId:number;
    baseUrl: string;
    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _giftService: GiftServiceProxy,
        public dialogRef: NbDialogRef<EditGiftDialogComponent>,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.baseUrl = baseUrl;
    }

    ngOnInit(): void {
        this._giftService.getForEdit(this.id).subscribe((result: UpdateGiftDto) => {
            this.gift = result;
            
            if (result.image != undefined) {
            this.imageSrc = this.baseUrl + "/" + result.image.filePath;
            } else {
            this.imageSrc = this.emptySrc;
            }
        });
    }

    save(): void {
        this.saving = true;

        this._giftService
            .update(this.gift)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.dialogRef.close();
                this.onSave.emit();
            });
    }

    //=============
    @ViewChild("image") image : ElementRef;
    
    imageSrc: any;
    emptySrc = 'assets/img/upload.png';
    
    showUploadImageDialog(args){
        this.image.nativeElement.click(); 
    }
    
    onChangeImage(event){
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            
            if (file.size < MAX_SIZE) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.imageSrc = reader.result;

                    let dto = new FileUploadDto();
                    dto.fileName = file.name;
                    dto.fileSize = file.size;
                    dto.fileType = file.type;
                    dto.fileAsBase64 = reader.result.toString();
                    this.gift.image = dto;
                }
        
                reader.readAsDataURL(file);
            }else{
                this.notify.error("File: " + event.target.files[0].name + " is too large to upload.");
            }
            
        }
    }

    deleteImage(args){
        this.imageSrc = this.emptySrc;
        this.gift.image = undefined;
    }
}
