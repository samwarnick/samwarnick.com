import { Octokit } from "@octokit/core";
import { AssetCache } from "@11ty/eleventy-fetch";

export default async function () {
	let asset = new AssetCache("github_issues");

	if (asset.isCacheValid("6h")) {
		return asset.getCachedValue();
	}

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
	await asset.save(data, "json");
	return data;
}
