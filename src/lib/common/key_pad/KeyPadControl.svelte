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

        enabled = $bindable(false),
        
        color = $bindable(BASE.AMBER)
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
    bind:color
    on:validate
/>

<div class="col">
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="control" onclick={openKeyPad} onkeydown={openKeyPad} >

        <div class="title" style="
        color:{RGBA(color, 0.65)};
        ">
            {title}
        </div>
        
        <div class="num" style="
        color:{(!enabled ? RGBA(BASE.GREY, 0.6) : RGBA(color, 0.7))};
        background-color:{(enabled ? RGBA(BASE.AQUA, 0.06) : RGBA(BASE.LIGHT, 0.02))};
        border-right: solid 0.05em {(enabled ? RGBA(BASE.AQUA, 0.1) : RGBA(BASE.LIGHT, 0.1))};
        border-bottom: solid 0.05em {(enabled ? RGBA(BASE.AQUA, 0.1) : RGBA(BASE.LIGHT, 0.1))};
        ">
            {(isInteger ? Number(num).toFixed(0) : Number(num).toFixed(3))}
        </div>

        <div class="unit" style="
        color:{RGBA(color, 0.6)};
        background-color:{RGBA(color, 0.1)};
        border: solid 0.05em {RGBA(color, 0.3)};
        ">
            {unit}
        </div>

    </div>
    <!-- {#if note !== ""}
    <div class="note">{note}</div>
    {/if} -->
</div>

<style>

    .control {
        display: grid;
        grid-template-columns: 1fr 1fr 5em;
        align-items: center;
        min-height: 2.5em;
        gap:0.5em;
    }
    .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        font-size: 1.375em; 
        font-weight: 300;
        padding-left: 1em;
    }

    /* .note {
        color: var(--gry07);
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: -1.0em;
        font-size: 1.1em;
    } */
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

    .unit {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.25em;
        border-radius: 0.8em;
    }

</style>