export interface InventoryStatistic {
    region: string;
    /*
     * N95 Respirator
     */
    n95: number;
    /*
     * Surgical Mask
     */
    surgmask: number;
    /*
     * Antiviral medication 
     */
    osetamivir: number;
    /*
     * Personal protective equipment 
     */
    ppe: number;
    /*
     * Sanitizer
     */
    sanitizer: number;
    /*
     * Gloves
     */
    gloves: number;
}