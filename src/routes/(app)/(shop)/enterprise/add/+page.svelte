<script lang="ts">
    import { enhance, type SubmitFunction } from '$app/forms'
    import Alert from '$lib/components/Alert.svelte'
    import { storage } from '$lib/firebase'
    import { loading } from '$lib/stores/observer'
    import type { StorageReference } from 'firebase/storage'
    import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
    import type { ActionData } from './$types'

    let files: FileList

    async function upload_image(storage: StorageReference, image: Blob) {
        await uploadBytes(storage, image)
        return await getDownloadURL(storage)
    }

    const add_product: SubmitFunction = async ({ data }) => {
        $loading = true
        const image = files[0]

        const image_ref = ref(storage, image.name)
        const url = await upload_image(image_ref, image)
        data.append('image_url', url)

        return async ({ update }) => {
            await update()
            $loading = false
        }
    }
    export let form: ActionData
</script>

<div class="flex flex-1 justify-center bg-base-200">
    <div class="my-auto flex-row-reverse">
        <div class="w-full bg-base-100 px-12 py-8">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <form method="POST" action="?/add_product" use:enhance={add_product}>
                <div class="grid grid-cols-1 gap-1">
                    <h1 class="mb-4 text-center text-2xl">Add Product</h1>

                    <label class="label">
                        <span class="label-text">Brand</span>
                    </label>

                    <input
                        name="brand"
                        type="text"
                        placeholder="Brand"
                        class="input-bordered input focus:outline-none"
                    />
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Product"
                        class="input-bordered input focus:outline-none"
                    />
                    <label class="label">
                        <span class="label-text">Category</span>
                    </label>
                    <input
                        name="category"
                        type="text"
                        placeholder="Category"
                        class="input-bordered input focus:outline-none"
                    />
                    <label class="label">
                        <span class="label-text">Price</span>
                    </label>
                    <input
                        name="price"
                        type="text"
                        placeholder="₹5.00"
                        class="input-bordered input focus:outline-none"
                    />
                    <label class="label">
                        <span class="label-text">Image</span>
                    </label>

                    <input
                        bind:files
                        type="file"
                        class="file-input-bordered file-input w-full max-w-xs focus:outline-none"
                    />
                    <button type="submit" class="btn-primary btn my-4">Add</button>
                    {#if form?.credentials}
                        <Alert />
                    {/if}
                </div>
            </form>
        </div>
    </div>
</div>
