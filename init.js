const fs = require("fs");
const path = require("path");
const readline = require("readline");

const base = process.cwd();
const serverDir = path.join(base, "server");
const dataDir = path.join(serverDir, "data");
const rootsDir = path.join(dataDir, "roots");
const indexFile = path.join(dataDir, "index.json");

function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve =>
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim());
        })
    );
}

async function main() {
    const indexExists = fs.existsSync(indexFile);

    let rootsNotEmpty = false;
    if (fs.existsSync(rootsDir)) {
        const files = fs.readdirSync(rootsDir);
        rootsNotEmpty = files.length > 0;
    }

    if (indexExists || rootsNotEmpty) {
        const ans = await ask("The database is not empty. Do you want to delete the data? (n/Y) ");
        if (ans.toLowerCase() !== "y") {
            console.log("Canceled.");
            return;
        }

        if (fs.existsSync(dataDir)) {
            fs.rmSync(dataDir, { recursive: true, force: true });
        }
        console.log("Data cleared.");
    }

    fs.mkdirSync(rootsDir, { recursive: true });

    const jsonContent = {
        version: 1,
        roots: []
    };
    fs.writeFileSync(indexFile, JSON.stringify(jsonContent, null, 2), "utf-8");

    console.log("Database initialized successfully.");
}

main();
