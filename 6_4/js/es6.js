/* 4. Funkcja asynchroniczna dla ładowania obrazów
Przepisz utworzony w poprzednim tygodniu w zadaniu piątym kod tak, aby korzystał z
funkcji asynchronicznej (async await). Oczywiście nadal będzie ona współpracować z
Promise, ale samo jej użycie będzie inne niż w przypadku .then i .catch. Zadbaj równieżo to, aby w ciele funkcji asynchronicznej znalazł się blok try...catch(), który przechwyci
ewentualne błędy, gdy Promise zakończy się w stanie rejected.
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

            let docFragm = createImages(good_urls);

            appendImages(docFragm);

        } catch(err) {

            console.log(err.message);
            
        }

    }


    getImages(urls);


})();
