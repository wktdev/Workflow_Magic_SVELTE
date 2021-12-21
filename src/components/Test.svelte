<script>
	export let color = `red`;
	export let width = `${40}rem`;
    export let top = `${400}px`;

</script>

<style>
	.box {
        top:var(--top);
        position:relative;
		background: var(--color);
		width: var(--width);
		margin: 1rem;
		padding: 0.4rem;
	}
</style>

<div class='box' style="--color:{color};--width:{width}; --top:{top}">
	<slot>Hello</slot>
</div>