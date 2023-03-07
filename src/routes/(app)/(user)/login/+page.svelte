<script lang="ts">
    import { applyAction, enhance, type SubmitFunction } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import { input_validation, paste_validation } from '$lib/validate'
    import type { ActionData } from './$types'

    let state = { pin: false }

    export const form_validation: SubmitFunction = async ({ form }) => {
        return async ({ result, update }) => {
            if (result.type === 'success') {
                form.reset()
            }
            if (result.type === 'failure') {
                await applyAction(result)
            }
            await update()
        }
    }

    export let form: ActionData
</script>

<div class="flex flex-1 justify-center bg-base-200">
    <div class="my-auto flex-row-reverse">
        <div class="w-full bg-base-100 p-12">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <form method="POST" action="?/login" use:enhance>
                <div class="grid grid-cols-1 gap-1">
                    <h1 class="mb-4 text-center text-2xl">Login</h1>
                    <label class="label">
                        <span class="label-text">Phone Number</span>
                    </label>

                    <div class="indicator ">
                        <label class="input-group">
                            <span class="p-2">+91</span>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                inputmode="numeric"
                                on:keypress={input_validation}
                                on:keyup={input_validation}
                                on:paste|preventDefault={paste_validation}
                                placeholder="10 - Digits"
                                class="peer input-bordered input focus:outline-none"
                            />
                            <span
                                class="badge indicator-item hidden translate-x-0 peer-data-[phone-error]:inline-flex"
                                >Required</span
                            >
                        </label>
                    </div>

                    <label class="label">
                        <span class="label-text">Passcode</span>
                    </label>
                    <div class="indicator ">
                        <div class="input-group">
                            <input
                                name="pin"
                                type={state.pin ? 'text' : 'password'}
                                inputmode="numeric"
                                on:keypress={input_validation}
                                on:keyup={input_validation}
                                on:paste|preventDefault={paste_validation}
                                placeholder="xxxx"
                                class="peer input-bordered input focus:outline-none"
                            />
                            <span
                                class="badge indicator-item pointer-events-none hidden translate-x-0 peer-data-[pin-error]:inline-flex"
                                >Required</span
                            >
                            <button
                                type="button"
                                class="btn-square btn flex-shrink"
                                on:click={() => (state.pin = !state.pin)}
                            >
                                <iconify-icon
                                    icon="ph:{state.pin ? 'eye-slash-duotone' : 'eye-duotone'}"
                                    width="24"
                                    height="24"
                                />
                            </button>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary btn my-4">Login</button>
                    {#if form?.credentials}
                        <Alert />
                    {/if}
                </div>
            </form>
        </div>
    </div>
</div>
