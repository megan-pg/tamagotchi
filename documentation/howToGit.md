Basic Git/GitHub Workflow:
1. log in to Github
2. navigate to project page
3. move card from "to do" to "in progress"
---
4. open terminal
5. cd into project directory, example below:
    ```bash
    cd ~/path/to/project-two 
    ```
6. make sure it's current with what's on GitHub:
    ```bash
    git pull
    ```
    * you may get errors here if you have:
        * worked on the project locally previously and not pushed your work up to GitHub
        * not setup the GitHub version as your master repository
7. create and navigate to your local branch:
    * swap out {NAME OF YOUR BRANCH} with something short and descriptive, no spaces, example below:
    ```bash
    git checkout -b {NAME OF YOUR BRANCH} 
    ```
    ```bash
    git checkout -b addHeader 
    ```
8. open your editor and do the code, save your changes
9. add changes to staging, back in the terminal:
    ```bash
    git add {NAME OF FILE YOU WANT TO ADD}
    ```
    ```bash
    git add index.html
    ```
10. commit the changes, ready to push to GitHub:
    ```bash
    git commit -m '{YOUR MESSAGE OF WHAT YOU'VE DONE HERE}'
    ```
    ```bash
    git commit -m 'added the header to main html view'
    ```
11. push the commit to GitHub as a separate branch, no spaces, example below:
    ```bash
    git push origin {BRANCH NAME HERE}
    ```
    ```bash
    git push origin addHeader
    ```
---
12. log in to GitHub
13. navigate to your branch
14. create a pull request
15. assign reviewers
    * doesn't hurt to slack them a message
16. code review
    * via Zoom, walk through code with reviewer(s)
17. merge pull request
18. go to project page
19. move card from "in-progress" to "done"
