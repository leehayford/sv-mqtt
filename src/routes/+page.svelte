<script>

    import {getContext} from 'svelte'

    import {ALERT_CODES, alert} from '$lib/utils'
    import {RGBA, BASE} from '$lib/common/colors'

    import AdminPanel from './AdminPanel.svelte'
    import DiagnosticPanel from './DiagnosticPanel.svelte'
    import ConfigPanel from './ConfigPanel.svelte'
    import ProgressPanel from './ProgressPanel.svelte'
    import IOStatePanel from './IOStatePanel.svelte'
    
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_led from '$lib/assets/LED.svg'
    import img_lock from '$lib/assets/Lock.svg'
    import img_reset from '$lib/assets/Reset.svg'
    import img_accept from '$lib/assets/Accept.svg'

    let GZ = $state(getContext('gizmo'))

</script>

<div class="container">

    <div class="row hdr">
        <div class="row hdr-title"> 2Chainz </div>
        <div class="row hdr-content">
            <div class="row hdr-status">{GZ.ops.status}</div>
            {#if !GZ.ops.diagnostic_mode}
            <ButtonIcon func={GZ.mqttCMDEnableDiagMdoe} img={img_led} color={RGBA(BASE.LIGHT, 0.0)} />
            {:else}
            <ButtonIcon func={GZ.mqttCMDDisableDiagMdoe} img={img_lock} color={RGBA(BASE.LIGHT, 0.6)} />
            {/if}
        </div>
         
    </div>

    <br>

    <div class="col controls">
        
        {#if GZ.ops.diagnostic_mode}
        <AdminPanel />
        <DiagnosticPanel />
        {:else if GZ.ops.want_aid}
        <div class="row aid-prompt">
            <h3>OK to continue?</h3>
            <div class="row conf-btns">
                <ButtonIcon func={GZ.mqttCMDReset} img={img_reset} color={RGBA(BASE.ORANGE, 0.8)} />
                <ButtonIcon func={GZ.mqttCMDContinue} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
            </div>
        </div>
        {:else if !GZ.cfg.run}
        <ConfigPanel />
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
        color: var(--pnk07);
        font-size: 1.4em; 
        font-weight: 300;
    }

    .aid-prompt {
        background-color: var(--ong01);
        align-items: center;
        justify-content: space-between;
        border-radius: 2em;
        padding: 0.5em 1em;
    }
    .aid-prompt h3 {
        color: var(--ong06);
    }

    .controls {
        padding-bottom: 1em;
    }


</style>