<script>

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    
    let { value = "?" } = $props()

    const action = () => dispatch("key-hit", value)

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="btn" onclick={action} onkeypress={action}>
    {#if value === "back"}
    {@html "&larr;"}
    {:else}
    {value}
    {/if}
</div>

<style>

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--aqu01);
        border-radius: 0.15em;
        border-top: solid 0.05em transparent;
        border-left: solid 0.05em transparent;
        border-right: solid 0.05em var(--lit01);
        border-bottom: solid 0.05em var(--lit01);
        font-size: 2.1em; 
        font-weight: 300;
    }
  
</style>