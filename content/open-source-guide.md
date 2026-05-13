---
Author: Arpon Kapuria
Status: Published

title: Open Source Contribution - A Beginner’s Guide!
meta-title: Open Source Guide

date: July 31, 2025
modified: July 31, 2025

category: Dev Journal
description: A beginner-friendly guide to making your first open source contribution, from finding issues to submitting pull requests on GitHub.
---

**C**ontributing to open source is one of the most rewarding ways to grow as a developer. It improves your skills, helps you collaborate with experienced engineers and allows you to give back to the community. If you're just getting started, this guide walks you through a hands-on workflow—using Hugging Face’s [transformers](https://github.com/huggingface/transformers) repo as a real-world example.

## Working on a Feature 
<hr>

### 1. Finding the Right Issue 

Before writing any code, identify a task you can contribute to. Good entry points often include documentation fixes or minor enhancements.

For Hugging Face Transformers:

- Navigate to: [https://github.com/huggingface/transformers/issues](https://github.com/huggingface/transformers/issues)
- Look for tags like:
    - Good First Issue
    - Documentation
    - Help Wanted

**Example**: You choose to update the model card for the `Cohere R7B` model.

### 2. Setting Up Your Development Environment

First we need to fork the repository to your GitHub account (click the “Fork” button on GitHub).

```bash
# Clone your fork locally
git clone https://github.com/YOUR_USERNAME/transformers.git
cd transformers

# Create a new branch for your task
git checkout -b improve-cohere2-docs
```

### 3. Making the Improvements

Edit the appropriate file based on your issue. For Cohere2, refer to this file:

```bash
# Inside the repository
docs/source/en/model_doc/cohere2.md
```

Make your improvements (e.g., fixing typos, clarifying descriptions, etc.).

### 4. Submit Your Changes for Reviews

```bash
# Stage and commit your changes
git add docs/source/en/model_doc/cohere2.md
git commit -m "chore: update model card for Cohere R7B"

# Push changes to your fork
git push origin improve-cohere2-docs
```

Then go to your GitHub fork and click **"Compare & pull request"**. <br> 
Write a clear PR description explaining **what you changed** and **why**. Most repos provide a template for this.

### 5. Responding to Reviews

After submitting your PR:
- A maintainer might review your code and leave suggestions.
- Make the requested changes locally, then re-commit:

```bash
# Edit the file, then
git add .
git commit -m "fix: addressed PR feedback"
git push origin improve-cohere2-docs
```

### 6. Pull Request Merged

Once your contribution is accepted, maintainer will merge your pull request. <br>

> **Congrats!** You’ve made your first open source contribution.

## Working on Another Feature
<hr>

### 1. Sync Local Repository

Before you start the next issue, **sync your local repository** to avoid conflicts:

```bash
# Switch to your main branch
git checkout main

# Add the original repo as upstream if you haven't already (only needed once)
git remote add upstream https://github.com/huggingface/transformers.git

# Confirm remotes
git remote -v

# Fetch and merge latest changes from original repo
git fetch upstream
git merge upstream/main

# Push updates to your fork
git push origin main
```

### 2. Start Your Next Contribution

```bash
# Create a new feature branch
git checkout -b improve-gemini-docs

# Make changes, then commit and push
git add .
git commit -m "chore: update Gemini model card"
git push origin improve-gemini-docs
```

Then, open a new pull request as before.

### Optional: Cleanup Old Branches
<hr>

Keep your fork tidy by deleting old branches once they’re merged:

```bash
# Delete local branch
git branch -d improve-cohere2-docs

# Delete remote branch
git push origin --delete improve-cohere2-docs
```

### Final Tips
<hr>

- Read the **CONTRIBUTING.md** file if available in the repository.
- Keep commits atomic and messages clear.
- Always sync before creating a new branch.

<hr>

> Open source is not just about code—it's about communication, collaboration, and community. Every PR you make builds your skills and reputation. Happy Contributing !