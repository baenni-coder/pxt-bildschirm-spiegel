/**
 * Bildschirm-Spiegel
 *
 * Sendet den Zustand der 5x5-LED-Matrix laufend per USB-Serial an eine
 * Bildschirm-Grossanzeige. Protokoll: eine Zeile "M:" + 25 Ziffern
 * (0 = LED aus, 9 = LED an), zeilenweise von oben links.
 *
 * Zusaetzlich koennen Sensorwerte an die Anzeige geschickt werden:
 *   D:<cm>              -> Ultraschall-Abstand in cm
 *   S:<temp>,<licht>,<ton>  -> Temperatur, Licht, Ton
 */
//% color="#2ec4b6" weight=100 icon="" block="Bildschirm-Spiegel"
namespace bildschirmSpiegel {
    let running = false
    let usbReady = false

    function ensureUSB(): void {
        if (!usbReady) {
            serial.redirectToUSB()
            usbReady = true
        }
    }

    /**
     * Startet den Bildschirm-Spiegel. Er laeuft im Hintergrund weiter,
     * dein uebriges Programm bleibt ganz normal bedienbar.
     */
    //% block="Bildschirm-Spiegel starten"
    //% weight=100
    export function starten(): void {
        if (running) return
        running = true
        ensureUSB()
        control.inBackground(function () {
            while (running) {
                let s = ""
                for (let y = 0; y <= 4; y++) {
                    for (let x = 0; x <= 4; x++) {
                        s = s + (led.point(x, y) ? "9" : "0")
                    }
                }
                serial.writeLine("M:" + s)
                basic.pause(50)
            }
        })
    }

    /**
     * Stoppt den Bildschirm-Spiegel.
     */
    //% block="Bildschirm-Spiegel stoppen"
    //% weight=90
    export function stoppen(): void {
        running = false
    }

    /**
     * Schickt einen Abstandswert (cm) an die Bildschirm-Anzeige.
     * @param cm der Abstand in Zentimetern, z.B. 37
     */
    //% block="Abstand senden %cm cm"
    //% weight=80
    export function abstandSenden(cm: number): void {
        ensureUSB()
        serial.writeLine("D:" + cm)
    }

    /**
     * Schickt Temperatur, Licht und Ton an die Bildschirm-Anzeige.
     * @param temp Temperatur in Grad Celsius
     * @param licht Lichtwert (0-255), 0 wenn nicht benutzt
     * @param ton Lautstaerke (0-255), 0 wenn nicht benutzt
     */
    //% block="Sensorwerte senden|Temperatur %temp Licht %licht Ton %ton"
    //% weight=70
    export function werteSenden(temp: number, licht: number, ton: number): void {
        ensureUSB()
        serial.writeLine("S:" + temp + "," + licht + "," + ton)
    }
}
