<script>

    import {getContext} from 'svelte'
    // import {Machine} from '$lib/models/machine.svelte'

    import {ALERT_CODES, alert} from '$lib/utils'
    import {RGBA, BASE} from '$lib/common/colors'

    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import Indicator from '$lib/common/indicator/Indicator.svelte'
    import StateIcon from '$lib/common/state_icon/StateIcon.svelte'
    import ProgressBar from '$lib/common/bar_graph/ProgressBar.svelte'
    import BarGaugeH from '$lib/common/bar_graph/BarGaugeH.svelte'
    import ConfigPanel from './ConfigPanel.svelte'
    import ProgressPanel from './ProgressPanel.svelte'

    import KeyPad from './KeyPad.svelte'
    import IOStatePanel from './IOStatePanel.svelte'
    import OpStatePanel from './OpStatePanel.svelte'
    import DiagnosticPanel from './DiagnosticPanel.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_settings from '$lib/assets/Settings.svg'
    import img_led from '$lib/assets/LED.svg'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_start from '$lib/assets/Start.svg'
    import img_reset from '$lib/assets/Reset.svg'
    import img_question from '$lib/assets/Question.svg'

    let colorOK = RGBA(BASE.SEAFOAM, 0.8)
    let colorWarn = RGBA(BASE.ORANGE, 0.8)
    let colorFault = RGBA(BASE.RED, 0.8)
    let colorNone = RGBA(BASE.LIGHT, 0.03)

    let GZ = $state(getContext('gizmo'))
    let cfgEnabled = $state(!GZ.cfg.run)

    let heightKeyPad

    let showQTYKeyPad = $state(false)
    const openQTYKeyPadModal = () => { showQTYKeyPad = true }

    let showHeightKeyPad = $state(false)
    const openHeightKeyPadModal = () => { showHeightKeyPad = true }

    let cfgValid = $state(false)
    const validateConfig = () => {
        cfgValid = GZ.cfg.validate()
    }

</script>

<div class="container">

    <KeyPad title="Drop Quantity"
    bind:showKeyPad={showQTYKeyPad} 
    bind:num={GZ.cfg.cycles} 
    on:validate={validateConfig}
    isInteger={true} 
    />
    
    <KeyPad title="Drop Height"
    bind:showKeyPad={showHeightKeyPad} 
    bind:num={GZ.cfg.height} 
    on:validate={validateConfig}
    max={48.0}
    />

    <div class="row hdr">
        <div class="row hdr-title"> ~2Chainz </div>
        <div class="row hdr-content">
            <div class="row hdr-status">{GZ.ops.status}</div>
            {#if !GZ.ops.diagnostic_mode}
            <ButtonIcon func={GZ.mqttCMDEnableDiagMdoe} img={img_led} color={RGBA(BASE.LIGHT, 0.0)} />
            {/if}
        </div>
         
    </div>

    <br>

    <div class="col controls">
        
        {#if GZ.ops.diagnostic_mode}
        <DiagnosticPanel />
        {:else if GZ.ops.want_aid}
        <div class="row sec-hdr">
            <h3>OK to continue?</h3>
            <div class="row conf-btns">
                <ButtonIcon func={GZ.mqttCMDReset} img={img_reset} color={RGBA(BASE.ORANGE, 0.8)} />
                <ButtonIcon func={GZ.mqttCMDContinue} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
            </div>
        </div>
        {:else if !GZ.cfg.run}
        <ConfigPanel 
            bind:showStartButton={cfgValid}
            on:open_qty_keypad={openQTYKeyPadModal}
            on:open_height_keypad={openHeightKeyPadModal}
        />
        {:else}
        <ProgressPanel />
        {/if}
        
    </div>

    <br>

    <IOStatePanel />

</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%; 
        height: 100%;
        gap:0;
    }

    .hdr {
        padding-bottom: 0.5em;
        border-bottom: solid 0.1em var(--gry02);
    }
    .hdr-title {
        color: var(--aqu07);
        width: auto;
        font-size: 2.2em; 
        font-weight: 350;
        gap:0;
    }
    .hdr-content {
        align-items: center;
    }
    .hdr-status {
        color: var(--ong07);
        font-size: 1.4em; 
        font-weight: 300;
    }

    .sec-hdr {
        background-color: var(--ong01);
        align-items: center;
        justify-content: space-between;
        /* border-bottom: solid 0.1em var(--gry02); */
        border-radius: 2em;
        padding: 0.5em 1em;
    }
    .sec-hdr h3 {
        color: var(--ong06);
    }

    .conf-btns {
        justify-content: flex-end;
        width: auto;
        /* padding-right: 1.5em; */
    }

    .controls {
        padding-bottom: 1em;
    }


</style>