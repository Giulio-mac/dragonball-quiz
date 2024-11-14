<script>
    export let show = false;

    function close() {
        show = false
    }
</script>

{#if show}
    <div class="overlay">
        <div class="card-popup" style="display: {show};">
            <button class="close-button" on:click={close}>&#10006;</button>
            <div class="box-title">
                <div class="title">
                    <h2>Hai vinto cazzo!</h2>
                </div>
            </div>
            <div>
                <img src="https://media.giphy.com/media/nOBv4FaG7o1Hy/giphy.gif?cid=790b7611e8aa2aa1ay8unqp4kl4sqnlbsvklhxuknxhzpiug&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="">
            </div>
        </div>
    </div>
{/if}

<style>
    .overlay {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-color: rgba(44, 44, 44, 0.664);
        z-index: 2;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .card-popup {
        position: absolute;
        width: 600px;
        height: 500px;
        border-radius: 12px;
        background-color: rgb(255, 255, 255);
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: grid;
        grid-template-rows: 20% 80%;
        overflow: hidden;
        border:3px solid black;
    }

    .card-popup img {
        height: 75%;
        margin: 0px auto 0;
        border-radius: 16px;
        border:3px solid black;
        margin-top: 60px;
    }

    .card-popup .box-title .title {
        margin: 0 auto 0;
        width: 249px;
        height: 40px;
        height: fit-content;
        border-radius: 8px;
        border: 3px solid black;
        padding: 10px;
        text-align: center;
        background-color: white;
    }

    .box-title {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        background-color: orange;
        border: 3px solid black;
        height: 82px;
        width: 299px;
        margin: 20px auto 0;
        border-radius: 16px;
    }

    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        transition: .5s;
    }

    .close-button:hover {
        color: red;
    }
</style>