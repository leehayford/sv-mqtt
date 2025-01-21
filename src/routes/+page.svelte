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


</script>

<div class="container">

    <div class="row">
        <div class="row hdr-title"> ~2Chainz </div>
        <br>
        <div class="row hdr-content">
            <div class="row hdr-status">{GZ.ops.status}</div>
            {#if !GZ.ops.diagnostic_mode}
            <ButtonIcon func={GZ.mqttCMDEnableDiagMdoe} img={img_settings} color={RGBA(BASE.PURPLE, 0.7)} />
            {:else}
            <ButtonIcon func={GZ.mqttCMDDisableDiagMdoe} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
            {/if}
            
        </div>
         
    </div>

    <br>

    
    {#if !GZ.ops.diagnostic_mode}
    <div class="row">
        
        <div class="col">
            <div class="row sec-hdr">
                <h3>Configuration:</h3>
            </div>
            <PanelControl>
                <div class="control-num">
                    <p>Enter drop quantity</p>
                    <InputNum width="100%" bind:enabled={cfgEnabled} height="var(--ctrl-h-s)" 
                        bind:num={GZ.cfg.cycles} is_integer={true}/>
                    <div>QTY</div>
                </div>
            </PanelControl>
            <PanelControl>
                <div class="control-num">
                    <p>Enter drop height</p>
                    <InputNum width="100%" bind:enabled={cfgEnabled} height="var(--ctrl-h-s)" 
                        bind:num={GZ.cfg.height}/>
                    <div>INCH</div>
                </div>
            </PanelControl>
            <div class="row conf-btns">
                {#if GZ.cfg.run}
                <ButtonIcon func={GZ.mqttCMDCancel} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
                {:else}
                <ButtonIcon func={GZ.mqttCMDConfig} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
                {/if}
            </div>
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
                max={GZ.cfg.height}
                dec=3
                title="Position"
                unit="INCH"
            />
            </PanelControl>
        </div>

    </div>
    {/if}
    
    <!-- <br> -->

    <div class="row">
        
        <div class="col">

            <div class="row sec-hdr">
                <h3>IO State: </h3>
                <!-- <ButtonIcon func={GZ.mqttCMDReport} img={img_question} color={RGBA(BASE.MAGENTA, 0.7)} /> -->
            </div>

            <Indicator bind:alarm={GZ.sta.estop} type="SWITCH:" name="E-STOP"
            colorClear={colorOK} lblClear="CLEAR"
            colorAlarm={colorFault} lblAlarm="EMERGENCY STOP"
            />

            <Indicator bind:alarm={GZ.sta.pressure} type="SWITCH:" name="PRESSURE"
            colorClear={colorOK} lblClear="PRESSURE OK"
            colorAlarm={colorFault} lblAlarm="PRESSURE FAULT"
            />
            
            <Indicator bind:alarm={GZ.sta.door_open} type="LIMIT:" name="DOOR"
            colorClear={colorOK} lblClear="CLOSED"
            colorAlarm={colorFault} lblAlarm="OPEN"
            />

            <Indicator bind:alarm={GZ.sta.top_limit} type="LIMIT:" name="TOP"
            colorClear={colorOK} lblClear="CLEAR"
            colorAlarm={colorFault} lblAlarm="FAULT"
            />

            <Indicator bind:alarm={GZ.sta.fist_limit} type="LIMIT:" name="FIST"
            colorAlarm={colorOK} lblAlarm="HAMMER LOCATED"
            colorClear={colorWarn} lblClear="HAMMER FREE"
            />
            
            <Indicator bind:alarm={GZ.sta.anvil_limit} type="PROXIMITY:" name="ANVIL"
            colorAlarm={colorOK} lblAlarm="HAMMER DOWN"
            colorClear={colorWarn} lblClear="HAMMER RAISED"
            />
            
            <Indicator bind:alarm={GZ.sta.home_limit} type="LIMIT:" name="HOME"
            colorAlarm={colorOK} lblAlarm="HOME"
            colorClear={colorWarn} lblClear="FIST RAISED"
            />
            
            <Indicator bind:alarm={GZ.sta.brake_on} type="RELAY:" name="BRAKE"
            colorClear={colorWarn} lblClear="OFF"
            colorAlarm={colorOK} lblAlarm="ON"
            />
            
            <Indicator bind:alarm={GZ.sta.magnet_on} type="RELAY:" name="MAGNET"
            colorClear={colorWarn} lblClear="OFF"
            colorAlarm={colorOK} lblAlarm="ON"
            />
            
            <Indicator bind:alarm={GZ.sta.motor_on} type="RELAY:" name="MOTOR"
            colorClear={colorWarn} lblClear="OFF"
            colorAlarm={colorOK} lblAlarm="ON"
            />
        
        </div>    
        

        <div class="vert-line"></div>

        {#if GZ.ops.diagnostic_mode}
        <DiagnosticPanel />
        {:else}
        <div class="col">

            <div class="row sec-hdr">
                <h3>Run State: </h3>
                <!-- <p>{GZ.err.message}</p> -->
            </div>

            <Indicator bind:alarm={GZ.ops.want_estop_release} type="ALARM:" name="E-STOP"
            colorAlarm={colorFault} lblAlarm="EMERGENCY STOP"
            />
            
            <Indicator bind:alarm={GZ.ops.want_door_close} type="ALARM:" name="DOOR"
            colorAlarm={colorFault} 
            />
            
            <Indicator bind:alarm={GZ.ops.want_aid} type="ALARM:" name="ERROR"
            colorAlarm={colorFault} 
            />
            
            <Indicator bind:alarm={GZ.ops.want_config} type="PROMPT:" name="CONFIG"
            colorAlarm={colorWarn} 
            />

            <Indicator bind:alarm={GZ.ops.seek_hammer} type="OPERATION:" name="HAMMER"
            colorAlarm={colorOK} 
            />
            
            <Indicator bind:alarm={GZ.ops.seek_anvil} type="OPERATION:" name="ANVIL"
            colorAlarm={colorOK} 
            />
            
            <Indicator bind:alarm={GZ.ops.seek_home} type="OPERATION:" name="HOME"
            colorAlarm={colorOK} 
            />

            <Indicator bind:alarm={GZ.ops.raise_hammer} type="OPERATION:" name="RAISE"
            colorAlarm={colorOK} 
            />

            <Indicator bind:alarm={GZ.ops.drop_hammer} type="OPERATION:" name="DROP"
            colorAlarm={colorOK} 
            />

            <Indicator bind:alarm={GZ.ops.want_strike} type="OPERATION:" name="STRIKE"
            colorAlarm={colorOK} 
            />

        </div>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 0 25%;
        width: 100%; 
        height: 100%;
    }

    .hdr-title {
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
        align-items: flex-end;
        font-size: 1.7em; 
        font-weight: 300;
    }

    /* .prog-conf {
        display: grid;
        grid-template-columns: 1fr 1em 1fr;
    } */

    .sec-hdr {
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: solid 0.1em var(--gry02);
    }
    .sec-hdr h3 {
        color: var(--gry06);
    }

    .control-num {
        display: grid;
        grid-template-columns: 1fr 1fr 3em;
        align-items: center;
        min-height: 2.5em;
        gap:0.5em;
    }

    .conf-btns {
        justify-content: flex-end;
        /* padding-right: 1.5em; */
    }

</style>