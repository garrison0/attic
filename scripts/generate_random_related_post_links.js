const matter = require('gray-matter');
const fs = require('fs');
const crypto = require('crypto');

const SAVE_UPDATED_FILES = true;

const basedir = 'content/post';
const postPaths = fs.readdirSync(basedir);

const posts = {};
let k = 0;
for (const filename of postPaths) {
    const path = `${basedir}/${filename}`;
    posts[path] = matter.read(path);
    posts[path].visited = false;
    posts[path].index = k;
    k += 1;
}
const postsList = Object.values(posts);

let i = 0;
for (const [path, file] of Object.entries(posts)) {

    file.data.relatedPosts = [];

    let numRelatedPostsAdded = 0;
    outerLoop: while (numRelatedPostsAdded < 4) {
        const randIndex = crypto.randomInt(0, postsList.length);
        if (i == randIndex) {
            continue;
        }

        const relatedPostPath = postsList[randIndex].path;

        // make sure we don't add the same post twice
        for (const p of file.data.relatedPosts) {
            if (p.relatedPost == relatedPostPath) {
                continue outerLoop;
            }
        }

        // ensure related post only points in one direction (i.e. if A -> B exists, don't create B -> A)
        const relatedPostFile = posts[relatedPostPath];
        if (relatedPostFile.data.relatedPosts) {
            for (const p of relatedPostFile.data.relatedPosts) {
                if (p.relatedPost == path) {
                    continue outerLoop;
                }
            }
        }

        file.data.relatedPosts.push({ 'relatedPost': relatedPostPath });
        numRelatedPostsAdded += 1;
    }
    i++;

    if (SAVE_UPDATED_FILES) {
        const content = matter.stringify(file.content, file.data);
        try {
            fs.writeFileSync(path, content);
        } catch {
            console.log(`error: ${e}`);
        }
    } else { // if we're not saving the files, just print the frontmatter
        const content = matter.stringify('', file.data);
        console.log(content);
    }
}
