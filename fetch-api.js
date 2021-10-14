// Declare Variables
let accordionContainer = document.querySelector(".main-accordion-container"); // Accordion Container
let tableContainer = document.querySelector(".main-table-container");         // Table Row Container

let postOutputAccordion = ""; // Output for the Accordion 
let postOutputTable = ""; // Output for the Table Row
let idNum = 0;

// DOCS: https://jsonplaceholder.typicode.com/
let url = "https://jsonplaceholder.typicode.com/posts"; // API endpoint

// GET METHOD - Read the posts
// Displaying the posts per accordion and row element
let displayPosts = async () => {

    const response = await fetch(url); // fetching the API` endpoint
    const data = await response.json(); // 
    data.forEach((post) => {

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
                    <td class="date-text">${idNum}</td>
                    <td class="title-text">${post.title}</td>
                    <td class="content-text">${post.body}</td>
                    <td class="">
                    
                    </td>
        </tr>
        `

        // Appending the Accordion HTML Element to Accordion Container
        accordionContainer.innerHTML = postOutputAccordion;

        // Appending the Table Row HTML Element to Table Row container
        tableContainer.innerHTML = postOutputTable; 

    });
}

// Calling the async function
displayPosts();