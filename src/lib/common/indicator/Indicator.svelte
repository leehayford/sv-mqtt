<script>

    import {BASE, RGBA} from '../colors'
    import img_led from '../../assets/LED.svg'
    
    let {
        type = "TYPE",
        name = "NAME",
        colorClear = RGBA(BASE.LIGHT, 0.05),
        colorAlarm = RGBA(BASE.RED, 0.7),
        lblClear = $bindable(""),
        lblAlarm = $bindable(""),
        alarm = $bindable(false),
        io = $bindable(false),
        ioOff = RGBA(BASE.LIGHT, 0.05),
        ioOn = RGBA(BASE.AMBER, 0.7),
        op = $bindable(false),
        opOff = RGBA(BASE.LIGHT, 0.05),
        opOn = RGBA(BASE.SEAFOAM, 0.7),
        lblOpOn = $bindable(""),
        lblOpOff = $bindable(""),
    } = $props()

    let bgColor = $state(alarm ? colorAlarm : colorClear)
    let lblColor = $state(alarm ? colorAlarm : colorClear)
    let lblText = $state(alarm ? lblAlarm : lblClear)
    let img = img_led

</script>

<div class="content" style="">

    <!-- <div class="row lbl" style="color:{RGBA(BASE.GREY, 0.5)};">{type}</div> -->
    <div class="row lbl" style="color:{RGBA(BASE.LIGHT, 0.7)};">{name}</div>

    <div class="icon" 
        style="
        background-image: url({img});
        background-color:{(io ? ioOn : ioOff)};">
    </div>
    <div class="icon" 
        style="
        background-image: url({img});
        background-color:{(op ? opOn : opOff)};">
    </div>

    <div style="color:{(op ? opOn : opOff)};">

        {(op ? lblOpOn : lblOpOff)}

    </div>
</div>



<style>

    .content {
        display: grid;
        /* grid-template-columns: 5em 10em var(--ctrl-h-m) 1fr; */
        grid-template-columns: 5em var(--ctrl-h-m) var(--ctrl-h-m) 1fr;
        align-items: center;
        min-height: var(--ctrl-h-m);
        max-height: var(--ctrl-h-m);
        width:100%;
        padding:0 0.5em;
        gap:0.75em;
    }
    
    .lbl {
        justify-content: flex-end;
        align-items: center;
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