<script>
    
    import {getContext} from 'svelte'
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_start from '$lib/assets/Start.svg'

    let GZ = $state(getContext('gizmo'))

    let showStartButton = $state(false)
    const validateConfig = () => {showStartButton = GZ.cfg.validate()}
    
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
    <KeyPadControl bind:num={GZ.cfg.cycles} isInteger={true} unit={"Qty"}
        title={"# of Drops"}
        enabled={true}
        on:validate={validateConfig}
    />

    <KeyPadControl bind:num={GZ.cfg.height} unit={"Inch"}
        title={"Drop Height"}
        enabled={true}
        on:validate={validateConfig}
    />

</div>

<style>


</style>