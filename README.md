# Discovery Project

## Getting Started

1. We have a central repository https://bitbucket.org/halcyonlaravel/discovery-hospitality-revamp/src/master
2. This repository is where we dump all the components for all of the sites including the discovery suite template.
3. There are two templates on this project. Discovery Hospitality and Discovery Suites.
4. The Discovery Suite Template (see .env file) NEXT_PUBLIC_TEMPLATE=2 is used in hotel/resorts website for this project.
5. When cloning a new project for discovery suite template, first you need to create your repository.
6. Remove the current remote origin by executing "git remote remove origin"
7. Add a remote by executing "git remote add origin https://bitbucket.org/halcyonlaravel/discovery-hospitality-revamp/src/master"
8. Execute "git pull origin master"
9. After the files has been pulled from centralized repo, remove the origin repo(which is the centralized repo) by executing "git remote remove origin" and replace it with your actual repository by executing "git remote add https://the-link-of-your-repo-branch".
   10: After the origin repo has been set, check the .env file if the config are set correctly. After checking that it's working, push your updates to your branch as initial commit.
10. If it's not working, check if the site has neccesary contents to make the site work. Check the prebuildUtilities file if it's configured properly. like globals, menu.
11. If you want to customize the colors based on the current theme, you can modify it in globals.css in line 5.
12. Once it's working, push your updates to your repo. And create a remote by executing "git remote add core https://bitbucket.org/halcyonlaravel/discovery-hospitality-revamp/src/master/" so that you can pull the updates from centralized repo.
13. You can pull updates from the core/centralized repo by executing "git pull core master"
