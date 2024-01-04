console.log("SCRIPT LOADED");

let reactionsModalClosed = false;

window.onclick = function (event) {
  if (event.target.matches("#toggle-dropdown")) {
    var div = document.getElementById("dropdownContent");
    div.style.display = div.style.display !== "flex" ? "flex" : "none";
  }

  if (event.target.matches(".example")) {
    performExampleAutomations();
  }

  if (event.target.matches(".execute-test")) {
    executeYourAutomation();
  }
};

function performExampleAutomations() {
  let users = [];
  const userDetailsDivs = document.querySelectorAll(".update-components-actor__meta");

  userDetailsDivs.forEach((userDetailsDiv) => {
    const user = {
      name: userDetailsDiv.querySelector('.update-components-actor__name span[aria-hidden="true"]').innerText,
      jobTitle: userDetailsDiv.querySelector('.update-components-actor__description span[aria-hidden="true"]').innerText,
    };
    users.push(user);
  });

  const usersString = users.map((user) => `Name: ${user.name} \nJob: ${user.jobTitle}`).join("\n\n");

  alert(usersString);
}

async function executeYourAutomation() {
  console.log("Starting yourAutomation");

  let likedUsers = [];
  const firstPostReactionsButton = document.querySelector('.social-details-social-counts__reactions button');

  if (firstPostReactionsButton) {
    console.log("Clicking reactions button");
    firstPostReactionsButton.click();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const firstPostElement = document.querySelector('.artdeco-modal__content .artdeco-entity-lockup');

    if (firstPostElement) {
      const postContentElement = document.querySelector('.feed-shared-update-v2__description span');
      let postContent = postContentElement ? postContentElement.innerText : 'No content found';

      const totalCharacters = postContent.length + likedUsers.length * 20;
      const maxLimit = 300;

      if (totalCharacters > maxLimit) {
        const ratio = maxLimit / totalCharacters;
        const adjustedPostLength = Math.floor(postContent.length * ratio);
        const adjustedLikedUsersCount = Math.floor(likedUsers.length * ratio);
        postContent = postContent.slice(0, adjustedPostLength) + '...';
        likedUsers.length = adjustedLikedUsersCount;
      }

      postContent = postContent.replace(/(?:#\S+|hashtag)/g, '');

      likedUsers = Array.from(
        document.querySelectorAll('.artdeco-modal__content .artdeco-entity-lockup__title')
      ).map((element) => element.innerText.split('\n')[0]);

      const likedUsersString = `Post Content: ${postContent}\n\nPeople who liked the post:\n\n${likedUsers.join("\n")}`;

      alert(likedUsersString);
    } else {
      console.log("No posts found in the reactions modal.");
      alert("No posts found in the reactions modal.");
    }
  } else {
    console.log("Couldn't find the reactions button on the first post.");
    alert("Couldn't find the reactions button on the first post.");
  }

  console.log("Ending yourAutomation");
}
