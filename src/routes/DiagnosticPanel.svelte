<script>
    
    import {getContext} from 'svelte'

    import {RGBA, BASE} from '$lib/common/colors'

    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'

    import PanelControl from '$lib/common/panel/PanelControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_led from '$lib/assets/LED.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_zero from '$lib/assets/Zero.svg'
    import img_up from '$lib/assets/MoveUp.svg'
    import img_down from '$lib/assets/MoveDown.svg'
    import img_stop from '$lib/assets/Stop.svg'

    let GZ = $state(getContext('gizmo'))

</script>


<div class="col container">

    <div class="diag-control">
        <p class="lbl">BRAKE</p>
        <br>
        {#if GZ.sta.brake_on}
        <ButtonIcon img={img_led} color={RGBA(BASE.SEAFOAM, 0.7)} func={GZ.mqttDIAGBrakeOff} />
        {:else}
        <ButtonIcon img={img_led} color={RGBA(BASE.SEAFOAM, 0.0)} func={GZ.mqttDIAGBrakeOn} />
        {/if}
        <br>
        <p class="state">{(GZ.sta.brake_on ? "ON" : "OFF")}</p>
    </div>

    <div class="diag-control">
        <p class="lbl">MAGNET</p>
        <br>
        {#if GZ.sta.magnet_on}
        <ButtonIcon img={img_led} color={RGBA(BASE.SEAFOAM, 0.7)} func={GZ.mqttDIAGMagnetOff} />
        {:else}
        <ButtonIcon img={img_led} color={RGBA(BASE.SEAFOAM, 0.0)} func={GZ.mqttDIAGMagnetOn} />
        {/if}
        <br>
        <p class="state">{(GZ.sta.magnet_on ? "ON" : "OFF")}</p>
    </div>

    <KeyPadControl bind:num={GZ.sta.current_height} unit={"INCH"}
        title={"POSITION"}
        note={"Distance to move (up or down) in diagnostic mode"}
        enabled={false}
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.diag_inch} unit={"INCH"}
        title={"MOVE DISTANCE"}
        note={"Distance to move (up or down) in diagnostic mode"}
        enabled={true}
        on:validate={GZ.mqttCMDAdmin}
    />
    <div class="row motor-btns">
        <ButtonIcon func={GZ.mqttDIAGMotorZero} img={img_zero} color={RGBA(BASE.SEAFOAM, 0.6)} />
        <ButtonIcon func={GZ.mqttDIAGMoveUp} img={img_up} color={RGBA(BASE.AMBER, 0.6)} />
        <ButtonIcon func={GZ.mqttDIAGMoveDown} img={img_down} color={RGBA(BASE.PINK, 0.6)} />
        <ButtonIcon func={GZ.mqttDIAGMotorStop} img={img_stop} color={RGBA(BASE.RED, 0.7)} />
    </div>
</div>


<style>

    .diag-control {
        display: grid;
        grid-template-columns: 1fr 1em 3em 1em 1fr;
        align-items: center;
        min-height: var(--hdr_h);
        max-height: var(--hdr_h);
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }

    .lbl {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        color: var(--ylw07);
        font-size: 1.375em; 
        font-weight: 300;
    }
    .state {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        color: var(--ylw07);
        font-size: 1.375em; 
        font-weight: 300;
    }
    .motor-btns {
        justify-content: flex-end;
        padding-right: 7em;
    }

</style>