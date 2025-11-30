import fs from "fs/promises";

const dbPath = "/home/fouzan/expressCLI-axios/server/data.json";

async function readDB()
{
    try {
        let data = await fs.readFile(dbPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
}

async function writeDB(content)
{
    try {
        await fs.writeFile(dbPath, JSON.stringify(content, null, 2));
    } catch (error) {
        console.log(error);
    }
}

export {readDB, writeDB};