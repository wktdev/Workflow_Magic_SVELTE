

## SearchAndCreateField

Purpose: 

1. To let a user search an item in a list. 

2. To let a user add a new text-items to the list by typing a new text-item into the form field, pressing ENTER on their keyboard, and the result is the text-item appearing in the list.

3. Using the up and down arrows a user selects a text-item in the list and when the user presses the ENTER key the browser redirects to an endpoint containing the text-items ID.


## Working Example (Copy & Paste Friendly)

```
let textItems = [{title:"some item", id:0},{title:"another item", id:1},{title:"again, item", id:2}]

function submitToList(newTextItem){
	textItems = [...textItems, newTextItem]
}

function goToRoute(id){
         router.redirect("/client/"+id+"/dashboard")
}



<SearchAndCreateField 
     <SearchAndCreateField 
     arrayOfObjects = {clients} 
     keyToRender="name"           
     onSubmit = {submitToDatabase}     
     onSelectionEvent = {goToRoute}    

        
 />

```

### Description of behavior:

When the page loads the form field defaults to being in focus.

When the user clicks the up/down arrows, a text-item is selected in the list. THe selection is signified via a CSS background color change being applied to the the text-item.

When a user hits the ENTER key while a list item is selected, the browser redirects to an endpoint with the items ID.

When the user types a new item into the form it appears in the list to the user.

When the user types into the form field the component searches and displays the related items.In other words, an "instant search" is applied to the list and only items that match the search appear. When the user scrolls using the up/down arrows the instant search should still work regardless of how many items are displayed on the page. 



## How the Component Works & Function Descriptions.


### Developer API

The component has four poperties (properties are the equivilent of function arguments for SVELTE components).

#### Properties & Description

##### ArrayOfObjects

An array of object literals with this structure:

```
let textItems = [{title:"some item", id:0},{title:"another item", id:1},{title:"again, item", id:2}]

```
##### keyToRender

This is the key in your object(s) that stores the data to be rendered as a list to the browser.

##### onSelectionEvent
When a user clicks an item in the list the onSelectionEvent function is invoked. You can use this to invoke any event that you want. In Workflow magic it is used to create a redirect


###### onSubmit

This function is invoked when a user submits an item to the form field.
The intent of this function is that it wraps code used to send the data to a database or other collection.

```

<SearchAndCreateField 
     arrayOfObjects = {textItems} 
     keyToRender="title"           
     onSelectionEvent={callback}  
     onSubmit = {submitToList}             
 />

```




### Component internals


When the page loads the form field is set to focus

```
onMount(function() {
        inputTextField.focus();

});

```




