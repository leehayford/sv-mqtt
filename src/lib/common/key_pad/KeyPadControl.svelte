<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'

    let {
        title = "TITLE",
        unit = "UNIT",
        num = $bindable(0.0),
        isInteger = false
    } = $props()

    const openKeyPad = () => {dispatch("open-keypad")}

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="control-num" onclick={openKeyPad} onkeydown={openKeyPad} >
    <div class="control-num-title">{title}</div>
    <div class="conf-value">{(isInteger ? num.toFixed(0) : num.toFixed(2))}</div>
    <div class="unit">{unit}</div>
</div>

<style>

.control-num {
        display: grid;
        grid-template-columns: 1fr 1fr 5em;
        align-items: center;
        min-height: 2.5em;
        gap:0.75em;
    }
    .control-num-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        color: var(--aqu07);
        font-size: 1.4em; 
        font-weight: 300;
        padding-left: 1em;
    } 

    .conf-value {
        font-size: 1.7em; 
        font-weight: 300;
        color: var(--aqu07);
        background-color: var(--aqu01);
        border-top: solid 0.05em transparent;
        border-left: solid 0.05em transparent;
        border-right: solid 0.05em var(--lit01);
        border-bottom: solid 0.05em var(--lit01);
        border-radius: 0.15em;
        padding: 0 0.5em;
    }
    .unit {
        color: var(--ylw07);
        font-size: 1.2em;
    }

</style>