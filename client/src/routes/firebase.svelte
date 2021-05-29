<script lang="ts">
  import {onMount} from 'svelte';

  let response: string;
  let loadingMessages = false;

  async function getData(): Promise<string> {
    const res = await fetch('http://localhost:4009')
    const text = await res.text();

    return text;
  }

  async function getMessages(): Promise<Array<any>> {
    const res = await fetch('http://localhost:4009/messages');
    return await res.json();
  }

  onMount(async () => {
    response = await getData();
  });
</script>

<h1>Firebase Example</h1>

<p>{response}</p>

<hr>
<button on:click={() => loadingMessages = true}>get messages</button>

{#if loadingMessages}
  {#await getMessages()}
    <div>Loading...</div>
  {:then res}
    <ul>
      {#each res.messages as item}
        <li>{item.id} / {item.name}</li>
      {:else}
        <li>NO_MESSAGES</li>
      {/each}
    </ul>
  {/await}
{/if}
