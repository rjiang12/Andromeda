document.addEventListener("DOMContentLoaded", () => {
    const linksToggle = document.querySelector("#links-toggle");
    const linksContainer = document.querySelector("#links");
    const linkName = document.querySelector("#link-input");
    const linkURL = document.querySelector("#link-url-input");
    const addLinkButton = document.querySelector("#add-link");

    const loadLinks = () => {
        const links = JSON.parse(localStorage.getItem("links")) || [];
        const linksList = document.querySelector("#links-list");
        linksList.innerHTML = ""; // Clear existing links
    
        links.forEach((link, index) => {
            const li = document.createElement("li");
            li.className = "link-item";
    
            const linkContent = document.createElement("div");
            linkContent.className = "link-content";
            linkContent.innerHTML = `<a href="${link.url}" target="_blank">
                <img src='https://s2.googleusercontent.com/s2/favicons?domain_url=${link.url}'/> ${link.name}
            </a>`;
    
            const buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";
    
            buttonContainer.innerHTML = `
                <button class="edit-link" data-index="${index}">✎</button>
                <button class="delete-link" data-index="${index}">✖</button>
            `;
    
            li.appendChild(linkContent);
            li.appendChild(buttonContainer);
            linksList.appendChild(li);
        });
    
        // Add event listeners for edit and delete buttons
        document.querySelectorAll(".edit-link").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                editLink(index);
            });
        });
    
        document.querySelectorAll(".delete-link").forEach((button) => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                deleteLink(index);
            });
        });
    };
    
    let isEditing = false; // Flag to track if an edit is in progress

    const editLink = (index) => {
        if (isEditing) {
            alert("Finish editing the current link before editing another one.");
            return;
        }
    
        const links = JSON.parse(localStorage.getItem("links")) || [];
        const link = links[index];
    
        // Populate the input fields with the current link data
        linkName.value = link.name;
        linkURL.value = link.url;
    
        // Remove the link from the list temporarily
        links.splice(index, 1);
        saveLinks(links);
        loadLinks();
    
        isEditing = true; // Set the editing flag to true
    
        // Add an event listener to the "Add Link" button to save the edited link
        addLinkButton.addEventListener("click", function saveEditedLink() {
            if (linkName.value.trim() === "" || linkURL.value.trim() === "") {
                alert("Both name and URL are required.");
                return;
            }
    
            // Add the edited link back to the list
            links.push({ name: linkName.value, url: linkURL.value });
            saveLinks(links);
            loadLinks();
    
            // Clear the input fields
            linkName.value = "";
            linkURL.value = "";
    
            isEditing = false; // Reset the editing flag
            addLinkButton.removeEventListener("click", saveEditedLink); // Remove this event listener
        });
    };
    
    const deleteLink = (index) => {
        const links = JSON.parse(localStorage.getItem("links")) || [];
        links.splice(index, 1);
        saveLinks(links);
        loadLinks();
    };
    
    const saveLinks = (links) => {
        localStorage.setItem("links", JSON.stringify(links));
    };

    const addLink = () => {
        const name = linkName.value.trim();
        const url = linkURL.value.trim();
        isEditing = false;

        if (name && url) {
            const links = JSON.parse(localStorage.getItem("links")) || [];
            links.push({ name, url });
            saveLinks(links);
            loadLinks();
            linkName.value = "";
            linkURL.value = "";
        }
    };

    addLinkButton.addEventListener("click", addLink);
    linkName.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addLink();
        }
    });
    linkURL.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addLink();
        }
    });

    linksToggle.addEventListener("click", () => {
        linksContainer.classList.toggle("hidden");
    });

    loadLinks(); 
});