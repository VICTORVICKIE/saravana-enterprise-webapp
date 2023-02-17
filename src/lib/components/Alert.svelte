<script lang="ts">
	export let content: string
</script>

<div class="alert justify-center shadow-md shadow-neutral">
	<div>
		<iconify-icon icon="ph:warning-duotone" class="text-warning" width="24" height="24" />
		<span>{content}</span>
	</div>
</div>
