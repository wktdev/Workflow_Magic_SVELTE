



<style>

    h1{
        font-size: 1em;
    }
    .header {
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .header-title {
        margin: 0;
    }

    .markdown-editor {
        width: 100%;
        display: flex;
        align-items:flex-start;
        justify-content: space-evenly;
    }

    .markdown-editor__left-panel, .markdown-editor__right-panel {
        width: 85%;
        border: solid 1px black;
        height: 85vh;
    }

    .markdown-editor__right-panel {
        overflow: auto;
    }

    .markdown-editor__source {
        border: none;
        width: 100%;
        height: 100%;
    }

    .markdown-editor__source:focus {
        outline: none;
    }

    .markdown-editor__output {
        width: 100%;
        padding: 0 2em;
    }

    .footer {
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button{
        background-color: orange;
        outline-style: solid;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;

    }

    button:hover {
        outline-color: #666;
        background-color: #f4ee40;
    }



</style>



<script>
    import {onMount} from 'svelte';  
    import marked from 'marked';
    let source = '# Write markdown here';
    import {getClientById} from "../storageAPI/indexedDB";
    export let params = {};
    $: markdown = marked(source);

 
onMount(async ()=>{
   await getClientById(1).then((client)=>{
      console.log(client)
    });
})



</script>

<header class="header">
    <button>Edit This Workflow</button>
    
</header>

<div class="markdown-editor">
    <div class="markdown-editor__right-panel">
        <div class="markdown-editor__output">{@html markdown}</div>
    </div>
</div>


