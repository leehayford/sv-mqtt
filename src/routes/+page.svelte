<script>

    import {getContext} from 'svelte'

    import {ALERT_CODES, showAlert} from '$lib/utils'
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

    let prodBtnText = RGBA(BASE.AMBER, 0.7)
    let prodBtnBG = RGBA(BASE.AMBER, 0.1)
    let prodBtnBorder = RGBA(BASE.AMBER, 0.3)

    let awesColor = BASE.AQUA
    let awesBtnText = RGBA(awesColor, 0.7)
    let awesBtnBG = RGBA(awesColor, 0.1)
    let awesBtnBorder = RGBA(awesColor, 0.3)
    
    let inactiveBtnText = RGBA(BASE.LIGHT, 0.3)
    let inactiveBtnBG = RGBA(BASE.LIGHT, 0.05)
    let inactiveBtnBorder = RGBA(BASE.LIGHT, 0.1)

    // const alertTestError = () => {
    //     showAlert("Error Headline Text", "error message text, which is usually longer", ALERT_CODES.ERROR)
    // }
    // const alertTestWarn = () => {
    //     showAlert("Warning Headline Text", "warning message text, which is usually longer", ALERT_CODES.WARNING)
    // }
    // const alertTestSuccess = () => {
    //     showAlert("Success Headline Text", "success message text, which is usually longer", ALERT_CODES.SUCCESS)
    // }

</script>

<div class="container">

    <div class="row hdr">

        <div class="row hdr-title">{(GZ.ops.awes_mode ? "G Unit" : "2Chainz")}</div>
        
        <div class="row hdr-status">{GZ.ops.status}</div>
        
        <!-- <ButtonIcon color={RGBA(BASE.RED, 0.6)} func={alertTestError} />
        <ButtonIcon color={RGBA(BASE.AMBER, 0.6)} func={alertTestWarn} />
        <ButtonIcon color={RGBA(BASE.SEAFOAM, 0.6)} func={alertTestSuccess} /> -->
        
        {#if GZ.ops.diagnostic_mode}
        <ButtonIcon img={img_lock} color={RGBA(BASE.AQUA, 0.7)} func={GZ.mqttCMDDisableDiagMdoe} />
        {:else}
        <ButtonIcon img={img_lock} color={RGBA(BASE.AQUA, 0.0)} func={GZ.mqttCMDEnableDiagMdoe} />
        {/if}

 
    </div>

    <br>

    <div class="col controls">
        
        {#if GZ.ops.diagnostic_mode}

            <AdminPanel />

        {:else }

            {#if GZ.ops.want_aid}
            <div class="row aid-prompt">
                <h3>OK to continue?</h3>
                <div class="row conf-btns">
                    <ButtonIcon func={GZ.mqttCMDReset} img={img_reset} color={RGBA(BASE.ORANGE, 0.8)} />
                    <ButtonIcon func={GZ.mqttCMDContinue} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
                </div>
            </div>
            {:else}
            <div class="mode">
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="mode-btn" style="
                    color:{(!GZ.ops.awes_mode ? prodBtnText : inactiveBtnText)};
                    background-color:{(!GZ.ops.awes_mode ? prodBtnBG : inactiveBtnBG)};
                    border: solid 0.05em {(!GZ.ops.awes_mode ? prodBtnBorder : inactiveBtnBorder)};"
                    onclick={GZ.mqttCMDDisableAWESMode} onkeypress={GZ.mqttCMDDisableAWESMode}>
                    Production Mode
                </div>
  
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div class="mode-btn" style="
                    color:{(GZ.ops.awes_mode ? awesBtnText : inactiveBtnText)};
                    background-color:{(GZ.ops.awes_mode ? awesBtnBG : inactiveBtnBG)};
                    border: solid 0.05em {(GZ.ops.awes_mode ? awesBtnBorder : inactiveBtnBorder)};"
                    onclick={GZ.mqttCMDEnableAWESMode} onkeypress={GZ.mqttCMDEnableAWESMode}>
                    AWES Mode
                </div>

            </div>
            {/if}

            {#if !GZ.ops.run} <ConfigPanel awesColor={awesColor} />

            {:else} <ProgressPanel />

            {/if}

            <IOStatePanel />

        {/if}
        
    </div>


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
        border-bottom: solid 0.1em var(--aqu03);
        min-height: 3.9em;
    }
    .hdr-title {
        color: var(--aqu07);
        width: 4.5em;
        font-size: 2.2em; 
        font-weight: 350;
        gap:0;
    }
    .hdr-status {
        align-items: center;
        color: var(--ylw07);
        font-size: 1.4em; 
        font-weight: 300;
    }

    .controls {
        padding-bottom: 1em;
        gap: 1.5em;
    }
    
    .aid-prompt {
        background-color: var(--ong03);
        align-items: center;
        justify-content: space-between;
        border-radius: 2em;
        padding: 0.5em 1em;
    }
    .aid-prompt h3 {
        color: var(--ong06);
    }

    .mode {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap:1em;
    }

    .mode-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        border-radius: 2em;
        padding: 0.5em 1em;
    }

</style>