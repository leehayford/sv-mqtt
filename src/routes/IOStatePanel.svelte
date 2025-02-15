<script>

    import {getContext} from 'svelte'

    import {RGBA, BASE} from '$lib/common/colors'

    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import Indicator from '$lib/common/indicator/Indicator.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_question from '$lib/assets/Question.svg'
    import img_led from '$lib/assets/LED.svg'

    let GZ = $state(getContext('gizmo'))

    let colorOK = RGBA(BASE.SEAFOAM, 0.7)
    let colorWarn = RGBA(BASE.AMBER, 0.7)
    let colorFault = RGBA(BASE.RED, 0.8)
    let colorNone = RGBA(BASE.LIGHT, 0.05)

</script>

<div class="col container">

    <div class="row sec-hdr">
        <h3>IO Pin & Operational State: </h3>
        <div class="row conf-btns">
            <ButtonIcon func={GZ.mqttCMDReport} img={img_question} color={RGBA(BASE.GREY, 0.7)} />
        </div>
    </div>
    
    <div class="stat-hdr">
        <div class="row lbl">Name</div>
        <div class="stat-led-hdr">IO</div>
        <div class="stat-led-hdr">OP</div>
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
        opOn={colorFault} lblOpOn="BRAKE FAILED OFF - HIGH PRESSURE FAULT"
        opOff={colorOK} lblOpOff="BRAKE ON"
    />
    {:else}
    <Indicator name="PRESSURE"
        bind:io={GZ.sta.pressure} 
        bind:op={GZ.sta.pressure}
        opOff={colorFault} lblOpOff="BRAKE FAILED ON - LOW PRESSURE FAULT"
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

    {:else if GZ.ops.go_home}

        <Indicator name="FIST"
            bind:io={GZ.sta.fist_limit}
            bind:op={GZ.sta.fist_limit}
            opOff={colorWarn} lblOpOff="SEEKING HAMMER"
            opOn={colorOK} lblOpOn="HAMMER FOUND"
        />
        
        <Indicator name="ANVIL"
            bind:io={GZ.sta.anvil_limit}
            bind:op={GZ.sta.anvil_limit}
            opOff={colorWarn} lblOpOff="SEEKING ANVIL"
            opOn={colorOK} lblOpOn="ANVIL FOUND"
        />
        
        <Indicator name="HOME"
            bind:io={GZ.sta.home_limit}
            bind:op={GZ.sta.home_limit}
            opOff={colorWarn} lblOpOff="SEEKING HOME"
            opOn={colorOK} lblOpOn="HOME FOUND"
        />

    {:else}
        <Indicator name="FIST"
            bind:io={GZ.sta.fist_limit}
            bind:op={GZ.sta.fist_limit}
            opOn={colorWarn} lblOpOn="CONTACT"
            opOff={colorNone} lblOpOff=""
        />
        
        <Indicator name="ANVIL"
            bind:io={GZ.sta.anvil_limit}
            bind:op={GZ.sta.anvil_limit}
            opOn={colorWarn} lblOpOn="CONTACT"
            opOff={colorNone} lblOpOff=""
        />
        
        <Indicator name="HOME"
            bind:io={GZ.sta.home_limit}
            bind:op={GZ.sta.home_limit}
            opOn={colorWarn} lblOpOn="CONTACT"
            opOff={colorNone} lblOpOff=""
        />    
    {/if}


</div>

<style>
    
    .container {
        gap:1.25em;
    }

    .stat-hdr {
        display: grid;
        grid-template-columns: 5em var(--ctrl-h-m) var(--ctrl-h-m) 1fr;
        border-bottom: solid 0.1em var(--gry02);
        align-items: center;
        min-height: var(--ctrl-h-m);
        max-height: var(--ctrl-h-m);
        width:100%;
        padding:0 0.5em 0.5em 0.5em;
        gap:0.75em;
    }
    
    .stat-hdr .lbl {
        color: var(--gry07);
        justify-content: flex-end;
        align-items: center;
        font-size: 1.3em;
    }
    .stat-hdr p {
        color: var(--gry07);
        /* justify-content: flex-end; */
        align-items: center;
        font-size: 1.3em;
    }

    .stat-led-hdr {
        color: var(--ylw07);
        font-size: 1.3em;
        width: var(--ctrl-h-m);
    }

</style>