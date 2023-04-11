<script lang="ts">
    import 'iconify-icon'
    import '../app.css'

    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'
    import { navigating } from '$app/stores'
    import Alert from '$lib/components/Alert.svelte'
    import { messaging } from '$lib/firebase'
    import { alert, loading } from '$lib/stores/observer'
    import { onMessage } from 'firebase/messaging'
    import { onMount } from 'svelte'
    import { pwaInfo } from 'virtual:pwa-info'
    /* global __DATE__ */
    // @ts-expect-error defined @ build
    let build_date = __DATE__

    if (browser) {
        const channel = new BroadcastChannel('notification-click')

        // Foreground Notification
        onMessage(messaging, (payload) => {
            console.log(payload)
            $alert = {
                action: true,
                duration: 2000,
                message: payload.notification?.body as string,
                show: true,
                status: 'success',

                options: {
                    url: payload.data?.url as string,
                    text: 'Go',
                    fxn: function () {
                        goto($alert.options?.url as string)
                    }
                }
            }
        })

        // Background Notification
        channel.addEventListener('message', function (event) {
            console.log(event.data)
            goto(event.data)
        })
    }

    onMount(async () => {
        if (pwaInfo) {
            const { registerSW } = await import('virtual:pwa-register')

            console.info(build_date)

            registerSW({
                immediate: true
            })
        }
    })

    $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''

    $: $loading = $navigating ? true : false

    // async function test() {
    // 	$alert = {
    // 		message: 'payload.notification?.body as string',
    // 		show: true,
    // 		status: 'success',
    // 		duration: 2500,
    // 		action: true,
    // 		options: {
    // 			url: '/orders',
    // 			text: 'Go',
    // 			fxn: async function () {
    // 				goto($alert.options?.url as string)
    // 			}
    // 		}
    // 	}
    // }
</script>

<svelte:head>
    {@html webManifest}
</svelte:head>

<div class="relative">
    <!-- <input type="checkbox" bind:checked={$loading} /> -->
    {#if $alert.show}
        <Alert />
    {/if}
    
    {#if $loading}
        <div class="absolute z-50 h-full w-full ">
            <iconify-icon
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                width="96"
                icon="eos-icons:bubble-loading"
            />
        </div>
    {/if}

    <div class:opacity-50={$loading}>
        <slot />
    </div>
</div>
