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
    SizeServiceProxy,
    UpdateSizeDto,
    } from "@shared/service-proxies/service-proxies";
    import { NbDialogRef } from "@nebular/theme";
    //import endTag

    @Component({
    templateUrl: "edit-size-dialog.component.html",
    styleUrls: ["edit-size-dialog.component.scss"],
    })
    export class EditSizeDialogComponent
    extends AppComponentBase
    implements OnInit
    {
    saving = false;
    size: UpdateSizeDto = new UpdateSizeDto();
    id: number;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _sizeService: SizeServiceProxy,

        public dialogRef: NbDialogRef<EditSizeDialogComponent>
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._sizeService
        .getForEdit(this.id)
        .subscribe((result: UpdateSizeDto) => {
            this.size = result;
        });
    }

    save(): void {
        this.saving = true;

        this._sizeService
        .update(this.size)
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
