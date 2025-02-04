<script>
    
    import {getContext, createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()

    import {RGBA, BASE} from '$lib/common/colors'

    import DiagnosticPanel from './DiagnosticPanel.svelte'
    import IOStatePanel from './IOStatePanel.svelte'
    import AdminSettings from './AdminSettings.svelte'

    import KeyPad from '$lib/common/key_pad/KeyPad.svelte'
    import KeyPadControl from '$lib/common/key_pad/KeyPadControl.svelte'
    import YesNoDialog from '$lib/common/dialog/YesNoDialog.svelte'
    import ButtonIcon from '$lib/common/button_icon/ButtonIcon.svelte'
    import img_edit from '$lib/assets/Edit.svg'
    import img_accept from '$lib/assets/Accept.svg'
    import img_cancel from '$lib/assets/Cancel.svg'
    import img_reset from '$lib/assets/Reset.svg'

    let GZ = $state(getContext('gizmo'))

    let settings = $state(false)
    let operations = $state(true)
    const toggle = () => {
        operations = !operations
        settings = !operations
    }

    let activeBtnBG = RGBA(BASE.AMBER, 0.1)
    let inactiveBtnBG = RGBA(BASE.AMBER, 0.0)
    let activeBtnBorder = RGBA(BASE.AMBER, 0.3)
    let inactiveBtnBorder = RGBA(BASE.AMBER, 0.0)

</script>


<div class="col container">
    <div class="tabs">

        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="tab-btn" style="
            background-color:{(operations ? activeBtnBG : inactiveBtnBG)};
            border-top: solid 0.05em {(operations ? activeBtnBorder : inactiveBtnBorder)};
            border-left: solid 0.05em {(operations ? activeBtnBorder : inactiveBtnBorder)};
            border-right: solid 0.05em {(operations ? activeBtnBorder : inactiveBtnBorder)};"
            onclick={toggle} onkeypress={toggle}>
            Manual
        </div>

        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="tab-btn" style="
            background-color:{(settings ? activeBtnBG : inactiveBtnBG)};
            border-top: solid 0.05em {(settings ? activeBtnBorder : inactiveBtnBorder)};
            border-left: solid 0.05em {(settings ? activeBtnBorder : inactiveBtnBorder)};
            border-right: solid 0.05em {(settings ? activeBtnBorder : inactiveBtnBorder)};"
            onclick={toggle} onkeypress={toggle}>
            Settings
        </div>
        
    </div>

    <!-- <div class="col content" style="
        border-top-left-radius: {(operations ? '0' : '0.5em')};
        border-top-right-radius: {(settings ? '0' : '0.5em')};
        "> -->
    <div class="col content" >
        {#if operations}
        <DiagnosticPanel />
        <IOStatePanel />
        {:else}
        <AdminSettings />
        {/if}
    </div>

</div>

<style>

    .container {
        gap: 0;
    }

    .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap:0;
    }

    .tab-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 1.5em;
        color: var(--ylw06);
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0.5em;
        border-bottom: solid 0.05em var(--drk);
        padding-bottom: 0.15em;
    }

    .content {
        border-top: solid 0.05em var(--ylw03);
        /* border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em; */
        padding: 0.5em 0;
        margin-top: -0.05em;
    }

</style>