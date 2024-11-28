<script>
    
    import {BASE, RGBA} from '../colors'
    import img_led from '../../assets/LED.svg'
    import {compileModule} from 'svelte/compiler';

    let {
        name = "name",
        colorClear = RGBA(BASE.LIGHT, 0.5),
        colorAlarm = RGBA(BASE.RED, 0.7),
        lblClear = "alarm clear label not set",
        lblAlarm = "alarm lable not set",
        alarm = $bindable(false),
    } = $props()

    let bgColor = $state(alarm ? colorAlarm : colorClear)
    let lblColor = $state(alarm ? colorAlarm : colorClear)
    let lblText = $state(alarm ? lblAlarm : lblClear)
    let img = img_led

    // $effect(() => {console.log("alarm:", alarm)})

</script>

<div class="content">

    <div class="row name">{name}</div>

    <div class="icon" 
        style="
        background-image: url({img});
        background-color:{(alarm ? colorAlarm : colorClear)};">
    </div>

    <div style="color:{(alarm ? colorAlarm : colorClear)};">

        {(alarm ? lblAlarm : lblClear)}

    </div>

</div>

<style>

    .content {
        display: grid;
        grid-template-columns: 5em var(--ctrl-h-m) 1fr;
        align-items: center;
        min-height: var(--ctrl-h-m);
        max-height: var(--ctrl-h-m);
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }

    .name {
        justify-content: flex-end;
        align-items: center;
        /* font-size: 1.25em; */
    }

    .icon {
        background-size:cover;
        border-radius: 50%;
        clear:both;
        max-width: var(--ctrl-h-s);
        min-width: var(--ctrl-h-s);
        width: var(--ctrl-h-s);
        max-height: var(--ctrl-h-s);
        max-height: var(--ctrl-h-s);
        height: var(--ctrl-h-s);
    }


</style>