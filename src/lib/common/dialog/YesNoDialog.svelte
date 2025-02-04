<script>

    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'

    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'

    let {
        
        title = $bindable("TITLE"),
        prompt = $bindable(""),
        showDialog = $bindable(false), 

    } = $props()

    let dialog = $state()

    $effect(() => { if(showDialog) dialog.showModal() })

    const closeDialog = () => {
        showDialog = false
        dialog.close()
    }

    const confirm = () => {
        console.log("yes / no dialog -> confirm...")
        dispatch("confirim")
        closeDialog()
    }

    const cancel = () => {
        console.log("yes / no dialog -> cancel...")
        dispatch("cancel")
        closeDialog()
    }

    let color = $state(BASE.AMBER)
    let bgColor = $derived(RGBA(color, 0.14))
    let borderColor = $derived(RGBA(color, 0.3))
    let titleColor = RGBA(BASE.LIGHT, 0.6)
    let textColor = RGBA(BASE.AMBER, 0.7)

</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog class="modal"
    bind:this={dialog}
    onclose={() => (showDialog = false)}
    onclick={(e) => { if (e.target === dialog) confirm() }}
>
    
    <div class="backdrop"></div>
    
    <div class="col-panel left container" style="
        background-color:rgb(0, 0, 23, 1);
        border-color:{borderColor};">

        <div class="col-panel-header left hdr" style="
            background-color:{bgColor};
            border-color:{borderColor};">
            
            <h3 class="title" style="color:{titleColor};">{title}</h3>
        
        </div>
                
        <div class="col-panel-content content">
            <div class="row msg" style="
                background-color:{bgColor};
                color:{textColor};">
                
                <p style="color:{textColor};">
                {prompt}
            </p>

            </div>
        </div>

        <div class="row btns">
            <ButtonIcon img={img_cancel} func={cancel} color={RGBA(BASE.RED, 0.7)} />
            <ButtonIcon img={img_accept} func={confirm} color={RGBA(BASE.SEAFOAM, 0.7)} />
        </div>

    </div>

</dialog>


<style>

.hdr { padding: 0 1.5em; }
.container {
    align-items: center;
    justify-content: center;
    height: auto;
    min-width: 30em;
    max-width: 30em;
    opacity: 1;
    gap: 0.5em;
    z-index: 11;
}
.title {
    font-size: 1.7em;
    font-weight: 300; 
    padding: 0;
}
.content {
    padding: 0.5em 1.5em;
    width: 100%;
}
.msg { 
    justify-content: center;
    text-align: center;
    border-radius: 0.25em;
    font-size: 1.2em;
    padding: 1em;
}
.msg p {
    font-size: 1.5em;
    font-weight: 300;
}
.btns {
    justify-content: flex-end;
    padding: 0 2em;
}

</style>