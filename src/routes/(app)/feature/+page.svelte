<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import { storage } from '$lib/firebase'
	import type { StorageReference } from 'firebase/storage'
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

	let files: FileList

	async function upload_image(storage: StorageReference, image: Blob) {
		await uploadBytes(storage, image)
		return await getDownloadURL(storage)
	}

	const add: SubmitFunction = async ({ data }) => {
		const image = files[0]
		const image_ref = ref(storage, image.name)

		const url = await upload_image(image_ref, image)
		data.append('image_url', url)

		return async ({ update }) => {
			await update()
		}
	}
</script>

<div class="flex flex-1 justify-center overflow-hidden bg-base-200">
	<div class="my-auto flex-row-reverse">
		<div class="w-full bg-base-100 p-12">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<form method="POST" action="?/feature" use:enhance={add}>
				<div class="grid grid-cols-1 gap-1">
					<label class="label">
						<span class="label-text">Image</span>
					</label>

					<input
						bind:files
						type="file"
						class="file-input-bordered file-input w-full max-w-xs focus:outline-none"
					/>
					<button type="submit" class="btn-primary btn my-4">Add</button>
				</div>
			</form>
		</div>
	</div>
</div>
