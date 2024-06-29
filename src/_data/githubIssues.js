import { Octokit } from "@octokit/core";

export default async function () {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN,
	});

	const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
		owner: "samwarnick",
		repo: "samwarnick.com",
		headers: {
			"X-GitHub-Api-Version": "2022-11-28",
		},
	});
	return data;
}
