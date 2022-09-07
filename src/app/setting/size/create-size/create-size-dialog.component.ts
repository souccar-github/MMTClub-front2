    import {
    Component,
    Injector,
    OnInit,
    Output,
    EventEmitter,
    } from "@angular/core";
    import { finalize } from "rxjs/operators";
    import { AppComponentBase } from "@shared/app-component-base";
    import {
    CreateSizeDto,
    SizeServiceProxy,
    } from "@shared/service-proxies/service-proxies";
    import { NbDialogRef } from "@nebular/theme";
    import { L10n, setCulture, loadCldr } from "@syncfusion/ej2-base";
    import { LocalizationHelper } from "@shared/localization/localization-helper";
    //import endTag

    setCulture("ar-SY");
    L10n.load(LocalizationHelper.getArabicResources());

    @Component({
    templateUrl: "create-size-dialog.component.html",
    styleUrls: ["create-size-dialog.component.scss"],
    providers: [SizeServiceProxy],
    })
    export class CreateSizeDialogComponent
    extends AppComponentBase
    implements OnInit
    {
    saving = false;
    size: CreateSizeDto = new CreateSizeDto();

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _sizeService: SizeServiceProxy,

        public dialogRef: NbDialogRef<CreateSizeDialogComponent>
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

    ngOnInit(): void {}

    save(): void {
        this.saving = true;

        this._sizeService
        .create(this.size)
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
    }
