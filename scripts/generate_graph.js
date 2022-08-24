const matter = require('gray-matter');
const fs = require('fs');

const SAVE_UPDATED_FILES = false;

const basedir = 'content/post';
const postPaths = fs.readdirSync(basedir);

const posts = {};
for (const filename of postPaths) {
    const path = `${basedir}/${filename}`;
    posts[path] = matter.read(path);
    posts[path].visited = false;
}

let i = 0;
for (const [path, file] of Object.entries(posts)) {
    if (i == 0) {
        file.data.x = 0;
        file.data.y = 0;
        file.visited = true;
    } else {
    }
    i += 1;
    console.log(`path: ${path}`);

    file.data.z = 0;
    if (file.data.relatedPosts) {
        const relatedPostsCount = file.data.relatedPosts.length;
        console.log(`number of related posts: ${relatedPostsCount}`);
        file.data.z = relatedPostsCount;

        let j = 0;
        for (const obj of file.data.relatedPosts) {
            console.log(`relatedPost: ${obj.relatedPost}`);
            const relatedPost = posts[obj.relatedPost];

            relatedPost.data.x = file.data.x +
            j += 1;
        }
    }

    if (SAVE_UPDATED_FILES) {
        const content = matter.stringify(file.content, file.data);
        try {
            fs.writeFileSync(path, content);
        } catch {
            console.log(`error: ${e}`);
        }
    } else {
        const content = matter.stringify('', file.data);
        console.log(content);
    }
}
