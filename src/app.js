console.log("App is running."); 

// info re Game Players (classes)
class Player {
    constructor(name, hitpoints){
        this.name = name;
        this.hitpoints = hitpoints;
        this.dead = false;
    }
     // initiate an attack
    attack(enemy, damage){
        if(!enemy.dead){
            console.log(`${enemy.name} has been attacked by ${this.name}.`);
            console.log(`${this.name} reduces enemy years by`, damage);
            enemy.takeHit(damage);
        } 
        return damage;
    }
    // calculate hit taken
    takeHit(damage){
        this.hitpoints = this.hitpoints - damage;
        this.dead = this.hitpoints <= 0;   
    }
};
// players
class ModernArtPlayer extends Player {
    constructor(name, hitpoints){
        super(name, hitpoints);
        }
    attackEnemy(enemy) {
        this.attackpoint = Math.floor(Math.random() * 4);
        super.attack(enemy, this.attackpoint);
        return enemy.hitpoints
    }
};
class ClassicArtPlayer extends Player {
    constructor(name, hitpoints){
        super(name, hitpoints);
    }
    attackEnemy(enemy) {
        this.attackpoint = Math.floor(Math.random() * 2) + 1;
        super.attack(enemy, this.attackpoint);
        return enemy.hitpoints
    }
};

// Player options
let playerArray = [
    {name: 'Picasso',
    lifespan: 9,
    type: 'modern',
    avatar: 'https://www.pablopicasso.org/images/paintings/self-portrait-1907.jpg'
    },
    {name:'Cezanne',
    lifespan: 7,
    type: 'modern',
    avatar: 'https://media.newyorker.com/photos/5abd7107e4b526446411b381/master/w_2560%2Cc_limit/180409_r31842.jpg'
    },
    {name:'Gauguin',
    lifespan: 5,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Self-Portrait_by_Paul_Gauguin%2C_1885.jpg'
    },
    {name:'Munch',
    lifespan: 8,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Edvard_Munch_-_Self-Portrait_%281895%29_G0192-59_-_Google_Art_Project.jpg/800px-Edvard_Munch_-_Self-Portrait_%281895%29_G0192-59_-_Google_Art_Project.jpg'
    },
    {name:'vanGogh',
    lifespan: 4,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/1024px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg'
    }, 
    {name:'Raffaello',
    lifespan: 4,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Raffaello_Sanzio.jpg/1024px-Raffaello_Sanzio.jpg'
    },
    {name:'Michelangelo',
    lifespan: 9,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/440px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg'
    },
    {name:'daVinci',
    lifespan: 7,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg'
    },
    {name:'Titian',
    lifespan: 9,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Self-portrait_of_Titian.jpg/1024px-Self-portrait_of_Titian.jpg'
    },
    {name: 'Boticelli',
    lifespan: 7,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sandro_Botticelli_083.jpg/1280px-Sandro_Botticelli_083.jpg'
    }
]

const modernArtPlayerArray = playerArray.filter((player) => player.type === 'modern');
const classicArtPlayerArray = playerArray.filter((player) => player.type === 'classic');

modernArtPlayerArray.map((player, index) => {
    $('#modernArtPlayers').append(`<option value='${index}'>${player.name}</option>`);
});
classicArtPlayerArray.map((player, index) => {
    $('#classicArtPlayers').append(`<option value='${index}'>${player.name}</option>`);
});

// Artwork image data
let artistPaintings;
$.get(
    `https://179iper8g8.execute-api.ap-southeast-2.amazonaws.com/prod/artist-artworks`, (data) => {
        // Returning all data
        console.log(data);
        // Extract info
        artistPaintings = data;
        })

// ENTRY
//choose and declare Players
function setPlayer(artistType, player){
    $(`#${artistType}ArtAvatar`).attr("src", `${player.avatar}`);
    $(`#${artistType}ArtVitals`).html(`<p> Life: ${player.lifespan} years</p>`); 
    // make player data accessible throughout script 
    if(artistType==='modern'){
        window.modernArt = new ModernArtPlayer(player.name, player.lifespan);
    } else {
        window.classicArt = new ClassicArtPlayer(player.name, player.lifespan);
    }
};
//choose starting player in reverse
const secondPlayer = Math.round(Math.random() + 1);
$("#call-api-btn" + secondPlayer).attr('disabled', 'disabled');

// select players from drop down menu
$('#modernArtPlayers').on("change", (event) => {
    setPlayer('modern', modernArtPlayerArray[event.target.value]);
});
$('#classicArtPlayers').on("change", (event) => {
    setPlayer('classic', classicArtPlayerArray[event.target.value]);
    // const classicArtImageURL = `${[index].name.toLowerCase}ImageURL`;
});

// Game play
// Modern Art attacks - Button 1
$("#call-api-btn1").on("click", () => { 
    //button disabled if clicked so it is other player's turn next
    $('#call-api-btn1').attr('disabled', 'disabled');
    $('#call-api-btn2').removeAttr('disabled');
    // allow attack functions to be read throughout script
    const modernArt = window.modernArt;
    const classicArt = window.classicArt;
    // invoke Modern Art attack as result of button1 click event
    modernArt.attackEnemy(classicArt);
    //updateLifespan of enemy classicart (player2)
    $('#classicArtVitals').html(`<p> Life: ${classicArt.hitpoints<1?0:classicArt.hitpoints} years</p>`);
    //resulting text and image display under various attacker/ enemy alive/dead conditions....
    if(!modernArt.dead && !classicArt.dead){
    // if both still alive -> 
    // paint something
    const i = Math.floor(Math.random() * artistPaintings[modernArt.name.toLowerCase()].length); 
    const modernArtImageURL = artistPaintings[modernArt.name.toLowerCase()][i].url;
    $('#mainCanvas').attr('src', modernArtImageURL);
    // say stuff
        const quoteModernArt = [
            `"Inhale colour!!! Die young!!!"`, 
            `"If no mistake you have made, losing you are..."`,
            `"Draw a circle... then imagine it's a head... or whatever you bloody want it to be."`
        ];
        const sentence1A = [
            `slathers toxic cobalt violet on his enemy.`,
            `sells a finger painting for $1.5 million.`,
            `uses colour direct from the tube... and it looks amazing!!`
        ];
        const random1 = Math.floor(Math.random() * quoteModernArt.length);
        $("#artQuote").html(`<h1>${quoteModernArt[random1]}</h1><h2>${modernArt.name} ${sentence1A[random1]}</h2>`);
        $("#gamePlayText").html(`<p class="gamePlayP">${classicArt.name} loses ${modernArt.attackpoint} year${modernArt.attackpoint===1?'':'s'} of his life...  Only ${classicArt.hitpoints} good painting year${classicArt.hitpoints===1?'':'s'} left.</p>`);
        console.log(classicArt);
        } else if(!modernArt.dead && classicArt.dead){
        // Modern art wins - Classic art dead
            $("#artQuote").html(`<h1 id="modernArtWinner">MODERN Art wins!!!</h1>`);
            $('#mainCanvas').attr('src', 'https://static01.nyt.com/images/2012/08/24/world/europe/24christ-span/24christ-span-superJumbo.jpg?quality=90&auto=webp');
            $("#gamePlayText").html(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p><p>${classicArt.name} has no years left..</p><h2>Game over for ${classicArt.name} and linear perspective.</h2>`);
            $('#call-api-btn2').attr('disabled', 'disabled');
            $('#call-api-btn1').attr('disabled', 'disabled');
        } else if(!classicArt.dead && modernArt.dead){
         // Classic art wins - Modern art dead
            $("#artQuote").html(`<h1 id="classicArtWinner">CLASSICAL Art wins!!!</h1>`);
            $('#mainCanvas').attr('src', 'https://piximus.net/media2/55709/funny-classical-art-memes-17.jpg');
            $("#gamePlayText").html(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left..</p><p>${modernArt.name} has no years left..</p><h2>Game over for ${modernArt.name} and Ikea paintings.</h2>`);
            $('#call-api-btn2').attr('disabled', 'disabled');
            $('#call-api-btn1').attr('disabled', 'disabled');
        } else if(classicArt.dead && modernArt.dead){
         // both art dead
            $("#artQuote").html(`<h1 id="gameOver">No winners...art is dead....</h1>`);
            $("#gamePlayText").html(`<p>${modernArt.name} has no years left..</p><p>...${classicArt.name} also has no years left... </p>`); 
            $('#mainCanvas').attr('src', 'https://piximus.net/media2/55709/funny-classical-art-memes-17.jpg');
            $('#call-api-btn2').attr('disabled', 'disabled');
            $('#call-api-btn1').attr('disabled', 'disabled');
        } else {
         // else must be error
            $("#artQuote").html(`<h2>Oops...look like there's paint on our face.</h2>`);
        } 
}
);

// Classic Art attacks - Button 2
$("#call-api-btn2").on("click", () => { 
    //console log attack
    console.log("Call api button 2 was clicked!");
     //button disabled if clicked so it is other player's turn next
    $('#call-api-btn2').attr('disabled', 'disabled');
    $('#call-api-btn1').removeAttr('disabled');
    // allow attack functions to be read throughout script
    const modernArt = window.modernArt;
    const classicArt = window.classicArt;
    // classic art attacks
    classicArt.attackEnemy(modernArt);
    $('#modernArtVitals').html(`<p> Life: ${modernArt.hitpoints<1?0:modernArt.hitpoints} years</p>`);
    console.log(modernArt);
    // display text, images under various alive/dead conditions
    if(!modernArt.dead && !classicArt.dead){
    // if both still alive -->
        //paint something
        const i = Math.floor(Math.random() * artistPaintings[classicArt.name.toLowerCase()].length); 
        const classicArtImageURL = artistPaintings[classicArt.name.toLowerCase()][i].url;
        $('#mainCanvas').attr('src', classicArtImageURL);
        // say something
        const quoteClassicArt = [
            `"Eat my lead poisoning for the sake of your art!!!"`, 
            `"Do or do not, there is no try ..."`,
            `"Draw a circle... then the rest of the f$%*ing head!"`
        ];
        const sentence2A = [
            `squeezes lead white in his enemy's face...`,
            `presides over the Grand Salon.`,
            `teaches this young upstart a lesson.`
        ];
        const random2 = Math.floor(Math.random() * quoteClassicArt.length);
        console.log(quoteClassicArt[random2]);

        $("#artQuote").html(`<h1>${quoteClassicArt[random2]}</h1><h2>${classicArt.name} ${sentence2A[random2]}</h2>`);
        $("#gamePlayText").html(`<p class="gamePlayP">${modernArt.name} loses ${classicArt.attackpoint} year${classicArt.attackpoint===1?'':'s'} of his life. Currently ${modernArt.hitpoints} good painting year${modernArt.hitpoints===1?'':'s'} left.</p>`);
        console.log(modernArt);
    } else if (!modernArt.dead && classicArt.dead){
       // Classic art dead
        $("#artQuote").html(`<h1 id="modernArtWinner">MODERN Art wins!!!</h1>`);
        $('#mainCanvas').attr('src', 'https://static01.nyt.com/images/2012/08/24/world/europe/24christ-span/24christ-span-superJumbo.jpg?quality=90&auto=webp');
        $("#gamePlayText").html(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p><p>${classicArt.name} has no years left..</p><h2>Game over for ${classicArt.name} and anatomical reference.</h2>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else if(!classicArt.dead && modernArt.dead){
        // Modern art dead
        $("#artQuote").html(`<h1 id="classicArtWinner">CLASSICAL Art wins!!!</h1>`);
        $('#mainCanvas').attr('src', 'https://piximus.net/media2/55709/funny-classical-art-memes-17.jpg');
        $("#gamePlayText").html(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left..</p><p>${modernArt.name} has no years left..</p><h2>Game over for ${modernArt.name} and the 20th century.</h2>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else if(classicArt.dead && modernArt.dead){
        // both art dead
        $("#artQuote").html(`<h1 id="gameOver">No winners...art is dead....</h1>`);
        $("#gamePlayText").html(`<p>${modernArt.name} has no years left..</p><p>...${classicArt.name} also has no years left... </p>`); 
        $('#mainCanvas').attr('src', 'https://piximus.net/media2/55709/funny-classical-art-memes-17.jpg');
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else {
        // else must be error
        $("#artQuote").html(`<h2>Oops...look like there's paint on our face.</h2>`);
    };
}
);





