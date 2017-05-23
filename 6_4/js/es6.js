/* 5. Preloader obrazów z użyciem Promise
W lekcjach czwartego tygodnia, w sekcji Ajax w Praktyce oraz model Pub/Sub znajduje się
lekcja pt. Praktyczny przykład: Preloader obrazów. Utwórz podobne rozwiązanie, ale nie
korzystając z jQuery, a z natywnych metod DOM API. Zamiast obiektu Deferred z jQuery,
wykorzystaj Promise dostępną w ES6. Załadowane w tle obrazy zamień następnie na
elementy <img> i wstaw na stronę. Przykładowe użycie tego kodu powinno wyglądać
następująco: https://pastebin.com/jM7N6NTn
*/



(function(){

    const urls = [
        "http://code.eduweb.pl/kurs-jquery/images/photo-1.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-2.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-3.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-4.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-1.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-2.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-3.jpg",
        "http://code.eduweb.pl/kurs-jquery/images/photo-4.jpg",
        "ttp://code.eduweb.pl/kurs-jquery/images/photo-1.jpg"
    ];    

    function preloadImages(urls) {

        let length = urls.length,
            counter = 0,
            good_urls = [];

        let promise = new Promise(function(resolve, reject) {

            urls.forEach(function(url, i) {

                let img = document.createElement("img");

                img.addEventListener("load", function() {

                    counter++;
                    good_urls.push(url);

                    if(counter === length) {
                        resolve(good_urls);
                    }

                }, false);

                img.addEventListener("error", function() {

                    length--;

                    if(counter === length) {
                        if(good_urls.length !== 0){
                            resolve(good_urls);
                        } else {
                            reject(new Error("Brak obrazów do wyświetlenia."));
                        }
                    }

                }, false);

                img.setAttribute("src", url);

            });

        });

        return promise;

    }


    // utworzenie pojedynczego elementu img na podstawie url
    function createImage(url) {

        let img = document.createElement("img");
        img.setAttribute("src", url);
        img.classList.add("img");            
        
        img.onclick = function(){
            window.open(url);
        }
        
        return img;

    }

    // funkcja zwracająca documentFragment z wszystkimi pobranymi obrazkami
    function createImages(urls){

        let docFragm = document.createDocumentFragment();

        urls.forEach(function(url, i){
            docFragm.appendChild(createImage(url));
        });

        return docFragm;   

    }


    function appendImages(docFragm){

        document.querySelector(".images").appendChild(docFragm)

    }


    async function getImages(urls) {

        try{ 

            let good_urls = await preloadImages(urls);

            console.log("Obrazy wczytane.");

            let docFragm = await createImages(good_urls);

            appendImages(docFragm);

        } catch(err) {

            console.log(err.message);
            
        }

    }


    getImages(urls);


})();