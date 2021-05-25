<script>
  import { client } from '$lib/ApolloClient.js';
  import {gql} from '@apollo/client/core';
  import {onMount} from "svelte";

  const GET_USERS = gql`
    query {
      users {
        id
        name
        username
        email
        posts {
            title
        }
      }
    }
  `;

  async function loadUsers() {
    return await client.query({query: GET_USERS});
  }
  // let users;
  onMount(async () => {
    // users = await loadUsers();
    // console.log(users);
  });

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div>
  {#await loadUsers()}
    Loading...
  {:then res}
    {#if res.loading}
      Loading...
    {:else if res.error}
      Error: {res.error.message}
    {:else}
      <ul>
        {#each res.data.users as user}
          <li>{user.id} / {user.name} / {user.username} / {user.email}
            <ul>
              {#each user.posts as post}
                <li>{post.title}</li>
              {/each}
            </ul>
          </li>
        {/each}
      </ul>
    {/if}
  {/await}
</div>
