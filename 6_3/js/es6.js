/* 3. Praca z modułami ES6
Utwórz kilka niezależnych modułów i z każdego z nich coś wyeksportuj, w dowolny,
wybrany przez Ciebie sposób. Niech jeden z modułów zawiera jakąś przykładową klasę z
prostymi funkcjonalnościami, drugi inną klasę, która mogłaby dziedziczyć z pierwszej, a
trzeci (główny moduł) powinien z tych eksportowanych funkcjonalności móc skorzystać.
Możesz utworzyć dowolny kod, ale jeśli nie masz pomysłu, to wykorzystaj kod przepisany
na standard ES6 z zadania trzeciego z poprzedniego tygodnia. W jednym module umieść
klasę EventEmitter, a w innym klasę Database. W module głównym utwórz nową
instancję z klasy Database tak, jak to miało miejsce we wspomnianym przykładzie. Aby
moduły działały poprawnie, wykorzystaj element <script type=“module">.
Uwaga: pamiętaj, że konieczne może być ustawienie odpowiedniej flagi, np. w
przeglądarce Chrome po przejściu pod adres chrome://flags włącz Experimental Web
Platform features poprzez kliknięcie Enable.
*/

// import Db from "./Database.js";
// import EvEmitter from "./EventEmitter.js";


import Db, {EventEmitter as EvEmitter} from "./Database.js";
// EventEmitter po to aby w module głównym również można było skorzystać z EventEmittera


// TEST:
import EventEmitter from "./EventEmitter.js";
console.log( "Czy to ten sam obiekt:", Object.is(EventEmitter, EvEmitter) );


// Użycie EventEmittera
let ev = new EvEmitter();

ev.on("hello", (message) => {
    console.log(`Witaj ${message}!`);
});


ev.on("hello", (message) => {
    console.log(`Siema ${message}.`);
});

ev.on("goodbye", (message) => {
    console.log("Do widzenia!");
});

ev.emit("hello", "Marek");
ev.emit("goodbye");
ev.emit("custom"); // nic się nie wydarzy


// Użycie klasy Database
const url = "db://localhost:3000";

let db = new Db(url); // fikcyjny adres

db.on("connect", (url) => {
    console.log(`Połączenie z bazą pod adresem ${url} zostało ustanowione.`);
});

db.on("disconnect", (url) => {
    console.log(`Połączenie z bazą pod adresem ${url} zostało zakończone.`);
});

db.connect();

// po 5 sekundach rozłączamy się
setTimeout(() => {
    db.disconnect();
}, 5000);