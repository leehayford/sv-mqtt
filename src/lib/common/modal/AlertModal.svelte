<script module> const modalList = []; </script>

<script>

    import {ALERT, ALERT_CODE, ALERT_CODES, openModals, debug} from '../../utils'
    import {RGBA, BASE} from "../colors"

    import ButtonIcon from '../button_icon/ButtonIcon.svelte'
    import img_accept from '../../assets/Accept.svg'

    const store = openModals(false)

    let isOpen = store.isOpen
    export const open = store.open
    export const close = store.close

    const keyDown = (e) => {
        e.stopPropagation()
        clearAlert()
    }

    const transitioned = (e) => {
        const node = e.target
        node.focus()
    }

    const modalAction = (node) => {
        const returnFuncs = []
        if (document.body.style.overflow !== 'hidden') {
            const original = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            returnFuncs.push(() => {document.body.style.overflow = original})
        }
        node.addEventListener('keydown', keyDown)
        node.addEventListener('transitioned', transitioned)
        
        modalList.push(node)
        returnFuncs.push(() =>{
            node.removeEventListener('keydown', keyDown)
            node.removeEventListener('transitioned', transitioned)
            modalList.pop( )
        })

        return {
            destroy: () => returnFuncs.forEach((fn) => fn()),
        }
    }

    let alertIntervalID = null
    const showAlert = (alertTimeout) => {
        open()
        alertIntervalID = setInterval(clearAlert, alertTimeout)
    }

    const clearAlert = () => {
        if (alertIntervalID !== null) {
            clearInterval(alertIntervalID)
            alertIntervalID = null
        }

        ALERT_CODE.set(0)
        ALERT.set("")
        close()
    }

    let title = $state("")
    let color = $state(BASE.BLUE)
    let colorText =  RGBA(BASE.LIGHT, 0.8)
    let colorTitleText = RGBA(BASE.LIGHT, 0.6)
    let colorBorder = $derived(RGBA(color, 0.2))
    let colorBackround = $derived(RGBA(color, 0.2))
    let colorHdrBackround = $derived(RGBA(color, 0.13))
    $effect(() => {
        if ($ALERT !== "") {
            switch($ALERT_CODE) {
                case ALERT_CODES.SUCCESS:
                    title = "SUCCESS"
                    color = BASE.SEAFOAM
                    showAlert(3000)
                    break
                case ALERT_CODES.WARNING:
                    title = "WARNING"
                    color = BASE.ORANGE
                    showAlert(5000)
                    break
                case ALERT_CODES.ERROR:
                    title = "ERROR"
                    color = BASE.RED
                    open()
                    break
            }
        }
    } )

    </script>

    {#if $isOpen}

    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="modal" use:modalAction tabindex='-1'>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="backdrop"></div>

        <div class="col-panel left container" 
            style="background-color:rgb(0, 0, 23, 1);border-color:{colorBorder};"
            >
            
            <div class="col-panel-header left hdr" 
                style="background-color:{colorHdrBackround};border-color:{colorBorder};"
                >
                <h3 class="title" style="color:{colorTitleText};">{title}</h3>
            </div>
            
            <div class="col-panel-content content">

                <div class="row msg" 
                    style="background-color:{colorBackround};color:{colorText};"
                    >
                    <p>{ $ALERT }</p>
                </div>
                
                <div class="row btns">
                    OK
                    <ButtonIcon img={img_accept} func={clearAlert} color={RGBA(color, 0.7)} />
                </div>

            </div>
            
        </div>

    </div>
    { /if }

    <style>
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            padding: 1em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            opacity: 1;
            z-index: 3;
        }
        div.backdrop {
            background-color: var(--drk);
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 4;
            opacity: 0.85;
        }
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
        .content {
            padding: 0.5em 1.5em;
            width: 100%;
        }
        .title {
            font-size: 1.5em;
            font-weight: 300; 
            padding: 0;
        }
        .msg { 
            justify-content: center;
            text-align: center;
            border-radius: 0.25em;
            font-size: 1.2em;
            padding: 1em;
        }
        .btns {
            justify-content: flex-end;
            align-items: center;
            gap: 0.75em;
        }
    </style>