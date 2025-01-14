async function fetchData() {
    const username = document.getElementById("username").value.trim();
    const apiUrlUser = `https://api.github.com/users/${username}`
    const apiUrlRepos = `https://api.github.com/users/${username}/repos`

    try {
        const [userResponse, reposResponse] = await Promise.all([
            fetch(apiUrlUser),
            fetch(apiUrlRepos)
        ])

        if (!userResponse.ok || !reposResponse.ok) {
            document.getElementById("not-found").style.display = "block"
        } else {
            document.getElementById("not-found").style.display = "none"
        }

        const userData = await userResponse.json();
        const repoData = await reposResponse.json();

        console.log(userData)

        showUserData(userData)
        showRepoData(repoData)
    } catch (error) {
        console.error("Erro:", error)
    }
}

function showUserData(userData) {
    document.getElementById("icon").src  = userData.avatar_url;
    document.getElementById("name").innerText = userData.name;
    document.getElementById("location").innerText = userData.location || "Undefined";
    document.getElementById("followers").innerText = userData.followers;
    document.getElementById("following").innerText = userData.following;
    document.getElementById("bio").innerText = userData.bio;
    document.getElementById("github-url").href = userData.html_url;
    document.getElementById("x-url").href = "https://x.com/" + userData.twitter_username;

    if (userData.twitter_username == null) {
        document.getElementById("x-url").style.display = "none";
    } else {
        document.getElementById("x-url").style.display = "block";
    }
}

function showRepoData(repoData) {
    const container = document.getElementById("repo-container");
    const template = document.getElementById("repo-template");

    container.innerHTML = "";

    repoData.forEach((repo) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".repo-link").href = repo.html_url;
        clone.querySelector(".repo-name").innerText = repo.name;
        clone.querySelector(".repo-about").innerText = repo.description || "Undefined";
        clone.querySelector(".repo-language").innerText = repo.language || "Unspecified";
        clone.querySelector(".repo-forks").innerText = repo.forks;
        clone.querySelector(".repo-watchers").innerText = repo.watchers;

        container.appendChild(clone)
    })
}

fetchData();