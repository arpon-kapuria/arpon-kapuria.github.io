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
  const article = document.querySelector(".blog-post");
  const readingTimeElement = document.getElementById("reading-time");
  if (!article || !readingTimeElement) return;

  const PROSE_WPM = 220;
  const CODE_WPM = 80; // reading code is slower, but measured separately

  // Extract and remove code blocks before counting prose words
  const cloned = article.cloneNode(true);
  const codeBlocks = cloned.querySelectorAll("pre code");

  let totalCodeWords = 0;
  codeBlocks.forEach(block => {
    const codeText = block.innerText || block.textContent;
    totalCodeWords += codeText.trim().split(/\s+/).length;
    block.remove(); // remove from clone so prose count isn't polluted
  });

  // Count prose words (code removed)
  const proseText = cloned.innerText;
  const proseWords = proseText.trim().split(/\s+/).length;

  // Count images in original
  const images = article.querySelectorAll("img").length;

  // Calculate time
  const proseTime = proseWords / PROSE_WPM;
  const codeTime = totalCodeWords / CODE_WPM;
  const imageTime = images * 0.3;

  const readingTime = Math.max(1, Math.ceil(proseTime + codeTime + imageTime)) + 2;

  readingTimeElement.innerText = `${readingTime} min read`;
}

async function loadMarkdownArticle() {
    // Get article name from URL
    const params = new URLSearchParams(window.location.search);
    const article = params.get("article");

    if (!article) return;

    const fetchPath = `/writings/${article}.md`;

    const response =
      await fetch(fetchPath);

    if (!response.ok) {
      document.getElementById("blog-content-md").innerHTML = "<p>Article not found.</p>";
      return;
    }

    const rawMarkdown = await response.text();

    // Extract frontmatter
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
    const metaDescription = metadata["meta-description"] || "";

    // Primary Meta
    document.getElementById("meta-title-tag")?.setAttribute("content", metaTitle);
    document.getElementById("meta-description-tag")?.setAttribute("content", metaDescription);

    // Open Graph
    document.getElementById("meta-og-title")?.setAttribute("content", metaTitle);
    document.getElementById("meta-og-description")?.setAttribute("content", metaDescription);

    // Twitter
    document.getElementById("meta-twitter-title")?.setAttribute("content", metaTitle);
    document.getElementById("meta-twitter-description")?.setAttribute("content", metaDescription);

    marked.setOptions({
      gfm: true,
      breaks: true
    });

    // Render Markdown
    document.getElementById("blog-content-md").innerHTML = marked.parse(markdown);

    renderMathInElement(
      document.getElementById("blog-content-md"), 
      {
        delimiters: [
          {
            left: "$$",
            right: "$$",
            display: true
          },
          {
            left: "$",
            right: "$",
            display: false
          }
        ]
      }
    );

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