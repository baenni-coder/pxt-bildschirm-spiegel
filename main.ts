/**
 * Bildschirm-Spiegel
 *
 * Sendet den Zustand der 5x5-LED-Matrix laufend per USB-Serial an eine
 * Bildschirm-Grossanzeige. Protokoll: eine Zeile "M:" + 25 Ziffern
 * (0 = LED aus, 9 = LED an), zeilenweise von oben links.
 *
 * Der Baustein liest die Matrix mit led.point(x, y) zurueck und spiegelt
 * damit genau das, was leuchtet - egal ob Icon, Text oder einzelne LEDs.
 */
//% color="#2ec4b6" weight=100 icon="" block="Bildschirm-Spiegel"
namespace bildschirmSpiegel {
    let running = false

    /**
     * Startet den Bildschirm-Spiegel. Er laeuft im Hintergrund weiter,
     * dein uebriges Programm bleibt ganz normal bedienbar.
     */
    //% block="Bildschirm-Spiegel starten"
    //% weight=100
    export function starten(): void {
        if (running) return
        running = true
        serial.redirectToUSB()
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
}
