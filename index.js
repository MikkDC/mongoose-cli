require("dotenv").config();

const mongoose = require("mongoose");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

(async () => {
    mongoose.connect(process.env.MONGO_URI);

    const Game = mongoose.model("Game", {
        title: {type: String, unique: true, required: true },
        developer: {type: String, unique: false, default: "Unknown" },
        publisher: {type: String, unique: false, default: "Unknown" },
        year: {type: Number, default: "????" }
     });
     
    try{
        
        if (argv.add) {
            const game = new Game(
                {title: argv.title,
                   developer: argv.developer,
                   publisher: argv.publisher,
                   year: argv.year}
                   )
            await game.save();
            console.log(game);
            
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

                } else if (argv.update) {

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

