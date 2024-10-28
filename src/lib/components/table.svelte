<script>
    export let foundUsers;
    export let winningUser;
    export let lsSaga;
    export let winIndexSaga;
</script>

<div class="contenitoreTabella">
    <div class="box-table">
        <table>
            <thead>
                <tr>
                    <th>Character</th>
                    <th>Gender</th>
                    <th>Race</th>
                    <th>Affiliation</th>
                    <th>Height</th>
                    <th>Home planet</th>
                    <th>Series</th>
                    <th>First Saga</th>
                </tr>
            </thead>
            <tbody>
                {#each foundUsers as user (user.id)}
                    <tr>
                        <td style="--delay: 0s"><div class="img-box"><img src="{user.immagine}" alt=""></div></td>
                        <td style="--delay: 0.5s; background-color: {user.sesso === winningUser.sesso ? 'green' : 'red'};"><p>{user.sesso}</p></td>
                        <td style="--delay: 1s; background-color: {user.razza === winningUser.razza ? 'green' : 'red'};"><p>{user.razza}</p></td>
                        <td style="--delay: 1.5s; background-color: {user.affiliazione === winningUser.affiliazione ? 'green' : 'red'};"><p>{user.affiliazione}</p></td>
                        {#if user.altezza === winningUser.altezza}
                            <td style="--delay: 2s; background-color: green;">
                                <p>{user.altezza}</p>
                            </td>
                        {:else if (user.altezza === "Unknown" || winningUser.altezza === "Unknown")}
                            <td style="--delay: 2s; background-color: red;">
                                <p>{user.altezza}</p>
                            </td>
                        {:else}
                            <td style="--delay: 2s;" class="{user.altezza > winningUser.altezza ? 'frecciaGiu' : 'frecciaSu'}">
                                <p>{user.altezza}</p>
                            </td>
                        {/if}
                        <td style="--delay: 2.5s; background-color: {user.origine === winningUser.origine ? 'green' : 'red'};"><p>{user.origine}</p></td>
                        <td style="--delay: 3s; background-color: {user.serie === winningUser.serie ? 'green' : 'red'};"><p>{user.serie}</p></td>
                        {#if winIndexSaga !== -1}
                            {#if lsSaga.indexOf(user.arco) === -1}
                                <td style="--delay: 3.5s; background-color: red;">
                                    <p>{user.arco}</p>
                                </td>
                            {:else}
                                {#if (lsSaga.indexOf(user.arco) === winIndexSaga)}
                                    <td style="--delay: 3.5s; background-color: green;">
                                        <p>{user.arco}</p>
                                    </td>
                                {:else}
                                    <td style="--delay: 3.5s;" class="{lsSaga.indexOf(user.arco) > winIndexSaga ? 'frecciaGiu' : 'frecciaSu'}">
                                        <p>{user.arco}</p>
                                    </td>
                                {/if}
                            {/if}
                        {:else}
                            {#if user.arco === winningUser.arco}
                                <td style="--delay: 3.5s; background-color: green;">
                                    <p>{user.arco}</p>
                                </td>
                            {:else}
                                <td style="--delay: 3.5s; background-color: red;">
                                    <p>{user.arco}</p>
                                </td>
                            {/if}
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>