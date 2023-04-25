import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Messenger } from './entities/messenger';
import { MessengerType } from './entities/messenger-type';

/**
 * Componente para la vista messenger.
 */
@Component({
    selector: 'at-message-modal',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.scss'],
})
export class MessengerComponent {
    /**
     * Creates an instance of AtMessageModalComponent.
     * @param dialogRef Servicio de dialog (angular material).
     * @param messengerData Metadata del mensaje.
     * @memberof AtMessageModalComponent
     */
    constructor(
        public dialogRef: MatDialogRef<MessengerComponent>,
        @Inject(MAT_DIALOG_DATA) public messengerData: Messenger
    ) { }

    /**
     * Cierra el modal del filtro.
     */
    public closeModal(): void {
        this.dialogRef.close();
    }

    /**
     * Devuelve true si el modal es de tipo error.
     * @returns True si el modal es de tipo error.
     */
    public isError(): boolean {
        return this.messengerData.type === MessengerType.Error;
    }

    /**
     * Devuelve true si el modal es de tipo success.
     * @returns True si el modal es de tipo success.
     */
    public isSuccess(): boolean {
        return this.messengerData.type === MessengerType.Success;
    }

    /**
     * Devuelve true si el modal es de tipo info.
     * @returns True si el modal es de tipo info.
     */
    public isInfo(): boolean {
        return this.messengerData.type === MessengerType.Info;
    }

    /**
     * Devuelve true si el modal es de tipo warning.
     * @returns True si el modal es de tipo warning.
     */
    public isWarning(): boolean {
        return this.messengerData.type === MessengerType.Warning;
    }
}
