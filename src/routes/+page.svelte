<script>

    import {getContext} from 'svelte'
    import {Machine} from '$lib/models/machine.svelte'

    import {ALERT_CODES, alert} from '$lib/utils'
    import {RGBA, BASE} from '$lib/common/colors'

    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import StateIcon from '$lib/common/state_icon/StateIcon.svelte'
    import ProgressBar from '$lib/common/bar_graph/ProgressBar.svelte'
    import BarGaugeH from '$lib/common/bar_graph/BarGaugeH.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_question from '$lib/assets/Question.svg'

    let colorOK = RGBA(BASE.SEAFOAM, 0.8)
    let colorWarn = RGBA(BASE.ORANGE, 0.8)
    let colorFault = RGBA(BASE.RED, 0.8)

    let GZ = $state(getContext('gizmo'))
    let cfgEnabled = $state(!GZ.cfg.run)

    const testPub1 = () => {client.publish('lee/test/1', 'mqtt over ws test 1', {qos: 0, retain: false})}
    const testPub2 = () => {client.publish('lee/test/2', 'mqtt over ws test 2', {qos: 0, retain: false})}
    const testPub3 = () => {client.publish('lee/test/3', 'mqtt over ws test 3', {qos: 0, retain: false})}
    const testPub4 = () => {client.publish('lee/test/4', 'mqtt over ws test 4', {qos: 0, retain: false})}
    const testPub5 = () => {client.publish('lee/test/5', 'mqtt over ws test 5', {qos: 0, retain: false})}

    const testAlertE = () => {alert( ALERT_CODES.ERROR, "test error")}
    const testAlertW = () => {alert( ALERT_CODES.WARNING, "test warning")}
    const testAlertS = () => {alert( ALERT_CODES.SUCCESS, "test success")}

</script>

<div class="container">

    <div class="row header">
        <h1>2Chainz</h1>
        <br>
        <h3>{GZ.ops.status}</h3>
    </div>

    <div class="row">
        
        <div class="col">
            <div class="row">
                <h3>State: </h3>
                <ButtonIcon func={GZ.mqttCMDReport} img={img_question} color={RGBA(BASE.MAGENTA, 0.7)} />
            </div>
            <PanelControl>
            <BarGaugeH  
                color={BASE.SEAFOAM}
                bind:num={GZ.percentComplete}
                max={GZ.cfg.cycles}
                title="Complete"
                unit="QTY"
            />
            </PanelControl>
            
            <PanelControl>
            <BarGaugeH  
                color={BASE.SEAFOAM}
                bind:num={GZ.position}
                dec=3
                title="Position"
                unit="INCH"
            />
            </PanelControl>

            <StateIcon bind:alarm={GZ.sta.estop} name="SYSTEM"
            colorClear={colorOK} lblClear="ENABLED"
            colorAlarm={colorFault} lblAlarm="EMERGENCY STOP"
            />
            
            <StateIcon bind:alarm={GZ.sta.door_open} name="DOOR"
            colorClear={colorOK} lblClear="CLOSED"
            colorAlarm={colorFault} lblAlarm="OPEN"
            />

            <StateIcon bind:alarm={GZ.sta.pressure} name="BRAKE"
            colorClear={colorOK} lblClear="PRESSURE OK"
            colorAlarm={colorFault} lblAlarm="PRESSURE FAULT"
            />
            
            <StateIcon bind:alarm={GZ.sta.top_limit} name="TOP LIMIT"
            colorClear={colorOK} lblClear="CLEAR"
            colorAlarm={colorFault} lblAlarm="FAULT"
            />

            <br>

            <StateIcon bind:alarm={GZ.sta.fist_limit} name="FIST"
            colorAlarm={colorOK} lblAlarm="HAMMER LOCATED"
            colorClear={colorWarn} lblClear="HAMMER FREE"
            />
            
            <StateIcon bind:alarm={GZ.sta.anvil_limit} name="ANVIL"
            colorAlarm={colorOK} lblAlarm="HAMMER DOWN"
            colorClear={colorWarn} lblClear="HAMMER RAISED"
            />
            
            <StateIcon bind:alarm={GZ.sta.home_limit} name="WEIGHT"
            colorAlarm={colorOK} lblAlarm="HOME"
            colorClear={colorWarn} lblClear="AWAY"
            />
            

            
            
            <StateIcon bind:alarm={GZ.sta.brake_on} name="BRAKE"
            colorClear={colorWarn} lblClear="OFF"
            colorAlarm={colorOK} lblAlarm="ON"
            />
            
            <StateIcon bind:alarm={GZ.sta.magnet_on} name="MAGNET"
            colorClear={colorWarn} lblClear="OFF"
            colorAlarm={colorOK} lblAlarm="ON"
            />
            
            <StateIcon bind:alarm={GZ.sta.motor_on} name="MOTOR"
            colorClear={colorOK} lblClear="OFF"
            colorAlarm={colorWarn} lblAlarm="ON"
            />
        
        </div>    
        
        <br>

        <div class="col">
            <div class="row">
                <h3>Configuration:</h3>
                {#if GZ.cfg.run}
                <ButtonIcon func={GZ.mqttCMDCancel} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
                {:else}
                <ButtonIcon func={GZ.mqttCMDConfig} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
                {/if}
            </div>
            <PanelControl>
                <div class="control-num">
                    <InputNum width="100%" bind:enabled={cfgEnabled} height="var(--ctrl-h-s)" 
                        bind:num={GZ.cfg.cycles} is_integer={true}/>
                    <div>QTY</div>
                </div>
            </PanelControl>
            <PanelControl>
                <div class="control-num">
                    <InputNum width="100%" bind:enabled={cfgEnabled} height="var(--ctrl-h-s)" 
                        bind:num={GZ.cfg.height}/>
                    <div>INCH</div>
                </div>
            </PanelControl>

        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%; 
        height: 100%;
    }

    /* .btn-col {
        display: flex;
        flex-direction: column;
        max-width: 3em;
        padding: 0.5em;
        cursor: pointer;
        gap: 1em;
    } */

    .control-num {
        display: grid;
        grid-template-columns: 1fr 3em;
        align-items: center;
        min-height: 2.5em;
        gap:0.5em;
    }
</style>