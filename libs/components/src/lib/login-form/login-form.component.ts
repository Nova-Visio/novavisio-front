import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Credentials } from '@novavisio/interfaces';

/**
 * Componente para la vista login form.
 */
@Component({
    selector: 'nv-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

    /** True si la vista está cargando datos o ejecutando una operación. False de lo contrario. */
    @Input()
    public loading: boolean = false;

    /** User credentials model. */
    @Input()
    public credentials: Credentials;

    /** Clase de estilos para botón. */
    @Input()
    public btnClass: string;

    /** Color de los controles del formulario. */
    @Input()
    public formFieldColor?: ThemePalette;

    /** Color del botón submit. */
    @Input()
    public submitColor?: string;

    /** Cambia la selección de la base */
    @Output()
    public submitLogin: EventEmitter<Credentials> = new EventEmitter<Credentials>();

    /** Referencia del formulario. */
    public formLogin: UntypedFormGroup;

    /** True si la contraseña se visibiliza. False de lo contrario. */
    public revealedPass = false;

    /**
     * Creates an instance of login form component.
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
     * Despacha acción de autenticación.
     */
    public login(): void {

        const { username, password } = this.formLogin.value;
        this.submitLogin.emit({ username, password });

        this.loading = false;
    }

    /**
     * Oculta o releva el contenido de la contraseña.
     * @param $event Evento de click.
     */
    public toogleRevealedPass($event: MouseEvent): void {
        $event.preventDefault();
        this.revealedPass = !this.revealedPass;
    }

    /**
     * Configura los campos del formulario reactivo.
     */
    private buildForm(): void {
        this.formLogin = this.formBuilder.group({
            username: [this.credentials?.username, Validators.required],
            password: [this.credentials?.password, [Validators.required, Validators.minLength(1), Validators.pattern(/\S/)]]
        });
    }

}
