const matter = require('gray-matter');
const fs = require('fs');
const cytoscape = require('cytoscape');
const spread = require('cytoscape-spread');

spread(cytoscape);

const SAVE_UPDATED_FILES = false;

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

const cy = cytoscape();

// let i = 0;
for (const [path, file] of Object.entries(posts)) {

    const n_i = `n${file.index}`;

    // if (i == 0) {
    //     // file.data.x = 0;
    //     // file.data.y = 0;
    //     file.visited = true;
    // } else {
    // }

    if (!file.visited) {
        cy.add({
            group: 'nodes',
            data: { 'id': n_i, weight: 10 },
            position: { x: 0, y: 0 },
        });
        file.visited = true;
    }

    // i += 1;
    console.log(`path: ${path}`);

    file.data.z = 0;
    if (file.data.relatedPosts) {
        const relatedPostsCount = file.data.relatedPosts.length;
        console.log(`number of related posts: ${relatedPostsCount}`);
        file.data.z = relatedPostsCount;

        // let j = 0;
        for (const obj of file.data.relatedPosts) {
            console.log(`relatedPost: ${obj.relatedPost}`);
            const relatedPost = posts[obj.relatedPost];
            const n_j = `n${relatedPost.index}`;

            if (!relatedPost.visited) {
                cy.add({
                    group: 'nodes',
                    data: { 'id': n_j, weight: 10 },
                    position: { x: 0, y: 0 },
                });
                relatedPost.visited = true;
            }


            cy.add({
                group: 'edges',
                data: {
                    source: n_i,
                    target: n_j,
                },
            });

            relatedPost.visited = true;
            // j += 1;
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

var run = function(l) {
    let p = l.promiseOn('layoutstop');
    l.run();
    return p;
}

const layout = cy.makeLayout({
    name: 'spread',
    boundingBox: {
        x1: -1,
        y1: -1,
        x2: 1,
        y2: 1,
    },
});
// (async () => {
//     await layout.run();
// })()

Promise.resolve()
    .then(() => run(layout))
    .then(() => { console.log("done") })
    .then(() => {
        for (const c of cy.nodes()) {
            console.log(`${c._private.data.id}: ${JSON.stringify(c._private.position)}`);
        }
    });

