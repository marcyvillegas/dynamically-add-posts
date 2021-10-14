
// Declare Variables for the containers
const accordionContainer = document.querySelector(".main-accordion-container"); // Accordion Container
const tableContainer = document.querySelector(".main-table-container");         // Table Row Container

let postOutputAccordion = ""; // Output for the Accordion 
let postOutputTable = ""; // Output for the Table Row
let idNum = 0;           // ID number for every Accordion Button and Post Number

let postTiteForm = document.querySelector(".form-title"); // Post Title form
let postContentForm = document.querySelector(".form-content"); // Post Content form
let submitButton = document.querySelector(".submit-button"); // Submit button form

// DOCS: https://jsonplaceholder.typicode.com/
let url = "https://jsonplaceholder.typicode.com/posts"; // API endpoint


// Function that adds HTML Elements
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
                    <div class="d-flex mb-2">
                        <button class="btn btn-primary edit-btn">Edit</button>
                        <button class="btn btn-primary ms-2 del-btn">Delete</button>
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
                        <p class="mt-3 fw-bold">Title: <span id="postTitle" style="font-weight: normal;">${post.title}</span></p>
                        <p class="mt-3 mb-0 fw-bold">Content: <span id="postContent" style="font-weight: normal;">${post.body}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

        // Table Row HTML Element
        postOutputTable += `
        <tr class="table-row-container">
                    <td class="date-text text-center">${idNum}</td>
                    <td class="title-text">${post.title}</td>
                    <td class="content-text">${post.body}</td>
                    <td class="">
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary">Edit</button>
                            <button class="btn btn-primary ms-3">Delete</button>
                        </div>
                    </td>
        </tr>
        `;

        // Appending the Accordion HTML Element to Accordion Container
        accordionContainer.innerHTML = postOutputAccordion;

        // Appending the Table Row HTML Element to Table Row container
        tableContainer.innerHTML = postOutputTable;
    });
}



// GET METHOD - Read the posts
// Displaying the posts per accordion and row element
const displayPosts = async () => {

    // Can add here a loader

    const response = await fetch(url); // fetching the API endpoint
    const data = await response.json(); // storing the data to a variable

    // Calling the function for rendering the post
    renderPost(data);
}


//POST METHOD - Add a post
// Adding the data to the API
const addPost = async (e) => {

    e.preventDefault();

    const response = await fetch(url, {  // fetching the API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: postTiteForm.value,
            body: postTiteForm.value
        })
    });

    const data = await response.json(); // storing the data to a variable
    console.log(data);

    const dataArray = [];               // since it is an object, we need to store it to an array
    dataArray.push(data);               // push the data to the array
    displayPosts(data);                 // render or display the posts
}


// GET METHOD
// Calling the displaying of posts function
displayPosts();

// POST METHOD
// Event listener for the Submit Button Form
// "submit" was used in to add the data to API 
// "click" was used to display the data to the console only
submitButton.addEventListener("click", addPost);

