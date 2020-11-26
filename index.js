#!/usr/bin/env node

const core = require("@actions/core");
const { context, GitHub } = require("@actions/github");

async function run() {

    const { GITHUB_TOKEN } = process.env;
    let prHasComment = false;
    if ( !GITHUB_TOKEN) {
        core.setFailed('If "reaction" is supplied, GITHUB_TOKEN is required');
        return;
    }
    
    if (context.eventName === "issue_comment" && !context.payload.issue.pull_request) {
       console.log("Not a PR comment skipping !!!");
       return;
    } else {
       console.log("Payload :" + context.payload);
       const body = context.payload.pull_request.body;
       const listOfStrings = core.getInput("string-list");
       listOfStrings.forEach(function (item) {
          if ( body.startWith(item) || !body.includes(item)) {
              prHasComment = true;
          }
      });

     const author = context.payload.pull_request.author;
     console.log("Author: " + author);
       
    }
}

run().catch(err => {
    console.error(err);
    core.setFailed("Unexpected error");
});
