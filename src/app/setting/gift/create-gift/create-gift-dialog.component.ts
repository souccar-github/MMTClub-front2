import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateGiftDto,
  FileUploadDto,
  GiftServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";
import { L10n, setCulture, loadCldr } from "@syncfusion/ej2-base";
import { LocalizationHelper } from "@shared/localization/localization-helper";
//import endTag
const MAX_SIZE: number = 1048576;
setCulture("ar-SY");
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  templateUrl: "create-gift-dialog.component.html",
  styleUrls: ["create-gift-dialog.component.scss"],
  providers: [GiftServiceProxy],
})
export class CreateGiftDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  gift: CreateGiftDto = new CreateGiftDto();
levelId:number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _giftService: GiftServiceProxy,

    public dialogRef: NbDialogRef<CreateGiftDialogComponent>
  ) {
    super(injector);
    loadCldr(
      require("cldr-data/main/ar-SY/numbers.json"),
      require("cldr-data/main/ar-SY/ca-gregorian.json"),
      require("cldr-data/supplemental/numberingSystems.json"),
      require("cldr-data/main/ar-SY/timeZoneNames.json"),
      require("cldr-data/supplemental/weekdata.json")
    );
  }

  ngOnInit(): void {
    this.gift.levelId = this.levelId;
    this.imageSrc = this.emptySrc;
  }

  save(): void {
    
    this.saving = true;

    this._giftService
      .create(this.gift)
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