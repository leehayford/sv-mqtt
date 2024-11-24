<script>
    
    import '../css/app.css'
    import '../css/color.css'
    import '../css/layout.css'

    import AlertModal from '$lib/common/modal/AlertModal.svelte'

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
        /* background-color: rgb(18, 218, 110, 0.035); */
        background-color: transparent;
        overflow: hidden;
        padding: 0.75em;
        height: 100%;
    }
</style>