/* 1. Dekompozycja obiektu z danych JSON
Pamiętasz funkcję getJSON, którą stworzyłeś w tygodniu trzecim? Za jej pomocą pobierz
dane JSON z tego adresu: http://code.eduweb.pl/bootcamp/json/. Następnie w funkcji
callback, gdzie te dane będą już zamienione na obiekt JavaScript, wykorzystaj
dekompozycję (destructuring), aby utworzyć za pomocą zapisu ES6 nowe zmienne, które
przechowywać będą dane spod kluczy: name, username, email, address.geo[0],
address.geo[1], website i company.name. Powyższe dane wstaw do template stringu,
dodając odpowiednie etykiety jak np. Imię, Firma czy Adres e-mail wraz z niezbędnym
kodem HTML, np. w formie linku dla website. W przypadku współrzędnych
geograficznych, wstaw je do takiego linku: <a href=“http://bing.com/maps/
default.aspx?cp=LAT~LON”>Pokaż na mapie</a>, gdzie LAT i LON zastąpisz kolejno
przez address.geo[0] i address.geo[1], które na tym etapie powinny być już w
zmiennych. Powyższą operację wykonaj oczywiście dla wszystkich obiektów z tablicy.
Cały sformatowany ciąg wraz ze wstawkami HTML wstaw na stronę. Sam proces
pobierania danych Ajaxem i dalszego ich formatowania, możesz wywołać za pomocą
kliknięcia jakiegoś przycisku.
*/


(function() {
	
    
function getJSON(url, success, fail) { 
        
    if(arguments.length !== 3 
        || typeof url !== "string"  || url instanceof String
        || typeof success !== "function"
        || typeof fail !== "function" ){

        throw new Error("Podaj prawidłowe parametry");
    } 
    

    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.setRequestHeader('Accept', 'application/json')

    xhr.onload = function(e) {

        var res = JSON.parse(xhr.responseText);

        if (this.status === 200) {
            success(res);
        } else {
            fail( new Error("Błąd - status HTTP: " + xhr.status) );
        }
    };        

    xhr.onerror = function(e) {
        fail( new Error("Błąd: " + e.type) );
    }

    xhr.send();


}


const API_URL = "http://code.eduweb.pl/bootcamp/json/";

document.querySelector("#btn").addEventListener("click", function(e) {

    getJSON(API_URL, function(data) {
        console.log("Sukces");
	    
        var result = document.querySelector("#response"),
            ul = document.createElement("ul");
            
        result.innerHTML = "";
        result.appendChild(ul);        

	    
        const personMap = new WeakMap();
        window.personMap = personMap;     // AD. PRÓBA

        data.forEach(function(person) {
            
            var li = document.createElement("li");

            li.textContent = person.name;

            li.classList = "personInfo";

            personMap.set(li, person);

            (function(){

                let oddClick = false;

                li.onclick = function(event){
                                        
                    // PYTANIE 1: Czy w tym przykładzie WERSJA 1 (bez WeakMap gdzie od razu korzystam z Person) byłaby gorsza od WERSJI 2 (z WeakMap) - jeśli tak, to pod jakim względem?
                    
                    //// WERSJA 1 (zwykła bez WeakMap)
                    // let {name, email} = person;
                    
                    //// WERSJA 2 (z WeakMap) - personMap.get(this) zamiast samego person
                    let {name, email} = personMap.get(this);
                    


                    //aby email znikał gdy kliknę jeszcze raz w li (ale nie w sam email)
                    if(event.target.nodeName !== "A"){

                        oddClick = !oddClick;

                        if(oddClick === true){
                            this.innerHTML = `${name} <a href="mailto:${email}">${email}</a>`; 
                        } else {
                            this.innerHTML = `${name}`;
                        }
                    }



                    // PRÓBA (tutaj w obsłudze klkniecia dopisalam testowo usuwanie po 1 sekundzie pierwszego elementu listy za pomocą removeChild i po tej 1sek jak wpiszę w konsoli "personMap", to widać, że ten element zniknął z WeakMap, bo jest 9 a nie 10 elementów)
                    // PYTANIE 2 (dotyczy powyższej PRÓBY): Czy na przykładzie tego kodu widać w którym momencie po tym jak skorzystamy z personMap.get() tracimy ostatnie referencje do tych elementów li skoro w mojej PRÓBIE element został usunięty z WeakMap? Czy to removeChild() wpływa jakoś, źe ostatnia referencja znika?
                    setTimeout(function(){
                        var myli = document.querySelector("li:first-child");
                        myli.parentNode.removeChild(myli);
                        myli = null;
                    }, 1000)

                }
            })();

            ul.appendChild(li);

        });


    }, function(err) {
        console.log("Wystąpił błąd!");
        console.log(err.message);
    });

}, false);


})();
