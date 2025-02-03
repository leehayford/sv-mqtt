<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'
    import KeyPad from '$lib/common/key_pad/KeyPad.svelte'

    let {
        num = $bindable(0.0),
        isInteger = $bindable(false),
        unit = $bindable("UNIT"),
        title = $bindable("TITLE"),
        note = $bindable(""),

        enabled = $bindable(false)
    } = $props()

    let showKeyPad = $state(false)
    const openKeyPad = () => {if(enabled) showKeyPad = true}

</script>

<KeyPad 
    bind:num 
    bind:isInteger 
    bind:unit 
    bind:title 
    bind:note
    bind:showKeyPad 
    on:validate
/>

<div class="col">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="control" onclick={openKeyPad} onkeydown={openKeyPad} >
        <div class="title">{title}</div>
        <div class="num {(enabled ? 'num-en' : 'num-dis')}">
            {(isInteger ? num.toFixed(0) : num.toFixed(3))}
        </div>
        <div class="unit">{unit}</div>
    </div>
    {#if note !== ""}
    <div class="note">{note}</div>
    {/if}
</div>

<style>

    .control {
        display: grid;
        grid-template-columns: 1fr 1fr 5em;
        align-items: center;
        min-height: 2.5em;
        gap:0.75em;
    }
    .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        color: var(--ylw07);
        font-size: 1.4em; 
        font-weight: 300;
        padding-left: 1em;
    }
    .note {
        color: var(--gry07);
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: -1.0em;
        font-size: 1.1em;
    }
    .num {
        font-size: 1.7em; 
        font-weight: 300;
        border-top: solid 0.05em transparent;
        border-left: solid 0.05em transparent;
        border-right: solid 0.05em var(--lit01);
        border-bottom: solid 0.05em var(--lit01);
        border-radius: 0.15em;
        padding: 0 0.5em;
    }

    .num-en {
        color: var(--ylw07);
        background-color: var(--aqu005);
    }
    .num-dis {
        color: var(--gry06);
        background-color: var(--lit002);
    }
    .unit {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.25em;
        color: var(--ylw06);
        background-color: var(--ylw01);
        border-radius: 0.8em;
        border: solid 0.05em var(--ylw03);
    }

</style>