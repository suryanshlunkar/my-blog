document.addEventListener("DOMContentLoaded", () => {
    const latestPostContainer = document.getElementById('latest-post');
    const blogThumbnailsContainer = document.getElementById('blog-thumbnails');
    const blogPostContentContainer = document.getElementById('blog-post-content');

    fetch('data/blogs.json')
        .then(response => response.json())
        .then(blogs => {
            if (latestPostContainer) {
                const latestPost = blogs[0];
                latestPostContainer.innerHTML = `
                    <article>
                        <h2>${latestPost.title}</h2>
                        <p>${latestPost.date}</p>
                        <img src="${latestPost.image}" alt="${latestPost.title}">
                        <p>${latestPost.summary}</p>
                        <a href="post.html?title=${encodeURIComponent(latestPost.title)}" class="read-more-button">Read More</a>
                    </article>
                `;
            }

            if (blogThumbnailsContainer) {
                blogs.forEach(blog => {
                    blogThumbnailsContainer.innerHTML += `
                        <article>
                            <h2>${blog.title}</h2>
                            <p>${blog.date}</p>
                            <img src="${blog.image}" alt="${blog.title}">
                            <p>${blog.summary}</p>
                            <a href="post.html?title=${encodeURIComponent(blog.title)}" class="read-more-button">Read More</a>
                        </article>
                    `;
                });
            }

            if (blogPostContentContainer) {
                const urlParams = new URLSearchParams(window.location.search);
                const blogTitle = urlParams.get('title');
                const blog = blogs.find(b => b.title === blogTitle);
                if (blog) {
                    blogPostContentContainer.innerHTML = `
                        <h2>${blog.title}</h2>
                        <p>${blog.date}</p>
                        <img src="${blog.image}" alt="${blog.title}">
                        <p>${blog.content}</p>
                    `;
                }
            }
        });
});
