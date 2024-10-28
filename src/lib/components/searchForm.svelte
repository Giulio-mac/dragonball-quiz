<script>
    export let searchTerm;
    export let suggestions;
    export let numeriSuggerimentiMinimi;
    export let handleSearchUser;
    export let fetchSuggestions;
    export let selectSuggestion;
    export let handleKeyDown;
    export let selectedValue;
    export let foundUsers;
    export let getId;
</script>

<div class="contenitoreInput">
    <form method="POST" action="?/searchUser" on:submit|preventDefault={handleSearchUser}>

        <input type="text" name="nome" autocomplete="off" bind:value={searchTerm} on:input={fetchSuggestions} on:keydown={handleKeyDown} placeholder="CHARACTER NAME" />
        <ul style="overflow-y:{suggestions.length <= numeriSuggerimentiMinimi ? 'hidden' : 'scroll'}; display:{suggestions.length == 0 ? 'none' : 'grid'}">
            {#if suggestions.length > 0}
                {#each suggestions as suggestion}
                    <li>
                        <button type="button" on:click={() => selectSuggestion(suggestion)}>
                            <div class="contenitoreSuggerimento">
                                <div class="box">
                                    <img src="{suggestion.immagine}" alt="">
                                </div>
                                <p>{suggestion.nome}</p>
                            </div>
                        </button>
                    </li>
                {/each}
            {/if}
        </ul>
    </form>

    
    <select bind:value={selectedValue} on:change={getId} class="selettorePersonaggi {foundUsers.length == 0 ? '' : 'no-click '}">
        <option value="tutti">Every Series</option>
        <option value="Dragon Ball">Dragon Ball</option>
        <option value="Dragon Ball Z">Dragon Ball Z</option>
        <option value="Dragon Ball GT">Dragon Ball GT</option>
        <option value="Dragon Ball Super">Dragon Ball Super</option>
    </select>
</div>
