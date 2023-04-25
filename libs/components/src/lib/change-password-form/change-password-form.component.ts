import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ChangePasswordRequest } from '@novavisio/interfaces';

/**
 * Componente para la vista change-password-form.
 */
@Component({
    selector: 'nv-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    @Input()
    public loading: boolean;

    /** Color de los controles del formulario. */
    @Input()
    public formFieldColor?: string;

    /** Color del botón submit. */
    @Input()
    public submitColor?: string;

    /** Cambia la selección de la base */
    @Output()
    public submitChangePassword: EventEmitter<ChangePasswordRequest> = new EventEmitter<ChangePasswordRequest>();

    /** Referencia del formulario. */
    public formChangePassword: UntypedFormGroup;

    /** True si la contraseña anterior se visibiliza. False de lo contrario. */
    public revealedOldPass = false;

    /** True si la contraseña nueva se visibiliza. False de lo contrario. */
    public revealedNewPass = false;

    /** True si la contraseña de confirmación se visibiliza. False de lo contrario. */
    public revealedConfirmPass = false;

    /**
     * Creates an instance of change password component.
     * @param formBuilder Administra operaciones para implementar formularios reactivos.
     */
    constructor(
        private formBuilder: UntypedFormBuilder
    ) { }

    /**
     * Evento de inicialización del componente.
     */
    public ngOnInit(): void {
        this.buildForm();
    }

    /**
     * Emite el evento de submit del formulario.
     */
    public changePassword(): void {
        const { oldPassword, newPassword, confirmation } = this.formChangePassword.value;
        this.submitChangePassword.emit({ oldPassword, newPassword, confirmation });
    }

    /**
     * Configura los campos del formulario reactivo.
     */
    private buildForm(): void {

        this.formChangePassword = this.formBuilder.group(
            {
                oldPassword: [null, Validators.required],
                newPassword: [null, [Validators.required, Validators.minLength(6)]],
                confirmation: [null, Validators.required]
            },
            { validators: this.passwordMatchValidator }
        );
    }

    /**
     * Validación de la confirmación de la contraseña.
     * @param formGroup Formulario.
     * @returns Validación de la confirmación de la contraseña.
     */
    private passwordMatchValidator(formGroup: UntypedFormGroup): ValidationErrors | null {

        if (formGroup.value?.newPassword && formGroup.value?.confirmation
            && formGroup.controls?.newPassword?.valid) {
            if (formGroup.value?.newPassword !== formGroup.value?.confirmation) {
                formGroup.controls?.confirmation?.setErrors({ match: true });
            } else {
                formGroup.controls?.confirmation?.setErrors(null);
            }
        }
        return null;
    }
}
