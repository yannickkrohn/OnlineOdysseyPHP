import Radio
    from "./Radio";

class MenuBar {
    constructor() {
        // Binden Sie die Funktion updateTime an das aktuelle Objekt
        this.updateTime = this.updateTime.bind(this);

        var radio = new Radio();
        radio.init();

    }

    updateTime() {
        // Holen Sie sich das aktuelle Datum und die Uhrzeit
        var date = new Date();

        // Definieren Sie Variablen für Wochentag, Tag, Monat und Stunde:Minute
        var weekday = date.getDay();
        var day = date.getDate();
        var month = date.getMonth();
        var hour = date.getHours();
        var minute = date.getMinutes();

        // Konvertieren Sie den Wochentag und den Monat in die entsprechenden Namen
        var weekdayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
        var monthNames = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
        var weekdayName = weekdayNames[weekday];
        var monthName = monthNames[month];

        // Fügen Sie nullen vor einstelligen Tagen und Stunden hinzu
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }

        // Erstellen Sie die aktuelle Uhrzeit als String im gewünschten Format
        var currentTime = weekdayName + ". " + day + ". " + monthName + ". " + hour + ":" + minute;

        // Aktualisieren Sie das HTML-Element mit der ID "time" mit der aktuellen Uhrzeit
        document.getElementById("time").innerHTML = currentTime;
    }

    start() {
        // Rufen Sie die Funktion updateTime alle 1000 Millisekunden (1 Sekunde) auf
        setInterval(this.updateTime, 1000);
    }
}

export default MenuBar;

