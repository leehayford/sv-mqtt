<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'

    import InputNum from '$lib/common/input_num/InputNum.svelte'
    import KeyPadButton from './KeyPadButton.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_accept from '$lib/assets/Accept.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let { 
        showKeyPad = $bindable(), 
        num = $bindable(),
        isInteger = false,
        max = Number.POSITIVE_INFINITY,
        min = 0,
        title = "some title"

    } = $props()

    let dialog = $state()

    let numStr = $state("")

    $effect(() => {
        if(showKeyPad) {
            numStr = num.toString()
            dialog.showModal()
        }
    })

    const clear = () => {
        num = 0
        numStr = "0"
    }

    const confirm = () => { 
        showKeyPad = false
        dispatch("validate")
        dialog.close() 
    }
    
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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog style="padding: 1em;"
    bind:this={dialog}
    onclose={() => (showKeyPad = false)}
	onclick={(e) => { if (e.target === dialog) confirm() }}
>
    <div class="title">{title}</div>    

    <div class="num">
        <ButtonIcon func={clear} img={img_reset} color={RGBA(BASE.AQUA, 0.7)} />
        <!-- <InputNum width="100%" enabled={false} bind:num/>  -->
        <div class="conf-value">{numStr}</div>
        <ButtonIcon func={confirm} img={img_accept} color={RGBA(BASE.SEAFOAM, 0.7)} />
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

    .title {
        font-size: 2.5em; 
        font-weight: 300;
        color: var(--aqu07);
        padding-bottom: 0.25em;
    }

    .num {
        display: grid;
        grid-template-columns: 3em 1fr 3em;
        border-bottom: solid 0.05em var(--lit01);
        padding-bottom: 0.5em;
        align-items: center;
        gap: 0.75em;
    }

    .conf-value {
        font-size: 1.7em; 
        font-weight: 300;
        color: var(--aqu07);
        background-color: var(--aqu01);
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
        padding: 0 3em;
        gap: 0.75em;
    }

</style>