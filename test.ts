// Testprogramm fuer die Erweiterung.
// Startet den Spiegel und zeigt abwechselnd zwei Herzen.
bildschirmSpiegel.starten()
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    basic.pause(500)
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(500)
})
