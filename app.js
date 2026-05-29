// selecting the elements 
const input = document.querySelector('#search-input');
const modeBtn = document.querySelector('#toggle-btn');
const searchBtn = document.querySelector('#search-btn');
const profileName = document.querySelector('#profile-name');
const profileUsername = document.querySelector('#profile-username');
const bio = document.querySelector('#profile-bio');
const avatar = document.querySelector('#profile-avatar');
const follower = document.querySelector('#followers-count');
const following = document.querySelector('#following-count');
const repos = document.querySelector('#repos-count');
const userlocation = document.querySelector('#userlocation');
const company = document.querySelector('#company');
const gitLink = document.querySelector('#github-link');
const repoSubtext = document.querySelector('.repositories-subtext');
const repoContainer = document.querySelector('.repo-list');
const errorMsg = document.querySelector('#error-message');
const loading = document.querySelector('#loading');

//api details 
const BASE_URL = "https://api.github.com/users/";

//click funtions 

searchBtn.addEventListener('click', () => {
    console.log("search button clicked ");
    const name = input.value;
    getUserData(name);
});


//await pauses the particular funtion until the promise returned by fetch is completed
const getUserData = async (username) => {
    console.log(`${username} is the username`);
    const URL = `${BASE_URL}${username}`;
    const response = await fetch(URL);
    const data = await response.json();
    //update the ui
    updateUI(data);
};

const getrepositories = async (username) => {
    const repoURL = `${BASE_URL}${username}/repos`;
    const repoResponse = await fetch(repoURL);
    const repoData = await repoResponse.json();
    console.log(repoData);
    //the repo subtext means the text under the repositories
    repoSubtext.innerText = repoData.length > 0 ? "Repositories" : "No repositories found";

    //repocontainer means list of repositories
    repoContainer.innerText = repoData.html_url;
};

const updateUI = (data) => {
    console.log(data);
    profileName.innerHTML  = data.name;
    profileUsername.innerText =  "Username:- " + data.login;
    bio.innerText = data.bio;
    avatar.src = data.avatar_url;
    follower.innerText = data.followers;
    following.innerText = data.following;
    repos.innerText = data.public_repos;
    userlocation.innerText = data.location;
    company.innerText = data.company;
    gitLink.href = data.html_url;
    //for repositories
    getrepositories(data.login);
}

modeBtn.addEventListener('click', () => {
    console.log('toggling mode');
});


