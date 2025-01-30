<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'

    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_edit from '$lib/assets/Edit.svg'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let GZ = $state(getContext('gizmo'))

    let edit = $state(false);

    const openHmrTime = () => {dispatch("")}
    const openPosTime = () => {dispatch("")}
    const openMagTime = () => {dispatch("")}
    
    const openITRTime = () => {dispatch("")}

    const openHzHigh = () => {dispatch("")}
    const openHzLow = () => {dispatch("")}
    const openAccel = () => {dispatch("")}
    const openDecel = () => {dispatch("")}
    
    const openInchRev = () => {dispatch("")}
    const openStepsRev = () => {dispatch("")}
    
    const openInchMax = () => {dispatch("")}

    const openInchOver = () => {dispatch("")}
    
    const openInchDiag = () => {dispatch("")}

</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Admin Settings:</h3>
        
        <div class="row conf-btns">
            {#if edit}
            <ButtonIcon img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
            <ButtonIcon img={img_reset} color={RGBA(BASE.ORANGE, 0.7)} />
            <ButtonIcon img={img_cancel} color={RGBA(BASE.RED, 0.7)} 
                func={() => {edit = false}}/>
            {:else}
            <ButtonIcon img={img_edit} color={RGBA(BASE.MAGENTA, 0.7)} 
                func={() => {edit = true}}/>
            {/if}
        </div>

    </div>

    <!-- Operations -->
    <KeyPadControl bind:num={GZ.adm.ops_tmr_hammer_usec} isInteger={true}
        on:open-keypad={openHmrTime} 
        title={"Hammer Timeout"}
        unit={"uSec"}
    />
    <div class="note">Time to wait for hammer to drop before alert</div>

    <KeyPadControl bind:num={GZ.adm.ops_pos_period_msec} isInteger={true}
        on:open-keypad={openHmrTime} 
        title={"Position Update"}
        unit={"mSec"}
    />
    <div class="note">How often to send position update while moving</div>

    <!-- <KeyPadControl bind:num={GZ.adm.ops_mag_delay_msec} isInteger={true}
        on:open-keypad={openMagTime} 
        title={"Magnet Wait"}
        unit={"mSec"}
    /> -->

    <!-- IO -->
    <KeyPadControl bind:num={GZ.adm.io_tmr_itr_deb_usec} isInteger={true}
        on:open-keypad={openHmrTime} 
        title={"Interrupt Check"}
        unit={"uSec"}
    />
    <div class="note">How often to check for interrupt pins waiting on debounce</div>

    <!-- Motor -->
 
    <KeyPadControl bind:num={GZ.adm.mot_hz_low} isInteger={true}
        on:open-keypad={openHzLow} 
        title={"Motor Low Speed"}
        unit={"Hz"}
    />
    <div class="note"></div>

    <KeyPadControl bind:num={GZ.adm.mot_hz_high} isInteger={true}
        on:open-keypad={openHzHigh} 
        title={"Motor High Speed"}
        unit={"Hz"}
    />
    <KeyPadControl bind:num={GZ.adm.mot_accel} isInteger={true}
        on:open-keypad={openAccel} 
        title={"Motor Acceleration"}
        unit={"Hz/s/s"}
    />
    <KeyPadControl bind:num={GZ.adm.mot_decel} isInteger={true}
        on:open-keypad={openDecel} 
        title={"Motor Deceleration"}
        unit={"Hz/s/s"}
    />

    <KeyPadControl bind:num={GZ.adm.mot_inch_rev} 
        on:open-keypad={openInchRev} 
        title={"Motor Inches / Rev"}
        unit={"Inch"}
    />
    <KeyPadControl bind:num={GZ.adm.mot_steps_rev} isInteger={true}
        title={"Motor Steps / Rev"}
        unit={"Step"}
    />
    
    <KeyPadControl bind:num={GZ.adm.mot_inch_max} 
        on:open-keypad={openAccel} 
        title={"Motor Max Height"}
        unit={"Inch"}
    />
    <KeyPadControl bind:num={GZ.adm.mot_inch_over} 
        on:open-keypad={openAccel} 
        title={"Motor Overshoot"}
        unit={"Inch"}
    />
    <div class="note">Distance to overshoot when returning to home position</div>

    <KeyPadControl bind:num={GZ.adm.diag_inch} 
        on:open-keypad={openAccel} 
        title={"Diagnostic Move"}
        unit={"Inch"}
    />
    <div class="note">Distance to move (up or down) in diagnostic mode</div>

</div>

<style>
    .note {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 1.1em;
        margin-top: -1.0em;
    }

</style>