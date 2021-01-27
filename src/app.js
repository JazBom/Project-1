console.log("App is running."); 

// info re Game Players (classes)
class Player {
    constructor(id, name, hitpoints){
        this.name = name;
        this.hitpoints = hitpoints;
        this.dead = false;
        this.id = id;
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
    constructor(id, name, hitpoints){
        super(id, name, hitpoints);
        }
    attackEnemy(enemy) {
        this.attackpoint = Math.floor(Math.random() * 4);
        super.attack(enemy, this.attackpoint);
        return enemy.hitpoints
    }
};
class ClassicArtPlayer extends Player {
    constructor(id, name, hitpoints){
        super(id, name, hitpoints);
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
    avatar: 'https://www.pablopicasso.org/images/paintings/self-portrait-1907.jpg',
    id: '600ba8fbe42703289c257e87'
    },
    {name:'Cezanne',
    lifespan: 7,
    type: 'modern',
    avatar: 'https://media.newyorker.com/photos/5abd7107e4b526446411b381/master/w_2560%2Cc_limit/180409_r31842.jpg',
    id: '600ba90fe42703289c257e88'
    },
    {name:'Gauguin',
    lifespan: 5,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Self-Portrait_by_Paul_Gauguin%2C_1885.jpg',
    id: '600ba922e42703289c257e89'
    },
    {name:'Munch',
    lifespan: 8,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Edvard_Munch_-_Self-Portrait_%281895%29_G0192-59_-_Google_Art_Project.jpg/800px-Edvard_Munch_-_Self-Portrait_%281895%29_G0192-59_-_Google_Art_Project.jpg',
    id: '600ba94ae42703289c257e8a'
    },
    {name:'vanGogh',
    lifespan: 4,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg/1024px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
    id: '600ba95de42703289c257e8b'
    }, 
    {name:'Raffaello',
    lifespan: 4,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Raffaello_Sanzio.jpg/1024px-Raffaello_Sanzio.jpg',
    id: '600ba9f4e42703289c257e8d'
    },
    {name:'Michelangelo',
    lifespan: 9,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/440px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg',
    id: '600baa07e42703289c257e8e'
    },
    {name:'daVinci',
    lifespan: 7,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg',
    id: '600baa0ee42703289c257e8f'
    },
    {name:'Titian',
    lifespan: 9,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Self-portrait_of_Titian.jpg/1024px-Self-portrait_of_Titian.jpg',
    id: '600baa1de42703289c257e90'
    },
    {name: 'Boticelli',
    lifespan: 7,
    type: 'classic',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Sandro_Botticelli_083.jpg/1280px-Sandro_Botticelli_083.jpg',
    id: '600baa29e42703289c257e91'   
}
]

const modernArtPlayerArray = playerArray.filter((player) => player.type === 'modern');
const classicArtPlayerArray = playerArray.filter((player) => player.type === 'classic');

modernArtPlayerArray.map((player) => {
    $('#modernArtPlayers').append(`<option value='${player.id}'>${player.name}</option>`);
});
classicArtPlayerArray.map((player) => {
    $('#classicArtPlayers').append(`<option value='${player.id}'>${player.name}</option>`);
});

// Artwork image data
let allPaintings;
$.get(
    `http://localhost:3000/api/images/all`,
    (data) => {
        // Returning all data
        console.log(data);
        // Extract info
        allPaintings = data;
        // artistPaintsingsByName = data[artist].imageUrl;
        })

// let artistPaintings;
// $.get(
    // `https://179iper8g8.execute-api.ap-southeast-2.amazonaws.com/prod/artist-artworks`, --> this was external API on amazon
//     (data) => {
//         // Returning all data
//         console.log(data);
//         // Extract info
//         artistPaintings = data;
//         })

// ENTRY
//choose and declare Players
function setPlayer(artistType, player){
    $(`.${artistType} > .avatar`).attr("src", `${player.avatar}`);
    // $(`#${artistType}ArtVitals`).html(`<p> Life: ${player.lifespan} years</p>`); 
    $(`.${artistType} > .vitals`).html(`<p> Life: ${player.lifespan} years</p>`);
    // make player data accessible throughout script 
    if(artistType==='modern'){
        window.modernArt = new ModernArtPlayer(player.id, player.name, player.lifespan);
    } else {
        window.classicArt = new ClassicArtPlayer(player.id, player.name, player.lifespan);
    }
};
//choose starting player in reverse
const secondPlayer = Math.round(Math.random() + 1);
$("#call-api-btn" + secondPlayer).attr('disabled', 'disabled');

// select players from drop down menu
$('#modernArtPlayers').on("change", (event) => {
    // setPlayer('modern', modernArtPlayerArray[event.target.value]);
    const modernArtist = modernArtPlayerArray.find((artist) => {
        return artist.id === event.target.value;
    });
    setPlayer('modern', modernArtist);
});

$('#classicArtPlayers').on("change", (event) => {
    // setPlayer('classic', classicArtPlayerArray[event.target.value]);
    const classicArtist = classicArtPlayerArray.find((artist) => {
        return artist.id === event.target.value;
    });
    setPlayer('classic', classicArtist);
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
    $('.classic > .vitals').html(`<p> Life: ${classicArt.hitpoints<1?0:classicArt.hitpoints} years</p>`);
    //resulting text and image display under various attacker/ enemy alive/dead conditions....
    if(!modernArt.dead && !classicArt.dead){
    // if both still alive -> 
    // paint something
    // NOTES ON USING FAT ARROW SYNTAX - EVOLUTION BELOW

    // let artistPaintings = [];
    // for(let i=0;i<allPaintings.length;i++) {
    //     if (allPaintings[i].artistNameId === modernArt.id) {
    //         artistPaintings.push(artistPaintings[i]);
    //     }
    // }

    // let artistPaintings = allPaintings.filter(function(painting) {
    //     if(painting.artistNameId === modernArt.id){
    //         return true;
    //     } else {
    //     return false;
    //     }
    // });

    // let artistPaintings = allPaintings.filter(function(painting) {
    //     return painting.artistNameId === modernArt.id;
    // });

    // let artistPaintings = allPaintings.filter((painting) => {
    //     return painting.artistNameId === modernArt.id;
    // });
    let artistPaintings = allPaintings.filter((painting) => painting.artistNameId === modernArt.id);
    const i = Math.floor(Math.random() * artistPaintings.length); 
    const modernArtImageURL = artistPaintings[i].imageUrl;
    // const i = Math.floor(Math.random() * artistPaintings[modernArt.name.toLowerCase()].length); 
    // const modernArtImageURL = artistPaintings[modernArt.name.toLowerCase()][i].url;
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
    $('.modern > .vitals').html(`<p> Life: ${modernArt.hitpoints<1?0:modernArt.hitpoints} years</p>`);
    console.log(modernArt);
    // display text, images under various alive/dead conditions
    if(!modernArt.dead && !classicArt.dead){
    // if both still alive -->
        //paint something
        let artistPaintings = allPaintings.filter((painting) => painting.artistNameId === classicArt.id);
        const i = Math.floor(Math.random() * artistPaintings.length); 
        const classicArtImageURL = artistPaintings[i].imageUrl;

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





