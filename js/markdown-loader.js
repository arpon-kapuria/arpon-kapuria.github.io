function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll(".blog-content-md pre");

    codeBlocks.forEach(block => {

        const code =
          block.querySelector("code");

        if (!code) return;

        if (
          block.parentElement.classList.contains(
            "code-block-wrapper"
          )
        ) return;

        // Get Language
        const languageClass =
          [...code.classList]
          .find(cls =>
            cls.startsWith("language-")
          );

        const language =
          languageClass
          ? languageClass.replace("language-", "")
          : "text";

        // Wrapper
        const wrapper =
          document.createElement("div");

        wrapper.className =
          "code-block-wrapper";

        // Header
        const header =
          document.createElement("div");

        header.className =
          "code-block-header";

        // Language Label
        const label =
          document.createElement("span");

        label.className =
          "code-language";

        label.innerText =
          language;

        // Copy Button
        const copyBtn =
          document.createElement("button");

        copyBtn.className =
          "copy-code-btn";

        copyBtn.innerText =
          "Copy";

        copyBtn.addEventListener(
          "click",
          async () => {

            await navigator.clipboard.writeText(
              code.innerText
            );

            copyBtn.innerText =
              "Copied!";

            setTimeout(() => {

              copyBtn.innerText =
                "Copy";

            }, 5000);

          }
        );

        // Build Header
        header.appendChild(label);

        header.appendChild(copyBtn);

        // Insert Wrapper
        block.parentNode.insertBefore(
          wrapper,
          block
        );

        wrapper.appendChild(header);
        wrapper.appendChild(block);
    });
}

// Calculates blog reading time dynamically
function initReadingTime() {

// Main article container
const article =
  document.querySelector(".blog-post");

// Element where reading time will appear
const readingTimeElement =
  document.getElementById("reading-time");

if (!article || !readingTimeElement) return;

// Get all readable text
const text = article.innerText;

// Count words
const words =
  text.trim().split(/\s+/).length;

// Count code blocks
const codeBlocks =
  article.querySelectorAll("pre code").length;

// Count images
const images =
  article.querySelectorAll("img").length;

// Base reading speed
let readingTime =
  Math.ceil(words / 220);

// Technical adjustments
readingTime += codeBlocks * 1;
readingTime += Math.ceil(images * 0.3);

// Minimum 1 minute
readingTime = Math.max(1, readingTime);

// Add 2 minute buffer
readingTime += 1;

// Render
readingTimeElement.innerText =
  `${readingTime} min read`;
}

async function loadMarkdownArticle() {
    // Get article name from URL
    const params = new URLSearchParams(window.location.search);
    const article = params.get("article");

    if (!article) return;

    console.log(
      `Fetching: ../content/${article}.md`
    );

    // Fetch markdown file
    const response = await fetch(`../content/${article}.md`);

    if (!response.ok) {
      document.getElementById("blog-content-md").innerHTML = "<p>Article not found.</p>";
      return;
    }

    const rawMarkdown = await response.text();

    // Extract frontmattera
    const frontmatterRegex = /---([\s\S]*?)---/;
    const match = rawMarkdown.match(frontmatterRegex);

    let metadata = {};
    let markdown = rawMarkdown;

    if (match) {
        const frontmatter = match[1];
        markdown = rawMarkdown.replace(frontmatterRegex, "");

        frontmatter
          .trim()
          .split("\n")
          .forEach(line => {
            const [key, ...value] = line.split(":");
            metadata[key.trim()] = value.join(":").trim();
          });
    }

    // Inject Hero Section Metadata
    document.getElementById("blog-title").innerText = metadata.title || "";
    document.getElementById("blog-date").innerText = metadata.date || "";
    document.getElementById("blog-category").innerText = metadata.category || "";
    document.getElementById("blog-modified").innerText = `Last Modified on ${metadata.modified}`;
    document.title = metadata["meta-title"] || metadata.title || "Article";

    // SEO Metadata
    const metaTitle = metadata["meta-title"] || metadata.title || "";
    const metaDescription = metadata.description || "";

    // Primary Meta
    document.getElementById("meta-title-tag")?.setAttribute("content", metaTitle);
    document.getElementById("meta-description-tag")?.setAttribute("content", metaDescription);

    // Open Graph
    document.getElementById("meta-og-title")?.setAttribute("content", metaTitle);
    document.getElementById("meta-og-description")?.setAttribute("content", metaDescription);

    // Twitter
    document.getElementById("meta-twitter-title")?.setAttribute("content", metaTitle);
    document.getElementById("meta-twitter-description")?.setAttribute("content", metaDescription);

    // Render Markdown
    document.getElementById("blog-content-md").innerHTML = marked.parse(markdown);

    // Open markdown links in new tab
    document.querySelectorAll(".blog-content-md a").forEach(link => {
      link.setAttribute("target", "_blank");
      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    });

    // Code Syntax Highlighting
    Prism.highlightAll();

    // Enhance Code Blocks
    enhanceCodeBlocks();
      
    // Calculate reading time
    initReadingTime();
}

loadMarkdownArticle();