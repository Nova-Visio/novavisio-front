/**
 * Punto geográfico.
 */
export interface LatLng {

    /** Latitud del punto geográfico (distancia angular que hay desde un punto de la superficie de la Tierra hasta
     *  el paralelo del ecuador). 
     */
    /** En formato WGS-84 (e.g. 25.796549. "-90' a '90'). */
    lat: number;

    /** 
     * Longitud del punto geográfico (distancia angular que hay desde un punto de la superficie de la Tierra
     * hasta el meridiano de  Greenwich). En formato WGS-84 (e.g. -80.275613. "-180", "180").
     */
    lng: number;
}
