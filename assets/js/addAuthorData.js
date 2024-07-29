function addPostInfo() {
    // Check if the current URL matches the /blog/ route
    if (window.location.pathname.startsWith("/blog/")) {
      // Select all h1 elements inside div.post__content
      const postContents = document.querySelectorAll(".post__content h1");
  
      postContents.forEach((h1) => {
        // Create a container for the author, image, and date
        const postInfo = document.createElement("div");
        postInfo.classList.add("post-info");
  
        // Create the author image element
        const img = document.createElement("img");
        img.src = "/images/profileImage.jpeg";
        img.alt = "Author Image";
  
        // Create the author name element
        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = "Silviu Vranau";
  
        // Create a spacer element
        const spacer = document.createElement("div");
        spacer.classList.add("spacer");
  
        // Create the date element
        const date = document.createElement("div");
        date.classList.add("date");
  
        // Extract the date from the meta tag
        const metaDate = document.querySelector('meta[property="article:published_time"]');
        if (metaDate) {
          // Extract the date from the meta tag's content attribute
          const dateString = metaDate.getAttribute('content');
          
          // Parse and format the date
          const dateObj = new Date(dateString);
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          const formattedDate = dateObj.toLocaleDateString('en-GB', options);
          
          // Set the formatted date as the content
          date.textContent = formattedDate;
        } else {
          date.textContent = "";
        }
  
        // Append image, author, spacer, and date to the postInfo container
        postInfo.appendChild(img);
        postInfo.appendChild(author);
        postInfo.appendChild(spacer);
        postInfo.appendChild(date);
  
        // Create a horizontal rule (divider)
        const divider = document.createElement("hr");
        divider.classList.add("post-divider");
  
        // Insert the postInfo container and the divider after the h1 element
        h1.insertAdjacentElement("afterend", postInfo);
        postInfo.insertAdjacentElement("afterend", divider);
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", addPostInfo);
  