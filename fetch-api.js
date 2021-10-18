
/* Declare Variables for the containers */
const accordionContainer = document.querySelector(".main-accordion-container"); // Accordion Container
const tableContainer = document.querySelector(".main-table-container");         // Table Row Container

/* Declare variable for the outputs */
let postOutputAccordion = ""; // Output for the Accordion 
let postOutputTable = ""; // Output for the Table Row
let idNum = 0;           // ID number for every Accordion Button and Post Number

/* Declare variable for the forms */
const postTitleForm = document.querySelector(".form-title"); // Post Title form
const postContentForm = document.querySelector(".form-content"); // Post Content form
const submitButton = document.querySelector(".submit-button"); // Submit button form


/* Function that checks if the input fields is empty */
const isEmpty = (str) => {
    return !str.trim().length;
}

/* Function that toggles an element */
const toggleMenu = (element) => {

    element.addEventListener("click", (e) => {

        let target = e.target.id; // getting the target id of the three dot icon which is 
        //console.log(target);

        let icon = document.getElementById(`${target}`); // getting the elment which has the target id

        let menuBox = icon.firstElementChild           // getting the first child element which is the menu box

        let menuBoxId = document.getElementById(`${menuBox.id}`); // getting the element of the id of the node

        if (menuBoxId.style.display === "none") {               // logic for the displaying and hiding the menu box
            menuBoxId.style.display = "block";
        } else {
            menuBoxId.style.display = "none";
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
            <div class="accordion-bg bg-white mb-3 d-lg-none" data-id=${post.id}>
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">

                    <!-- Post Number, Edit and Delete Function -->
                    <div class="d-flex justify-content-between">
                        <p class="postNum mt-2">Post Number# ${idNum}</p>
                        <div class="d-flex mb-2">
                            <h3 class="mt-1"><i class="bi bi-three-dots position-relative three-dot-icon-mobile px-2" id="three-dot-icon-${idNum}" style="cursor: pointer;">
                                    <div class="menu-box fs-5 position-absolute bg-white p-2 pb-0"
                                        style="z-index: 100; border: 1px solid; border-radius: 0.6rem; right: 0;"
                                        id="menu-box-${idNum}">
                                        <p id="deleteButton"
                                            style="font-size: 1rem; font-style: normal; cursor: pointer;">Edit
                                        </p>
                                        <p id="editButton"
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
                    <div id="flush-collapse-${idNum}" class="accordion-collapse collapse"
                        aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <p class="mt-3 fw-bold">Title: <span id="postTitle"
                                    style="font-weight: normal;">${post.title}</span></p>
                            <p class="mt-3 mb-0 fw-bold">Content: <span id="postContent"
                                    style="font-weight: normal;">${post.body}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;

        // Table Row HTML Element
        postOutputTable += `
            <tr class="table-row-container data-id=${post.id}">
            <td class="date-text text-center">${idNum}</td>
            <td class="title-text">${post.title}</td>
            <td class="content-text">${post.body}</td>
            <td class="">
                <div class="d-flex justify-content-center">
                    <h3><i class="bi bi-three-dots position-relative three-dot-icon-table" id="three-dot-table-icon-${idNum}" style="cursor: pointer;">
                            <div class="menu-box fs-5 position-absolute bg-white p-2 pb-0"
                                style="z-index: 100; border: 1px solid; border-radius: 0.6rem;"
                                id="menu-box-table-${idNum}">
                                <p id="deleteButton" style="font-size: 1rem; font-style: normal; cursor: pointer;">Edit
                                </p>
                                <p id="editButton" style="font-size: 1rem; font-style: normal; cursor: pointer;">Delete
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


        /* DISPLAYING THE THREE DOT MENU */
        let threeDotIconMobile = document.querySelectorAll(".three-dot-icon-mobile"); // variable of the three dot menu icon in mobile
        let threeDotIconTable = document.querySelectorAll(".three-dot-icon-table");   // variable of the three dot menu icon in the table

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



// DOCS: https://jsonplaceholder.typicode.com/
let url = "https://jsonplaceholder.typicode.com/posts"; // API endpoint

/* GET METHOD - Read the posts */
// Displaying the posts per accordion and table row element
const displayPosts = async () => {

    const response = await fetch(url);       // fetch APU endpoint
    const data = await response.json();      // store JSON data to a variable
    renderPost(data);                       // call renderPost function which adds elements with the data from the API
}


/* DELETE METHOD - Deletes the post */
const deletePost = async (e) => {

    e.preventDefault();



}


/* POST METHOD - Add a post */
// Adding the data to the API
const addPost = async (e) => {

    if (!isEmpty(postTitleForm.value) || !isEmpty(postContentForm.value)) {

        e.preventDefault();

        const response = await fetch(url, {  // fetching the API endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postTitleForm.value,
                body: postContentForm.value,
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

    } // Can insert an else statement and an invalid modal about the invalid input values
}


/* GET METHOD */
// Calling the function that renders the post from API
displayPosts();

/* POST METHOD */
// Event listener for the Submit Button Form
// try using "submit" (not working)
submitButton.addEventListener("click", addPost);


