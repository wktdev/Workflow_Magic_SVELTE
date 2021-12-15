<script>
	import marked from 'marked';
	
	let rawData = '';
	let preview = false;
	
	function togglePreview() {
		preview = !preview;
	}
</script>

<main class='main-container' on:dblclick={togglePreview}>

	{#if preview}
		<div>
			{@html marked(rawData)}

		</div>
			<button class='show-btn' on:click={togglePreview}>
			 Show Preview
			</button>
	{:else}
		<form class='form'>
			<textarea type='text' bind:value={rawData} class='markdown-input' placeholder='Enter your markdown content here...'/>
			<button class='show-btn' on:click={togglePreview}>
			 Show Preview
			</button>
	</form>
	{/if}
</main>


<style>
	.main-container {
		display: flex;
		flex-direction: column;
		padding: 1rem 0.6rem;
		margin: 0;
		height: 100%;
		width: 100%;
	}
	
.form {
		height: 100%;
		width: 95%;
}
	
	.markdown-input {
		width: 100%;
		height: 90%;
		border: unset;
		border: 1px solid #9c9a9a;
		padding: 0.8rem 1rem;
		border-radius: 10px;
		background: transparent;
	}
	
	.markdown-input::placeholder {
		font-size: 1.2rem;
		font-weight: 100;
		font-family: sans-serif;
		letter-spacing: 1px;
	}
	
	.markdown-input:focus {
		outline: unset;
	}
	
	.show-btn {
		width: 100%;
		padding: 0.6rem 1.5rem;
		background: transparent;
		font-weight: 300;
		font-size: 1.5rem;
		border-radius: 10px;
		border: 1px solid #9c9a9a;
	}

</style>