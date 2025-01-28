<script>

    import {getContext} from 'svelte'

    import {RGBA, BASE} from '$lib/common/colors'

    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import Indicator from '$lib/common/indicator/Indicator.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_led from '$lib/assets/LED.svg'

    let GZ = $state(getContext('gizmo'))

    let colorOK = RGBA(BASE.SEAFOAM, 0.7)
    let colorWarn = RGBA(BASE.ORANGE, 0.8)
    let colorFault = RGBA(BASE.RED, 0.8)
    let colorNone = RGBA(BASE.LIGHT, 0.05)

</script>

<div class="col container">

    <div class="row sec-hdr">
        <h3>IO Pin & Operational State: </h3>
        <!-- <ButtonIcon func={GZ.mqttCMDReport} img={img_question} color={RGBA(BASE.MAGENTA, 0.7)} /> -->
    </div>
    
    <div class="stat-hdr">
        <div class="row lbl">Name</div>
        <div class="led">IO</div>
        <div class="led">OP</div>
        <p>Description</p>
    </div>

    <Indicator name="E-STOP" 
        bind:io={GZ.sta.estop} 
        bind:op={GZ.ops.want_estop_release}
        opOn={colorFault} lblOpOn="EMERGENCY STOP"
        opOff={colorOK} lblOpOff="SYSTEM ENABLED"
    />
    
    <Indicator name="DOOR"
        bind:io={GZ.sta.door_open}
        bind:op={GZ.ops.want_door_close}
        opOn={colorFault} lblOpOn="DOOR IS OPEN"
        opOff={colorOK} lblOpOff="DOOR CLOSED"
    />

    <Indicator name="TOP"
        bind:io={GZ.sta.top_limit} 
        bind:op={GZ.ops.want_fist_down} 
        opOn={colorFault} lblOpOn="LIMIT FAULT"
        opOff={colorOK} lblOpOff="LIMIT CLEAR"
    />

    {#if GZ.sta.brake_on}
    <Indicator name="PRESSURE"
        bind:io={GZ.sta.pressure}
        bind:op={GZ.sta.pressure}
        opOn={colorFault} lblOpOn="BRAKE FAILURE - HIGH PRESSURE FAULT"
        opOff={colorOK} lblOpOff="BRAKE ON"
    />
    {:else}
    <Indicator name="PRESSURE"
        bind:io={GZ.sta.pressure} 
        bind:op={GZ.sta.pressure}
        opOff={colorFault} lblOpOff="BRAKE FAILURE - LOW PRESSURE FAULT"
        opOn={colorOK} lblOpOn="BRAKE OFF"
    />
    {/if}


    <Indicator name="MAGNET"
        bind:io={GZ.sta.magnet_on} 
        bind:op={GZ.sta.magnet_on}
        opOn={colorOK} lblOpOn="MAGNET ON"
        opOff={colorOK} lblOpOff="MAGNET OFF"
    />
    
    {#if GZ.ops.raise_hammer}

    <Indicator name="FIST"
        bind:io={GZ.sta.fist_limit}
        bind:op={GZ.sta.fist_limit}
        opOn={colorOK} lblOpOn="RAISING HAMMER"
        opOff={colorFault} lblOpOff="LOST HAMMER"
    />
    
    <Indicator name="ANVIL"
        bind:io={GZ.sta.anvil_limit}
        bind:op={GZ.sta.anvil_limit}
        opOn={colorFault} lblOpOn="LIMIT FAULT"
        opOff={colorOK} lblOpOff="LIMIT CLEAR"
    />
    
    <Indicator name="HOME"
        bind:io={GZ.sta.home_limit}
        bind:op={GZ.sta.home_limit}
        opOn={colorFault} lblOpOn="LIMIT FAULT"
        opOff={colorOK} lblOpOff="LIMIT CLEAR"
    />

    {:else if GZ.ops.drop_hammer || GZ.ops.want_strike }

    <Indicator name="FIST"
        bind:io={GZ.sta.fist_limit}
        bind:op={GZ.sta.fist_limit}
        opOn={colorFault} lblOpOn="FAILED TO DROP HAMMER"
        opOff={colorOK} lblOpOff="HAMMER RELEASED"
    />
    
    <Indicator name="ANVIL"
        bind:io={GZ.sta.anvil_limit}
        bind:op={GZ.sta.anvil_limit}
        opOn={colorOK} lblOpOn="HAMMER DOWN"
        opOff={colorWarn} lblOpOff="YEARNS FOR HAMMER STRIKE"
    />
    
    <Indicator name="HOME"
        bind:io={GZ.sta.home_limit}
        bind:op={GZ.sta.home_limit}
        opOn={colorFault} lblOpOn="LIMIT FAULT"
        opOff={colorOK} lblOpOff="LIMIT CLEAR"
    />

    {:else}

        <Indicator name="FIST"
            bind:io={GZ.sta.fist_limit}
            bind:op={GZ.ops.seek_hammer}
            opOn={colorWarn} lblOpOn="SEEKING HAMMER"
            opOff={colorOK} lblOpOff="HAMMER FOUND"
        />
        
        <Indicator name="ANVIL"
            bind:io={GZ.sta.anvil_limit}
            bind:op={GZ.ops.seek_anvil}
            opOn={colorWarn} lblOpOn="SEEKING ANVIL"
            opOff={colorOK} lblOpOff="ANVIL FOUND"
        />
        
        <Indicator name="HOME"
            bind:io={GZ.sta.home_limit}
            bind:op={GZ.ops.seek_home}
            opOn={colorWarn} lblOpOn="SEEKING HOME"
            opOff={colorOK} lblOpOff="HOME FOUND"
        />

    {/if}

    
    
    <!-- <Indicator name="BRAKE"
    bind:io={GZ.sta.brake_on}
    colorClear={colorWarn} lblClear="OFF"
    colorAlarm={colorOK} lblAlarm="ON"
    /> -->
    
    
    <!-- <Indicator bind:alarm={GZ.sta.estop} type="SWITCH:" name="E-STOP"
    colorClear={colorOK} lblClear="CLEAR"
    colorAlarm={colorFault} lblAlarm="EMERGENCY STOP"
    />
    
    <Indicator bind:alarm={GZ.sta.door_open} type="LIMIT:" name="DOOR"
    colorClear={colorOK} lblClear="CLOSED"
    colorAlarm={colorFault} lblAlarm="OPEN"
    />

    <Indicator bind:alarm={GZ.sta.pressure} type="SWITCH:" name="PRESSURE"
    colorClear={colorOK} lblClear="PRESSURE OK"
    colorAlarm={colorFault} lblAlarm="PRESSURE FAULT"
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
    /> -->

</div>

<style>
    
    .container {
        gap:1.5em;
    }

    .stat-hdr {
        display: grid;
        /* grid-template-columns: 5em 10em var(--ctrl-h-m) 1fr; */
        grid-template-columns: 5em var(--ctrl-h-m) var(--ctrl-h-m) 1fr;
        border-bottom: solid 0.1em var(--gry02);
        align-items: center;
        min-height: var(--ctrl-h-m);
        max-height: var(--ctrl-h-m);
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }
    
    .stat-hdr .lbl {
        justify-content: flex-end;
        align-items: center;
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

    .led {
        font-size: 1.3em;
    }

</style>