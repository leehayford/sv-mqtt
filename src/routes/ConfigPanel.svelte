<script>
    
    import {getContext} from 'svelte'
    
    import {RGBA, BASE} from '$lib/common/colors'
    
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_start from '$lib/assets/Start.svg'

    let GZ = $state(getContext('gizmo'))


</script>

<div class="col">
    <div class="row sec-hdr">
        <h3>Configuration:</h3>
        
        <div class="row conf-btns">
            {#if    GZ.cfg.cycles > 0
            &&      GZ.cfg.height > 0
            &&      GZ.cfg.height < GZ.adm.mot_inch_max
            }
            <ButtonIcon func={GZ.mqttCMDConfig} img={img_start} color={RGBA(BASE.SEAFOAM, 0.7)} />
            {/if}
        </div>

    </div>
    <KeyPadControl bind:num={GZ.cfg.cycles} isInteger={true} unit={"Qty"}
        title={"# of Drops"}
        enabled={true}
    />

    <KeyPadControl bind:num={GZ.cfg.height} unit={"Inch"}
        title={"Drop Height"}
        enabled={true}
    />

</div>

<style>


</style>