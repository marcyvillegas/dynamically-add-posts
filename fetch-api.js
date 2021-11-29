
/* Declare Variables for the containers where the output will be appended */
const accordionContainer = document.querySelector(".main-accordion-container"); // Whole accordion Container
const tableContainer = document.querySelector(".main-table-container");         // Whole table Row Container

/* Declare variable for the outputs */
let postOutputAccordion = ""; // Output for the Accordion 
let postOutputTable = ""; // Output for the Table Row
let idNum = 0;           // ID number for every Accordion Button and Post Number

/* Declare variable for the createing a post form */
const postTitleForm = document.querySelector(".form-title"); // Post Title field
const postContentForm = document.querySelector(".form-content"); // Post Content field
const submitButton = document.querySelector(".submit-button"); // Submit button form

/* Declare varaible for the edit modal form */
const editFormModal = document.querySelector(".edit-form-modal"); // Edit Modal form
const editedTitle = document.querySelector(".edited-title");      // Edited Post Title field
const editedBody = document.querySelector(".edited-body");        // Edited Post Body field
const editedSumbitButton = document.querySelector(".save-edit");  // Save Edit button



/* Function that checks if the input fields is empty */
const isEmpty = (str) => {
    return !str.trim().length;
}

/* Function that toggles an element */
const toggleMenu = (element) => {

    element.addEventListener("click", (e) => {

        let menuBox = document.getElementById(`${e.target.children[0].id}`); // getting the id of the 1st child element (div menu box) of the clicked element which is the three dot icon
        //console.log(e.target.children);

        if (menuBox.style.display === "none") {  // logic for the displaying and hiding the menu box
            menuBox.style.display = "block";
        } else {
            menuBox.style.display = "none";
        }
    });
}

/* Function that adds HTML Elements */
const renderPost = (data) => {

    // Adding HTML Elements and assigning data values for each data in the API 
    data.forEach((post) => {

        // Incrementing the Accorion ID and Post Number 
        idNum += 1;

        // Accordion HTML Element
        postOutputAccordion += `
            <div class="accordion-bg bg-white mb-3 d-lg-none">
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">

                    <!-- Post Number, Edit and Delete Function -->
                    <div class="d-flex justify-content-between">
                        <p class="postNum mt-2">Post Number# ${idNum}</p>
                        <div class="d-flex mb-2" data-id=${post.id}>
                            <h3 class="mt-1"><i class="bi bi-three-dots position-relative three-dot-icon-mobile px-2" id="three-dot-icon-${idNum}" style="cursor: pointer;">
                                    <div class="menu-box fs-5 position-absolute bg-white p-2 pb-0"
                                        style="z-index: 1; border: 1px solid; border-radius: 0.6rem; right: 0;"
                                        id="menu-box-${idNum}">
                                        <p class="edit-button" id="editButtonAccordion"
                                            style="font-size: 1rem; font-style: normal; cursor: pointer;">Edit
                                        </p>
                                        <p class="delete-button" id="deleteButton"
                                            style="font-size: 1rem; font-style: normal; cursor: pointer;">Delete
                                        </p>
                                    </div>
                                </i>
                            </h3>
                        </div>
                    </div>
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapse-${idNum}" aria-expanded="false"
                            aria-controls="flush-collapseOne" id="button-title" style="border: 1px solid">
                            View Post
                        </button>
                    </h2>

                    <!-- Contents inside the accordion -->
                    <div id="flush-collapse-${idNum}" class="accordion-collapse collapse accordion-contents"
                        aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <p class="mt-3 fw-bold">Title: <span class="accordion-post-title" id="post-title-accordion"
                                    style="font-weight: normal;">${post.title}</span></p>
                            <p class="mt-3 mb-0 fw-bold">Content: <span class="accordion-post-body" id="post-body-accordion"
                                    style="font-weight: normal;">${post.body}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;

        // Table Row HTML Element
        postOutputTable += `
            <!-- Contents inside the table row -->
            <tr class="table-row-container table-contents">
            <td class="date-text text-center">${idNum}</td>
            <td class="title-text table-post-title" id="post-title">${post.title}</td>
            <td class="content-text table-post-body" id="post-body">${post.body}</td>
            <td class="">
                <div class="d-flex justify-content-center" data-id=${post.id}>
                    <h3 class="h3"><i class="bi bi-three-dots position-relative three-dot-icon-table" id="three-dot-table-icon-${idNum}" style="cursor: pointer;">
                            <div class="menu-box fs-5 position-absolute bg-white p-2 pb-0"
                                style="z-index: 1; border: 1px solid; border-radius: 0.6rem;"
                                id="menu-box-table-${idNum}">
                                <p class="edit-button" id="editButtonTable" style="font-size: 1rem; font-style: normal; cursor: pointer;">Edit
                                </p>
                                <p class="delete-button" id="deleteButton" style="font-size: 1rem; font-style: normal; cursor: pointer;">Delete
                                </p>
                            </div>
                        </i></h3>
                </div>
            </td>
        </tr>
            `;

        // Appending the Accordion HTML Element to Accordion Container
        accordionContainer.innerHTML = postOutputAccordion;

        // Appending the Table Row HTML Element to Table Row container
        tableContainer.innerHTML = postOutputTable;


        /* TOGGLING THE THREE DOT MENU */
        let threeDotIconMobile = document.querySelectorAll(".three-dot-icon-mobile"); // variable of the three dot menu icon in mobile
        let threeDotIconTable = document.querySelectorAll(".three-dot-icon-table");   // variable of the three dot menu icon in the table
        // The icon id and the menu box id must be different for the accordion and the table

        // Looping over all three dot icon for mobile
        threeDotIconMobile.forEach((icon) => {
            toggleMenu(icon); // calling the toggle function
        });

        // Looping over all three dot icon for the table
        threeDotIconTable.forEach((icon) => {
            toggleMenu(icon); // calling the toggle function
        });
    });
}


//---------------------------------------------- HTTP REQUEST METHODS ----------------------------------------------------------

// DOCS: https://jsonplaceholder.typicode.com/
let url = "https://jsonplaceholder.typicode.com/posts"; // API endpoint

/* GET METHOD - Read the posts */
// Displaying the posts per accordion and table row element
const displayPosts = async () => {

    const response = await fetch(url);       // fetch API endpoint
    const data = await response.json();      // store JSON data to a variable
    renderPost(data);                       // call renderPost function which adds elements with the data from the API
}

/* DELETE AND PATCH METHOD - Deletes and edits the post */
const deleteEditPost = async (e) => {

    e.preventDefault();

    // Declare varaibles of the three for menu buttons
    let delButtonIsPressed = e.target.id == "deleteButton"; // checks if the target id is the delete button
    let editButtonIsPressedAccordion = e.target.id == "editButtonAccordion"; // checks if the target id is the edit button for the accordion
    let editButtonIsPressedTable = e.target.id == "editButtonTable"; // checks if the target id is the edit button for the table

    let menubox = e.target.parentElement;           // parent element of the delete button which is the menu box because the data-id is placed here
    let dataId = menubox.parentElement.dataset.id; // id of the data 
    //console.log(dataId)

    /* DELETE METHOD */
    if (delButtonIsPressed) { // if this is true

        const response = await fetch(`${url}/${dataId}`, { // fetch end point with the id of the data
            method: 'DELETE',
        });
        const data = await response.json();
        console.log(data);
        console.log(`Post has been deleted`);

        // Insert modal before reloading the page
        setTimeout(() => location.reload(), 3000);
    }

    // Displays the value of the post contents in the edit modal form for accordion or mobile
    if (editButtonIsPressedAccordion) { // if the accordion edit button is pressed

        let target = e.target; // getting the parent element of the target
        let contents = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; // getting the parent element of the target
        console.log(contents);

        // Getting the text content of post title and body from the accordion
        let postTitleContent = contents.querySelector(".accordion-post-title").textContent;
        let postBodyContent = contents.querySelector(".accordion-post-body").textContent;
        //console.log(postTitleContent);
        //console.log(postBodyContent);


        // Displays the edit form modal with the data values in the fields
        editFormModal.style.display = "block"; // z-index should be higher
        editedTitle.value = postTitleContent;
        editedBody.value = postBodyContent;
    }

    // Displays the value of the post contents in the edit modal form for table rows or large screens
    if (editButtonIsPressedTable) {  // if the table row edit button is pressed

        let target = e.target; // getting the parent element of the target
        let contents = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement; // getting the parent element of the target
        console.log(contents);

        // Getting the text content of post title and body from the table row
        let postTitleContent = contents.querySelector(".table-post-title").textContent;
        let postBodyContent = contents.querySelector(".table-post-body").textContent;
        //console.log(postTitleContent);
        //console.log(postBodyContent);

        // Displays the edit form modal with the data values in the fields
        editFormModal.style.display = "block"; // z-index should be higher
        editedTitle.value = postTitleContent;
        editedBody.value = postBodyContent;
    }

    /* PATCH METHOD */
    editedSumbitButton.addEventListener("click", async (e) => { // when save edit button is clicked

        e.preventDefault();

        const response = await fetch(`${url}/${dataId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: editedTitle.value,
                body: editedBody.value
            })
        });
        const data = await response.json();
        editFormModal.style.display = "none";
        
        console.log(data);
        console.log("Data has been edited")

        // Insert modal before reloading the page
        //setTimeout(() => location.reload(), 3000);
    });
    /* LOGIC
    1. 
    2. Get parent elements which are the accordion-contents or table-row-container (containers or divs with the data contents)
    3. Set different ids for the edit button both for the accordion and table
    4. Try separating the function if it is still not working
    */
}


/* POST METHOD - Add a post */
// Adding the data to the API
const addPost = async (e) => {

    if (!isEmpty(postTitleForm.value) || !isEmpty(postContentForm.value)) {  // if the form is not empty 

        e.preventDefault();

        const response = await fetch(url, {  // fetching the API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({          // converting object to JSON
                title: postTitleForm.value,  // putting the value in the create post forms
                body: postContentForm.value
            })
        });

        const data = await response.json(); // storing the data to a variable
        console.log(data);                  // console loging the data (as of now)

        const dataArray = [];               // Since a JSON is an array of objects, we need to store it to an array
        dataArray.push(data);               // push the data to the array
        renderPost(dataArray);              // render or display the newly added post

        postTitleForm.value = "";           // setting the forms back to empty
        postContentForm.value = "";         // setting the forms back to empy

        // Can add modal for successfully made the post
        setTimeout(() => location.reload(), 3000);

    } // Can insert an else statement and an invalid modal about the invalid input values
}


/* GET METHOD */
// Calling the function that renders the post from API
displayPosts();

/* POST METHOD */
// Event listener for the Submit Button Form
// try using "submit" (not working)
submitButton.addEventListener("submit", addPost);

/* DELETE and PATCH METHOD */
// Event listener for the delete and edit button for the accordion and table row
accordionContainer.addEventListener("click", deleteEditPost);
tableContainer.addEventListener("click", deleteEditPost);
