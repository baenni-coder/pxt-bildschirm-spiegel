# Bildschirm-Spiegel (micro:bit MakeCode-Erweiterung)

Spiegelt die 5x5-LED-Matrix des micro:bit **live per USB an eine Bildschirm-
Grossanzeige**. Ein Baustein genügt – das Programm sendet dann laufend, was auf
der echten Matrix leuchtet. Gedacht für den Makerspace: Beamer/Monitor zeigt
gross, was der micro:bit anzeigt.

Passt zur Web-Serial-Anzeige `microbit-matrix-display.html`.

## Blöcke

- **Bildschirm-Spiegel starten** – startet die Übertragung (läuft im Hintergrund).
- **Bildschirm-Spiegel stoppen** – beendet die Übertragung.
- **Abstand senden [cm]** – schickt einen Abstandswert an die Anzeige (`D:`).
- **Sensorwerte senden Temperatur [ ] Licht [ ] Ton [ ]** – schickt drei Werte (`S:`).

## Beispiel

```blocks
bildschirmSpiegel.starten()
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
})
```

Das eigene Programm bleibt normal bedienbar – der Spiegel läuft nebenher.

### Mit Grove-Ultraschall (Exponat)

```blocks
bildschirmSpiegel.starten()
basic.forever(function () {
    let d = grove.measureInCentimeters(DigitalPin.P0)
    bildschirmSpiegel.abstandSenden(d)
    bildschirmSpiegel.werteSenden(input.temperature(), 0, input.soundLevel())
    if (d > 0 && d < 15) {
        basic.showIcon(IconNames.Heart)
    } else if (d > 0 && d < 40) {
        basic.showIcon(IconNames.SmallHeart)
    } else {
        basic.clearScreen()
    }
    basic.pause(100)
})
```

> Der eingebaute Lichtsensor nutzt die LED-Matrix und würde den Spiegel stören –
> darum steht der Lichtwert oben auf `0`. Für Helligkeit einen externen
> Grove-Lichtsensor verwenden.

## Verwendung als Erweiterung

In [MakeCode](https://makecode.microbit.org):

1. Projekt öffnen → Zahnrad → **Erweiterungen**.
2. Die GitHub-URL dieses Repos einfügen und suchen.
3. Die Erweiterung **Bildschirm-Spiegel** anklicken – sie erscheint als eigene
   Block-Kategorie.

## So funktioniert es

Der Baustein liest bei jedem Durchlauf alle 25 LEDs mit `led.point(x, y)` aus und
sendet eine Zeile im Format:

```
M:0090009900999909990009000
```

`M:` gefolgt von 25 Ziffern (0 = LED aus, 9 = LED an), zeilenweise von oben links.
Die Übertragung läuft über USB-Serial mit 115200 Baud.

> Hinweis: `led.point` liefert nur an/aus, der Spiegel zeigt also volle Helligkeit.

## Repo als Erweiterung veröffentlichen (einmalig)

Nach dem Push auf GitHub in MakeCode das Projekt öffnen, das dieses Repo nutzt,
und über **GitHub → Push changes** bzw. die Extension-Seite eine erste Version
(Release) erstellen. Ab dann können alle die URL als Erweiterung hinzufügen.

#### Metadaten

* für PXT/microbit
