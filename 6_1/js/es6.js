/* 1. Wiązanie elementów DOM z danymi z użyciem WeakMap
Pamiętasz funkcję getJSON, którą stworzyłeś w tygodniu trzecim? Za jej pomocą pobierz
dane JSON z tego adresu: http://code.eduweb.pl/bootcamp/json/. Następnie w funkcji
callback, gdzie te dane będą już zamienione na tablicę JavaScript, dla każdego elementu
tej tablicy (będzie to obiekt) utwórz dynamicznie element <li> i wstaw go na stronę, do
wcześniej utworzonego elementu <ul>. W elemencie <li> wstaw na początku wyłącznie
wartość name z obiektu, ale przypisz też do tego elementu obsługę zdarzenia click. Kiedy
element zostanie kliknięty, zamień jego wewnętrzny tekst na name oraz email, np. w ten
sposób:
<li>Leanne Graham <a href=“mailto:Sincere@april.biz">Sincere@april.biz</a></li>.
Być może zastanawiasz się, jak powiązać element <li> z obiektem, który przechowuje
potrzebne dla niego dane. W tym celu wykorzystaj WeakMap, gdzie jako klucz podasz
element z drzewa DOM, czyli <li>, a jako wartość obiekt z danymi. Dzięki temu po
kliknięciu na element <li>, w funkcji obsługi tego zdarzenia pod this znajdzie się
odwołanie do tego elementu DOM. Kiedy przekażesz this do WeakMapy, otrzymasz w
zamian obiekt z pozostałymi danymi. To z nich wyciągniesz name i email, aby
zaktualizować tekst elementu <li>. Plusem tego rozwiązania jest fakt, że jeśli element
<li> zostanie usunięty, to również obiekt z danymi zostanie usunięty z pamięci, bo takie
zadanie realizuje właśnie WeakMap.
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

        data.forEach(function(person) {
            
            var li = document.createElement("li");

            li.textContent = person.name;

            li.classList = "personInfo";

            personMap.set(li, person);

            (function(){

                let oddClick = false;

                li.onclick = function(event){
                                        
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
