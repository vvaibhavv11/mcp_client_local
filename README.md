# mcp_client_local

## Description

The MCP client connects to a model, enabling the model to perform actions on GitHub and Git. This allows for automated interactions with repositories, such as creating issues, commenting on pull requests, and managing files.

## Setup Instructions

1.  **Install Bun:** This project requires Bun. You can install it from [https://bun.sh/](https://bun.sh/).

2.  **Environment Variables:**

    *   `GOOGLE_GEN_AI_API_KEY`: Your Google Generative AI API key. This is required for accessing the language model.
    *   `GITHUB_TOKEN`: A GitHub personal access token (PAT) with the necessary permissions for the actions the model will perform (e.g., creating issues, commenting on PRs, pushing code). You can generate a PAT at [https://github.com/settings/tokens](https://github.com/settings/tokens).
    *   `GITHUB_TOOLSETS`: Configuration for GitHub toolsets. Details depend on the application's use of GitHub.

3.  **Start the application:**

    Run the following command:

    ```bash
    bun index.js
    ```