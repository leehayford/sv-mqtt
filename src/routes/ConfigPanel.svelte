<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import KeyPad from './KeyPad.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_start from '$lib/assets/Start.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let GZ = $state(getContext('gizmo'))
    const openQTYKeyPadModal = () => { dispatch("open_qty_keypad") }
    const openHeightKeyPadModal = () => { dispatch("open_height_keypad") }
    
    let {
        showStartButton = $bindable(false)
    } = $props()
    
</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Configuration:</h3>
        
        <div class="row conf-btns">
            <!-- <ButtonIcon func={GZ.mqttCMDCancel} img={img_reset} color={RGBA(BASE.AQUA, 0.7)} /> -->
            {#if showStartButton}
            <ButtonIcon func={GZ.mqttCMDConfig} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {/if}
        </div>

    </div>
    <PanelControl >
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="control-num" onclick={openQTYKeyPadModal} onkeydown={openQTYKeyPadModal} >
            <div class="control-num-title"># of Drops</div>
            <div class="conf-value">{GZ.cfg.cycles}</div>
            <div>QTY</div>
        </div>
    </PanelControl>
    <PanelControl>
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="control-num" onclick={openHeightKeyPadModal} onkeydown={openHeightKeyPadModal} >
            <div class="control-num-title">Drop Height</div>
            <div class="conf-value">{GZ.cfg.height.toFixed(2)}</div>
            <div>INCH</div>
        </div>
    </PanelControl>

</div>

<style>
        .sec-hdr {
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: solid 0.1em var(--gry02);
        padding-bottom: 0.25em;
    }
    .sec-hdr h3 {
        color: var(--gry06);
    }

    .control-num {
        display: grid;
        grid-template-columns: 1fr 1fr 5em;
        align-items: center;
        min-height: 2.5em;
        gap:0.75em;
    }
    .control-num-title {
        color: var(--aqu07);
        font-size: 1.5em; 
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

    .conf-btns {
        justify-content: flex-end;
        /* padding-right: 1.5em; */
    }
</style>