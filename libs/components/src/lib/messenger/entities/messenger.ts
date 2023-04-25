import { Message } from './message';
import { MessengerAction } from './messenger-action';
import { MessengerType } from './messenger-type';

/**
 * Mensaje para mostrar en un modal.
 */
export interface Messenger {

  /** Tipo de mensaje */
    type?: MessengerType;

    /** Mensaje a mostrar. */
    message?: Message

    /** Acciones del mensaje. */
    actions?: MessengerAction[];

    /** Clases de estilos para el modal. */
    messengerClass?: string;

    /** True si muestra una barra de progreso. False de lo contrario. */
    showLinnearProgress?: boolean;
}
