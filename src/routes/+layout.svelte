<script>
    
    import {setContext, getContext, onMount, onDestroy} from 'svelte'

    import '../css/app.css'
    import '../css/color.css'
    import '../css/layout.css'

    import AlertModal from '$lib/common/modal/AlertModal.svelte'

    import {GZ} from '$lib/models/machine.svelte'

    setContext('gizmo', GZ)

    onMount(async() => {
        window.onclose = async() => {
            await GZ.mqttDisconnect();
        }
    })

</script>


<div class="main">
    
    <AlertModal />

    <div class="col layout"><slot/></div>

</div>

<style>
    .main {
        display: grid;
        overflow: hidden;
        grid-template-columns: 1fr;
        grid-template-rows:  auto  1fr;
        background-color: var(--drk);
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        color: var(--grey);
        height: 100vh;
        gap:  0em;
    }

    .layout {
        background-color: transparent;
        overflow: hidden;
        padding: 0.75em;
        height: 100%;
    }
</style>