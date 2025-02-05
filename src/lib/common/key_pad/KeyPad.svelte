<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'

    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import KeyPadButton from '$lib/common/key_pad/KeyPadButton.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let { 
        num = $bindable(0.0),
        isInteger = $bindable(false),
        unit = $bindable("UNIT"),
        title = $bindable("TITLE"),
        note = $bindable(""),

        showKeyPad = $bindable(false), 
        max = Number.POSITIVE_INFINITY,
        min = 0,

    } = $props()

    let dialog = $state()

    let numStr = $state("")

    let original = $state(Number.NEGATIVE_INFINITY)

    $effect(() => {
        if(showKeyPad) {
            numStr = num.toString()
            dialog.showModal()
            if( original === Number.NEGATIVE_INFINITY) original = num
        }
    })

    
    const updateStr = (value) => {
        // make sure we have the right value
        if( numStr.length === 0) numStr = num.toString()

        if( value === "back"
        &&  numStr.length > 0
        ) { 
            numStr = numStr.slice(0, -1)
            return
        }

        // make sure there is only one decimal for floats or none for integers
        if( value === "." ) {
            if( (numStr.length > 0 &&  numStr.includes(".", 0))
            || isInteger
            ) return
        }    

        numStr += value.toString() 
        
        // remove leading zero unless there is a decimal
        if( numStr[0] === "0"
        &&  numStr[1] !== "."
        )   numStr = numStr.substring(1)
     
    }

    const updateNum = () => {
        num = Number(numStr)
        if( num > max 
        ) {
            num = max
            numStr = num.toString()
        }

        if( num < min 
        ) {
            num = min
            numStr = num.toString()
        }
    }

    const handleKeyHit = (e) => {
        updateStr(e.detail) // console.log("numStr: ", numStr)
        updateNum() // console.log("num: ", num)
    }
    
    const clear = () => {
        num = 0
        numStr = "0"
    }

    const closeDialog = () => {
        showKeyPad = false
        dialog.close()
    }

    const cancel = () => {
        num = original
        numStr = num.toString()
        closeDialog()
    }

    const confirm = () => { 
        dispatch("validate") 
        closeDialog()
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog 
    bind:this={dialog}
    onclose={() => (showKeyPad = false)}
	onclick={(e) => { if (e.target === dialog) confirm() }}
>
    <div class="hdr">
        <div class="title">{title}</div>
        
        <div class="btns">
            <ButtonIcon func={cancel} img={img_cancel} color={RGBA(BASE.RED, 0.7)} />
            <ButtonIcon func={confirm} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
        </div>
    </div>    

    {#if note !== ""}
    <div class="note">{note}</div>
    {/if}

    <div class="unit-hdr">
        <br>
        <div class="unit-icon">{unit}</div>
    </div>
    <div class="control">
        <ButtonIcon func={clear} color={RGBA(BASE.AQUA, 0.7)} />
        <div class="num">{numStr}</div>
    </div>
    <br>
    <div class="btn-grid">
        <KeyPadButton value={1} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={2} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={3} on:key-hit={(e) => {handleKeyHit(e)}}/>
        
        <KeyPadButton value={4} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={5} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={6} on:key-hit={(e) => {handleKeyHit(e)}}/>
        
        <KeyPadButton value={7} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={8} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={9} on:key-hit={(e) => {handleKeyHit(e)}}/>
        
        <KeyPadButton value={"back"} on:key-hit={(e) => { handleKeyHit(e)}}/>
        <KeyPadButton value={0} on:key-hit={(e) => {handleKeyHit(e)}}/>
        <KeyPadButton value={"."} on:key-hit={(e) => {handleKeyHit(e)}}/>

    </div>  

</dialog>

<style>

    

    .hdr {
        display: grid;
        grid-template-columns: 1fr 5em;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1.5em;
    }

    .title {
        font-size: 2.1em; 
        font-weight: 300;
        color: var(--ylw07);
    }

    .note {
        color: var(--gry07);
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: 1.2em;
        padding: 0 1.5em 1.5em 1.5em;
    }

    .control {
        display: grid;
        grid-template-columns: 1fr 19.5em 1fr;
        border-bottom: solid 0.05em var(--lit01);
        align-items: center;
        padding: 0.5em 0;
        gap: 0.75em;
    }

    .unit-hdr {
        display: grid;
        grid-template-columns: 1fr 19.5em 1fr;
        align-items: center;
        padding-top: 0.5em;
    }


    .unit-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: var(--ylw02);
        color: var(--ylw06);
        border-radius: 0.8em;
        border: solid 0.05em var(--ylw04);
        font-size: 1.25em;
    }

    .num {
        font-size: 1.7em; 
        font-weight: 300;
        color: var(--ylw07);
        background-color: var(--aqu005);
        border-top: solid 0.05em transparent;
        border-left: solid 0.05em transparent;
        border-right: solid 0.05em var(--lit01);
        border-bottom: solid 0.05em var(--lit01);
        border-radius: 0.15em;
        padding: 0 0.5em;
        min-width: 6.5em;
    }

    .btn-grid {
        display: grid;
        grid-template-columns: 6em 6em 6em;
        grid-template-rows: 6em 6em 6em 6em;
        justify-content: center;
        width:auto;
        gap: 0.75em;
    }

    .btns {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 1em;
        gap: 0.75em;
    }

</style>