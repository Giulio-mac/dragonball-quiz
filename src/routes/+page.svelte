<script>
    import { onMount } from 'svelte';
    import CardPopUp from '../lib/components/cardPopUp.svelte';
    import SearchForm from '../lib/components/searchForm.svelte';
    import Table from '../lib/components/table.svelte';
    import Hint from '../lib/components/hint.svelte';

    let searchTerm = '';
    let user = null;
    let winningUser = null;
    let message = '';
    let suggestions = [];
    let userSuggestion = null;
    let foundUsers = [];
    let selectedUsers = [];
    let gameStarted = true;
    let numeriSuggerimentiMinimi = 3;
    let lsSaga = ["Emperor Pilaf", "Tournament", "Red Ribbon Army", "Fortuneteller Baba", "Tien Shinhan", "King Piccolo", "Piccolo Jr.", "Saiyan", "Namek", "Androids", "Cell", "Majin Buu", "Baby", "Super 17", "Shadow Dragons", "God of Destruction Beerus", "Golden Frieza", "Universe 6", "Future Trunks", "Universe Survival"];
    let winIndexSaga;
    let tentativi = 0;
    let showPopup = false;
    let selectedValue = "tutti";

    onMount(() => {
        UserById(generateRandomNumber());
    });

    function generateRandomNumber() {
        return Math.floor(Math.random() * 145) + 1;
    }

    function checkUserIdAgainstRandom(user) {
        if (user.id === winningUser.id) {
            setTimeout(() => {
                open();
            }, 4000);
            gameStarted = false;
        }
    }

    async function UserById(id) {
        try {
            const response = await fetch('/?/searchUserById', {
                method: 'POST',
                body: new URLSearchParams({ id: id })
            });
            const result = await response.json();
            const parsedData = JSON.parse(result.data);
        
            winningUser = {
                id: parsedData[parsedData[2].id],
                nome: parsedData[parsedData[2].nome],
                sesso: handleSex(parsedData[parsedData[2].sesso]),
                razza: parsedData[parsedData[2].nome_razza],
                affiliazione: parsedData[parsedData[2].nome_affiliazione],
                altezza: parsedData[parsedData[2].altezza],
                origine: parsedData[parsedData[2].nome_origine],
                serie: parsedData[parsedData[2].nome_serie],
                arco: parsedData[parsedData[2].nome_arco],
                immagine: parsedData[parsedData[2].immagine]
            };

            if (selectedValue != "tutti") {
                winningUser.serie = selectedValue;
            }

            winIndexSaga = lsSaga.indexOf(winningUser.arco);

            console.log("winningUser in funzione: ", winningUser);
            
        } catch (error) {
            console.error('Errore durante la ricerca dell\'utente:', error);
            message = 'Errore nella richiesta o risposta non valida.';
        }
    }

    function handleSex(sex) {
        return sex === 'm' ? 'Male' : 'Female';
    }

    async function getId() {
        let lista = [];

        try {
            const response = await fetch('/?/getId', {
                method: 'POST',
                body: new URLSearchParams({ selectedValue: selectedValue })
            });
            const result = await response.json();
            const parsedData = JSON.parse(result.data);

            if (parsedData[2] != 0) {
                for (let i = 4; i < parsedData.length; i+=2) {
                    lista.push(parsedData[i]);
                }
                const randomElement = lista[Math.floor(Math.random() * lista.length)];

                UserById(randomElement);
            } else {
                UserById(generateRandomNumber());
            }
        } catch (error) {
            console.error('Errore durante la ricerca dell\'utente:', error);
            message = 'Errore nella richiesta o risposta non valida.';
        }
    }

    async function handleSearchUser(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            const parsedData = JSON.parse(result.data);

            user = {
                id: parsedData[parsedData[2].id],
                nome: parsedData[parsedData[2].nome],
                sesso: handleSex(parsedData[parsedData[2].sesso]),
                razza: parsedData[parsedData[2].nome_razza],
                affiliazione: parsedData[parsedData[2].nome_affiliazione],
                altezza: parsedData[parsedData[2].altezza],
                origine: parsedData[parsedData[2].nome_origine],
                serie: parsedData[parsedData[2].nome_serie],
                arco: parsedData[parsedData[2].nome_arco],
                immagine: parsedData[parsedData[2].immagine]
            };    

            if (selectedValue != "tutti") {
                user.serie = selectedValue;
            }

            foundUsers.unshift(user);
            foundUsers = [...foundUsers];
            message = '';
            searchTerm = '';
            tentativi = tentativi + 1;

            checkUserIdAgainstRandom(user);
        } catch (error) {
            console.error('Errore durante la ricerca dell\'utente:', error);
            message = 'Errore nella richiesta o risposta non valida.';
        }
    }

    async function fetchSuggestions(event) {
        searchTerm = event.target.value;

        if (searchTerm.length > 0) {
            try {
                const response = await fetch('/?/getSuggestions', {
                    method: 'POST',
                    body: new URLSearchParams({ term: searchTerm, selectedValue: selectedValue })
                });

                const result = await response.json();
                const parsedData = JSON.parse(result.data);

                if (parsedData[0].success) {
                    suggestions = [];
                    for (let i = 3; i < parsedData.length; i += 3) {
                        userSuggestion = {
                            nome: parsedData[parsedData[i].nome],
                            immagine: parsedData[parsedData[i].immagine],
                        }
                        if (!selectedUsers.includes(userSuggestion.nome)) {
                            suggestions.push(userSuggestion);
                        }
                    }
                } else {
                    suggestions = [];
                }
            } catch (error) {
                console.error('Errore durante il recupero dei suggerimenti:', error);
                suggestions = [];
            }
        } else {
            suggestions = [];
        }
    }

    function selectSuggestion(suggestion) {
        searchTerm = '';
        suggestions = [];

        selectedUsers.push(suggestion.nome);

        const input = document.querySelector('input[name="nome"]');
        input.value = suggestion.nome;
        const form = document.querySelector('form');
        
        const event = new Event('submit', { cancelable: true });
        
        form.dispatchEvent(event);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (suggestions.length > 0) {
                selectSuggestion(suggestions[0]);
            }
        }
    }

    function open() {
        showPopup = false
        console.log("show status: " + showPopup)
        showPopup = true
    }
</script>

<div class="sfondo">
    <CardPopUp show={showPopup}/>
    <div class="centro">
        <img class="logo" src="images/logo.png" alt="">
    </div>

    <div class="contenitoreTitolo">
        <p class="titolo">GUESS THE DRAGON BALL CHARACTER!</p>
    </div>

    {#if foundUsers.length > 0}
        <Hint 
            winningUser={winningUser}
            tentativi={tentativi} />
    {/if}

    {#if gameStarted}
        <SearchForm 
            searchTerm={searchTerm}
            suggestions={suggestions}
            numeriSuggerimentiMinimi={numeriSuggerimentiMinimi}
            handleSearchUser={handleSearchUser}
            fetchSuggestions={fetchSuggestions}
            selectSuggestion={selectSuggestion}
            handleKeyDown={handleKeyDown}
            bind:selectedValue={selectedValue}
            bind:foundUsers={foundUsers}
            getId={getId}/>
    {/if}
    
    {#if foundUsers.length > 0}
        <Table 
            foundUsers={foundUsers}
            winningUser={winningUser}
            lsSaga={lsSaga}
            winIndexSaga={winIndexSaga} />
    {/if}

    <br><br><br><br><br>
</div>