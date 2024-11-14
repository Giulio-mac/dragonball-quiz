<script>
    export let winningUser;
    export let tentativi;
    let isVisible1 = false;
    let isVisible2 = false;

    function toggleVisibility(isVisible) {
        return !isVisible;
    }
</script>

<div class="contenitoreHint">
    <div class="boxHint">
        <button disabled={tentativi < 6} on:click={() => isVisible1 = toggleVisibility(isVisible1)}>
            {#if (tentativi >= 6)}
                HINT AVAILABLE
            {:else}
                HINT AVAILABLE IN {6 - tentativi} ATTEMPTS
            {/if}
        </button>
    </div>
    
    <div class="boxHint">
        <button disabled={tentativi < 10} on:click={() => isVisible2 = toggleVisibility(isVisible2)}>
            {#if (tentativi >= 10)}
                HINT AVAILABLE
            {:else}
                HINT AVAILABLE IN {10 - tentativi} ATTEMPTS
            {/if}
        </button>
    </div>

    {#if (isVisible1)}
        <div class="boxScritta" style="grid-area: 2 / 1;">
            <p>FIRST SAGA</p>
            <p>{winningUser.arco}</p>
        </div>
    {/if}

    {#if (isVisible2)}
        <div class="boxScritta" style="grid-area: 2 / 2;">
            <p>AFFILIATION</p>
            <p>{winningUser.affiliazione}</p>
        </div>
    {/if}
</div>

<style>
    .contenitoreHint {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
        width: 440px;
        margin: 20px auto 0;
        background-color: orange;
        border: 3px solid black;
        border-radius: 16px;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .boxHint {
        border-radius: 8px;
        border: 3px solid black;
        background-color: white;
        height: 50px;
        width: 200px;
        margin: 0 auto 0;
    }

    button {
        width: 200px;
        height: 50px;
        background-color: white;
        border: none;
        border-radius: 8px;
    }

    .boxScritta {
        justify-self: center; /* Centra orizzontalmente */
        align-self: center;   /* Centra verticalmente */
        background-color: white;
        height: 50px;
        width: 200px;
        text-align: center;
        border: 3px solid black;
        border-radius: 8px;
        margin-top: 5px;
    }
</style>