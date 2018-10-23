$(() => {
    /*  const ARTIKAL_NA_STANJU = true;

     let poruciKnjigu = new Promise((resolve, reject) => {
         if (ARTIKAL_NA_STANJU) {
             let knjiga = {
                 naziv: 'JaffaScript',
                 autor: 'Petar',
                 poslato: true
             };
             resolve(knjiga);
         } else {
             let razlogOdbijanja = new Error('Nema na stanju!');
             reject(razlogOdbijanja);
         }
     });

     let stigloNaAdresu = knjiga => {
         return new Promise((resolve, reject) => {
             let stiglaKnjigaPoruka = `Stigla mi je knjiga ${knjiga['naziv']} autora ${knjiga['autor']}`,
                 nijeStiglaPoruka = 'Nije stigla knjiga!';
             if (knjiga.poslato) resolve(stiglaKnjigaPoruka);
             else console.log(nijeStiglaPoruka);
         });
     };

     let kupiKnjiguOnline = () => {
         console.info('Pre porucivanja knjige');
         poruciKnjigu
             .then(stigloNaAdresu)
             .then(ispunjenUslov => console.log(ispunjenUslov))
             .catch(nemaNaStanju => console.log(nemaNaStanju.message));
         console.info('Nakon porucivanja knjige');
     }

     kupiKnjiguOnline(); */

    let userPromise = users => {
        return new Promise(resolve => {
            resolve(users.json());
        });
    };

    /* fetch('https://randomuser.me/api/?results=2')
        .then(userPromise).then(resp => {
            let users = resp.results;
            for (user of users) console.log(user.name.first, user.name.last);
        })
        .catch(error => console.log(error.message)); */

    fetch('https://api.icndb.com/jokes/random')
        .then(userPromise)
        .then(resp => $('body').append(resp.value.joke))
        .catch(err => console.error(err.message));
});