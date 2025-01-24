<script>

    import {getContext} from 'svelte'
    import {Machine} from '$lib/models/machine.svelte'

    import {ALERT_CODES, alert} from '$lib/utils'
    import {RGBA, BASE} from '$lib/common/colors'

    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import Indicator from '$lib/common/indicator/Indicator.svelte'
    import StateIcon from '$lib/common/state_icon/StateIcon.svelte'
    import ProgressBar from '$lib/common/bar_graph/ProgressBar.svelte'
    import BarGaugeH from '$lib/common/bar_graph/BarGaugeH.svelte'

    import KeyPad from './KeyPad.svelte'
    import IOStatePanel from './IOStatePanel.svelte'
    import OpStatePanel from './OpStatePanel.svelte'
    import DiagnosticPanel from './DiagnosticPanel.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_settings from '$lib/assets/Settings.svg'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
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
</script>

<div class="container">

    <KeyPad title="Drop Quantity"
    bind:showKeyPad={showQTYKeyPad} 
    bind:num={GZ.cfg.cycles} 
    isInteger={true} 
    />
    
    <KeyPad title="Drop Height"
    bind:showKeyPad={showHeightKeyPad} 
    bind:num={GZ.cfg.height} 
    max={48.0}
    />

    <div class="row hdr">
        <div class="row hdr-title"> ~2Chainz </div>
        <br>
        <div class="row hdr-content">
            <div class="row hdr-status">{GZ.ops.status}</div>
            {#if !GZ.ops.diagnostic_mode}
            <ButtonIcon func={GZ.mqttCMDEnableDiagMdoe} img={img_settings} color={RGBA(BASE.PINK, 0.7)} />
            {:else}
            <ButtonIcon func={GZ.mqttCMDDisableDiagMdoe} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
            {/if}
            
        </div>
         
    </div>

    <br>

    
    {#if !GZ.ops.diagnostic_mode}
    <div class="col controls">
        
        <div class="col">
            <div class="row sec-hdr">
                <h3>Configuration:</h3>
                
                <div class="row conf-btns">
                    {#if GZ.cfg.run}
                    <ButtonIcon func={GZ.mqttCMDCancel} img={img_reset} color={RGBA(BASE.AQUA, 0.7)} />
                    <ButtonIcon func={GZ.mqttCMDCancel} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
                    {:else}
                    <ButtonIcon func={GZ.mqttCMDConfig} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
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

        <div class="vert-line"></div>

        <div class="col">
            <div class="row sec-hdr">
                <h3>Progress: </h3>
            </div>
            <PanelControl>
            <BarGaugeH  
                color={BASE.SEAFOAM}
                bind:num={GZ.percentComplete}
                max={GZ.cfg.cycles}
                title="Complete"
                unit={`/${GZ.cfg.cycles}`}
            />
            </PanelControl>
            
            <PanelControl>
            <BarGaugeH  
                color={BASE.SEAFOAM}
                bind:num={GZ.position}
                max={(GZ.cfg.height === 0 ? 48 : GZ.cfg.height)}
                dec=2
                title="Position"
                unit="INCH"
            />
            </PanelControl>
        </div>

    </div>
    {/if}


    <div class="row">
        
        <IOStatePanel />

        <!-- <div class="vert-line"></div>

        {#if GZ.ops.diagnostic_mode}
        <DiagnosticPanel />
        {:else}
        <OpStatePanel />
        {/if} -->

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
        border-bottom: solid 0.1em var(--gry02);
    }
    .hdr-title {
        color: var(--aqu07);
        width: auto;
        align-items: flex-end;
        font-size: 2.5em; 
        font-weight: 350;
    }
    .hdr-content {
        align-items: flex-end;
        justify-content: space-between;
    }
    .hdr-status {
        color: var(--pnk06);
        align-items: flex-end;
        font-size: 1.7em; 
        font-weight: 300;
    }

    .sec-hdr {
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: solid 0.1em var(--gry02);
        padding-bottom: 0.25em;
    }
    .sec-hdr h3 {
        color: var(--gry06);
    }

    .controls {
        padding-bottom: 1em;
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