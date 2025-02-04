<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'

    import KeyPad from '$lib/common/key_pad/KeyPad.svelte'
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import YesNoDialog from '$lib/common/dialog/YesNoDialog.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_edit from '$lib/assets/Edit.svg'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let GZ = $state(getContext('gizmo'))

    let edit = $state(false)

    let showDialog = $state(false)
    const showConfirmationDialog = () => { showDialog = true }

    const saveSettingsToFile = () => {
        GZ.mqttCMDAdminSetDefaults();
        edit = false
    }

    const acceptChanges = () => {
        GZ.mqttCMDAdmin();
        edit = false
    }

    const cancelChanges = () => {
        edit = false
    }

</script>

<YesNoDialog 
    title={"Check yo self foo!"}
    prompt={"This will permanently alter 2Chainz' default settings."}
    bind:showDialog
    on:confirim={saveSettingsToFile}
/>

<div class="col">
    <div class="row sec-hdr">
        <h3>Admin Settings:</h3>
        
        <div class="row conf-btns">
            {#if edit}
            <ButtonIcon img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} 
                func={showConfirmationDialog}/>
            <ButtonIcon img={img_reset} color={RGBA(BASE.ORANGE, 0.7)} 
                func={GZ.mqttCMDAdminGetDefaults}/>
            <ButtonIcon img={img_cancel} color={RGBA(BASE.RED, 0.7)} 
                func={cancelChanges}/>
            {:else}
            <ButtonIcon img={img_edit} color={'var(--ylw08)'} 
                func={() => {edit = true}}/>
            {/if}
        </div>

    </div>

    <!-- Operations -->

    <KeyPadControl bind:num={GZ.adm.ops_tmr_hammer_usec} isInteger={true} unit={"uSec"}
        title={"Hammer Timeout"}
        note={"Time to wait for hammer to drop before alert"}
        bind:enabled={edit} 
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.ops_tmr_brake_usec} isInteger={true} unit={"uSec"}
        title={"Brake Timeout"}
        note={"Time to wait brake pressure to build or drop"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.ops_pos_period_msec} isInteger={true} unit={"mSec"} 
        title={"Position Update"}
        note={"How often to send position update while moving"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

    <!-- IO -->

    <KeyPadControl bind:num={GZ.adm.io_tmr_itr_deb_usec} isInteger={true} unit={"uSec"}
        title={"Interrupt Check"}
        note={"How often to check for interrupt pins waiting on debounce"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

    <!-- Motor -->
 
    <KeyPadControl bind:num={GZ.adm.mot_hz_low} isInteger={true} unit={"Hz"}
        title={"Motor Low Speed"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.mot_hz_high} isInteger={true} unit={"Hz"}
        title={"Motor High Speed"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />
    <KeyPadControl bind:num={GZ.adm.mot_accel} isInteger={true} unit={"Hz / s²"}
        title={"Motor Acceleration"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />
    <KeyPadControl bind:num={GZ.adm.mot_decel} isInteger={true} unit={"Hz / s²"}
        title={"Motor Deceleration"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.mot_inch_rev} unit={"Inch"}
        title={"Motor Inches / Rev"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />
    <KeyPadControl bind:num={GZ.adm.mot_steps_rev} isInteger={true} unit={"Step"}
        title={"Motor Steps / Rev"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />
    
    <KeyPadControl bind:num={GZ.adm.mot_inch_max} unit={"Inch"}
        title={"Motor Max Height"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />
    <KeyPadControl bind:num={GZ.adm.mot_inch_over} unit={"Inch"}
        title={"Motor Overshoot"}
        note={"Distance to overshoot when returning to home position"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

    <KeyPadControl bind:num={GZ.adm.diag_inch} unit={"Inch"}
        title={"Diagnostic Move"}
        note={"Distance to move (up or down) in diagnostic mode"}
        bind:enabled={edit}
        on:validate={GZ.mqttCMDAdmin}
    />

</div>

<style>

</style>