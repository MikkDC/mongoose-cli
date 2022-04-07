require("dotenv").config();

const mongoose = require("mongoose");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;
const Game = require("./game/gameModel");

(async () => {
    mongoose.connect(process.env.MONGO_URI);

    try {
        // ADDing an entry --add --title "" --developer "" --publisher "" --year ""
        // note: --title is REQUIRED to be able to add an entry
        if (argv.add) {
            const game = new Game(
                {
                    title: argv.title,
                    developer: argv.developer,
                    publisher: argv.publisher,
                    year: argv.year
                }
            )
            await game.save();
            console.log(game);

            // listBy lists entries by category
            // eg, --listBy --year"2018" will list all games from 2018
        } else if (argv.listBy) {
            if (argv.title) {
                const listResult = await Game.find(
                    { title: argv.title }
                )
                console.log(listResult)
            }
            else if (argv.developer) {
                const listResult = await Game.find(
                    { developer: argv.developer }
                )
                console.log(listResult)
            }
            else if (argv.publisher) {
                const listResult = await Game.find(
                    { publisher: argv.publisher }
                )
                console.log(listResult)
            }
            else if (argv.year) {
                const listResult = await Game.find(
                    { year: argv.year }
                )
                console.log(listResult);
            }
            else {
                const listResult = await Game.find()
                console.log(listResult);
            }
            mongoose.connection.close();

            // update lets the user update an entry but only one category at a time
            // eg, --update --title "" --newtitle "" updates title
            // eg2, --update --title "" --newyear "" updates year of that title
        } else if (argv.update) {
            if (argv.newtitle) {
                await Game.updateOne(
                    { title: argv.title },
                    { $set: { title: argv.newtitle } }
                )
                console.log(`Game title updated to ${argv.newtitle}`)
            }
            else if (argv.newdeveloper) {
                await Game.updateOne(
                    { title: argv.title },
                    { $set: { developer: argv.newdeveloper } }
                )
                console.log(`Developer updated to ${argv.newdeveloper}`)
            }
            else if (argv.newpublisher) {
                await Game.updateOne(
                    { title: argv.title },
                    { $set: { publisher: argv.newpublisher } }
                )
                console.log(`Publisher updated to ${argv.newpublisher}`)
            }
            else if (argv.newyear) {
                await Game.updateOne(
                    { title: argv.title },
                    { $set: { year: argv.newyear } }
                )
                console.log(`Year updated for ${argv.title} to (${argv.newyear})`)
            }
            // Deletes one entry from the data base 
            // Usage: --delete --title ""
        } else if (argv.delete) {
            await Game.deleteOne(
                { title: argv.title })
            console.log(`Game ${argv.title} deleted`)

        } else {
            console.log("Command not recognised");
        }

    } catch (error) {
        console.log(error);
    }

    // closes connection to database and returns control to user
    mongoose.connection.close();

})();

