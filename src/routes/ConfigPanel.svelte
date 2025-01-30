<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_start from '$lib/assets/Start.svg'

    let GZ = $state(getContext('gizmo'))
    const openQTYKeyPadModal = () => { dispatch("open_qty_keypad") }
    const openHeightKeyPadModal = () => { dispatch("open_height_keypad") }
    
    let {
        showStartButton = $bindable(false)
    } = $props()
    
</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Configuration:</h3>
        
        <div class="row conf-btns">
            {#if showStartButton}
            <ButtonIcon func={GZ.mqttCMDConfig} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {/if}
        </div>

    </div>
    <KeyPadControl bind:num={GZ.cfg.cycles} isInteger={true}
        on:open-keypad={openQTYKeyPadModal} 
        title={"# of Drops"}
        unit={"QTY"}
    />

    <KeyPadControl bind:num={GZ.cfg.height} 
        on:open-keypad={openHeightKeyPadModal} 
        title={"Drop Height"}
        unit={"INCH"}
    />

</div>

<style>


</style>