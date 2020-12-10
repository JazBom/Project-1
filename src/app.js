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
        this.attackpoint = Math.floor(Math.random() * 5);
        super.attack(enemy, this.attackpoint);
        return enemy.hitpoints
    }
};
class ClassicArtPlayer extends Player {
    constructor(name, hitpoints){
        super(name, hitpoints);
    }
    attackEnemy(enemy) {
        this.attackpoint = Math.floor(Math.random() * 3) + 1;
        super.attack(enemy, this.attackpoint);
        return enemy.hitpoints
    }
};

// Player options
let playerArray = [
    {name: 'Picasso',
    lifespan: 19,
    type: 'modern',
    avatar: 'https://www.tate.org.uk/art/images/work/T/T05/T05010_10.jpg'
    },
    {name:'Cezanne',
    lifespan: 17,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Paul_C%C3%A9zanne%2C_1888-90%2C_Madame_C%C3%A9zanne_%28Hortense_Fiquet%2C_1850%E2%80%931922%29_in_a_Red_Dress%2C_oil_on_canvas%2C_116.5_x_89.5_cm%2C_The_Metropolitan_Museum_of_Art%2C_New_York.jpg/1024px-thumbnail.jpg'
    },
    {name:'Gauguin',
    lifespan: 14,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Paul_Gauguin_040.jpg/1024px-Paul_Gauguin_040.jpg'
    },
    {name:'Munch',
    lifespan: 16,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/1280px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg'
    },
    {name:'van Gogh',
    lifespan: 17,
    type: 'modern',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Tableau_I%2C_by_Piet_Mondriaan.jpg/1280px-Tableau_I%2C_by_Piet_Mondriaan.jpg'
    }, {name:'Raffaello',
    lifespan: 12,
    type: 'classical',
    avatar: 'https://images.uffizi.it/production/attachments/1506337803506060-raffaello-madonna-cardellino-principale.jpg?ixlib=rails-2.1.3&w=1200&h=800&fit=clip&crop=center&fm=gjpg&auto=compress'
    },
    {name:'Michelangelo',
    lifespan: 8,
    type: 'classical',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tondo_Doni%2C_por_Miguel_%C3%81ngel.jpg/1280px-Tondo_Doni%2C_por_Miguel_%C3%81ngel.jpg'
    },
    {name:'Da Vinci',
    lifespan: 15,
    type: 'classical',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/1024px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg'
    },
    {name:'Titian',
    lifespan: 20,
    type: 'classical',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Titian_Bacchus_and_Ariadne.jpg/1920px-Titian_Bacchus_and_Ariadne.jpg'
    },
    {name: 'Boticelli',
    lifespan: 18,
    type: 'classical',
    avatar: 'https://news.artnet.com/app/news-upload/2017/01/1024px-Sandro_Botticelli_-_Madonna_del_Magnificat_-_Google_Art_Project.jpg'
    }
]
// declare vars for player object elements in player class arrays
//player array element vars
const picasso = playerArray[0];
const cezanne =  playerArray[1];
const gauguin = playerArray[2];
const munch =  playerArray[3];
const vanGogh =  playerArray[4];
const raffaello = playerArray[5];
const michelangelo =  playerArray[6];
const daVinci = playerArray[7];
const titian =  playerArray[8];
const boticelli =  playerArray[9];

// ENTRY
//choose and declare Players
const player1 = gauguin;
console.log(player1);
const player2 = daVinci;
console.log(player2);
// make player data accessible throughout script
window.modernArt = new ModernArtPlayer(player1.name, player1.lifespan);
window.classicArt = new ClassicArtPlayer(player2.name, player2.lifespan);

//choose starting player in reverse
const secondPlayer = Math.round(Math.random() + 1);
$("#call-api-btn" + secondPlayer).attr('disabled', 'disabled');
// Display avatar, name and dynamic vitals (based on changing hitpoints, initially defined as lifespan in object)
$("#avatarModernArt").attr("src", `${player1.avatar}`);
$('#playerModernArtName').append(`<h2 class="playerName">${player1.name}</h2>`);
$('#modernArtVitals').append(`<p> Life: ${player1.lifespan} years</p>`); 
// $('#playerModernArtName').append(`<h3>${playerModernArtArray[3].lifespan}</h3>`);
$("#avatarClassicArt").attr("src", `${player2.avatar}`);
$('#playerClassicArtName').append(`<h2 class="playerName">${player2.name}</h2>`);
$('#classicArtVitals').append(`<p> Life: ${player2.lifespan} years</p>`);
// $('#playerClassicArtName').append(`<h3>${playerClassicArtArray[1].lifespan}</h3>`);

// Game play
// Modern Art attacks - Button 1
$("#call-api-btn1").on("click", () => { 
    // console log attack
    console.log("Call api button 1 was clicked!");
    //button disabled if clicked so it is other player's turn next
    $('#call-api-btn1').attr('disabled', 'disabled');
    $('#call-api-btn2').removeAttr('disabled');
    // allow attack functions to be read throughout script
    const modernArt = window.modernArt;
    const classicArt = window.classicArt;
    // invoke Modern Art attack as result of button1 click event
    modernArt.attackEnemy(classicArt);
    $('#classicArtVitals').html(`<p> Life: ${classicArt.hitpoints} years</p>`);
    // modernArt.updateLifespan(player2);
    // ... resulting gameplay - text and image display under various alive/dead conditions....
    if(!modernArt.dead && !classicArt.dead){
        // if both still alive -> gameplay 
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
        const sentence1B = [
            `is still drawing those perfect heads.`, 
            `is respected by other artists, and will not retire!!`,
            `takes abuse from no-one but Kings and popes...`
        ];
        const random1 = Math.floor(Math.random() * quoteModernArt.length);
        $("#divArtBattle").prepend(`<h1 id="modernArtQuote">${quoteModernArt[random1]}</h1>`);
        $("#modernArtQuote").append(`<h2>${modernArt.name} ${sentence1A[random1]}</h2>`); // replaces this with random sentence - build random sentence generator
        $("#modernArtQuote").append(`<p>${classicArt.name} loses ${modernArt.attackpoint} year${modernArt.attackpoint===1?'':'s'} of his life...  Only ${classicArt.hitpoints} good painting years left.</p>`);
        $("#modernArtQuote").append(`<p>But ${classicArt.name} ${sentence1B[random1]}</p>`);
        console.log(classicArt);
    } else if(modernArt.dead && !classicArt.dead) {
        // Modern art dead
        $("#divArtBattle").prepend(`<h1 id="classicArtWinner">Classical Art wins!!!</h1>`);
        $("#classicArtWinner").prepend(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
        $("#classicArtWinner").prepend(`<p>${modernArt.name} has no years left..</p>`); 
        $("#classicArtWinner").append(`<h1>Game over</h1>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else if(classicArt.dead && !modernArt.dead){
        //Classic art dead
        $("#divArtBattle").prepend(`<h1 id="modernArtWinner">Modern Art wins!!!</h1>`);
        $("#modernArtWinner").prepend(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left.. </p>`);
        $("#modernArtWinner").prepend(`<p>${classicArt.name} has no years left..</p>`); 
        $("#modernArtWinner").append(`<h1 >Game over</h1>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else if(classicArt.dead && modernArt.dead){
        // both art dead
        $("#divArtBattle").append(`<h1 id="gameOver">Game over. No winners...art is dead....</h1>`);
        $("#gameOver").prepend(`<p>${modernArt.name} has no years left..</p>`); 
        $("#gameOver").prepend(`<p> ... ${classicArt.name} also has no years left.. </p>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else {
        // else - must be error
        $("#divArtBattle").prepend(`<h2>Oops...look like there's paint on our face.</h2>`);
    }
    const imgData1 = $.get(
    `https://picsum.photos/v2/list`, (data1) => { //  image from a moden art collection appearing
        // Returning all data
        // Extract info
            const i = Math.floor(Math.random() * 31); // change '31' depending on how many images in array
            const dataModernArt = data1[i]; // change [i] to [random number 1-500]
            const id1 = dataModernArt.id; 
            const width = 600;
            const height = 400;
            const author1 = dataModernArt.author;
            const url1 = `https://picsum.photos/id/${id1}/${width}/${height}`;
    
            console.log(id1);
            console.log(author1);
            console.log(url1);
    
            // Creating elements to add those responses
            const image1 = `<p id="imageP1"><img class="image-cell-2" src="${url1}"></img></p>`;
            const authorName1 = `<p>${author1}</p>`; 
            // const imageUrl = `<a id="3" href="${url}" target="_blank">Go to image</a>`;
            
            //Appending the elements on the DOM
            $("#divArtBattle").prepend(image1);
            $("#imageP1").append(authorName1);
            // $("#col-2").append(imageUrl);
        }
    );
});

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
    $('#modernArtVitals').html(`<p> Life: ${modernArt.hitpoints} years</p>`);
    console.log(modernArt);
    // gameplay - display text, images under various alive/dead conditions
    if(!modernArt.dead && !classicArt.dead){
        // if both art alive 
        const quoteModernArt = [
            `"Eat my slow, painful lead poisoning for the sake of your art!!!"`, 
            `"Paint or paint not, there is no try ..."`,
            `"Draw a circle...then draw the rest of the f$%*ing head!"`
        ];
        const sentence2A = [
            `squeezes lead white in his enemy's face...`,
            `rejects ${modernArt.name}'s work from the Grand Salon.`,
            `teaches this young upstart a lesson.`
        ];
        const sentence2B = [
            `is still young and beautiful... watch out.`, 
            `eats pain(t) for breakfast and is coming for you...`,
            `is still in the studio... and the student will soon become the master.`
        ];
        const random2 = Math.floor(Math.random() * quoteModernArt.length);
        console.log(quoteModernArt[random2]);
        $("#divArtBattle").prepend(`<h1 id="classicArtQuote">${quoteModernArt[random2]}</h1>`);
        $("#classicArtQuote").append(`<h2>${classicArt.name} ${sentence2A[random2]}.</h2>`);
        $("#classicArtQuote").append(`<p>${modernArt.name} loses ${classicArt.attackpoint} year${classicArt.attackpoint===1?'':'s'}  of his life...  Only ${modernArt.hitpoints} good painting years left.</p>`);  // fix plural
        $("#classicArtQuote").append(`<p>But ${modernArt.name} ${sentence2B[random2]}.</p>`);
    } else if (!modernArt.dead && classicArt.dead){
       // Classic art dead
        $("#divArtBattle").prepend(`<h1 id="modernArtWinner">Modern Art wins!!!</h1>`);
        $("#modernArtWinner").prepend(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`);
        $("#modernArtWinner").prepend(`<p>${classicArt.name} has no years left..</p>`); 
        $("#modernArtWinner").append(`<h2>Game over</h2>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else if(!classicArt.dead && modernArt.dead){
        // Modern art dead
        $("#divArtBattle").prepend(`<h1 id="classicArtWinner">Classical Art wins!!!</h1>`);
        $("#classicArtWinner").prepend(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left..</p>`);
        $("#classicArtWinner").prepend(`<p>${modernArt.name} has no years left..</p>`); 
        $("#classicArtWinner").append(`<h1>Game over</h1>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else if(classicArt.dead && modernArt.dead){
        // both art dead
        $("#divArtBattle").prepend(`<h1 id="gameOver">Game over. No winners...art is dead....</h1>`);
        $("#gameOver").append(`<p>${modernArt.name} has no years left..</p>`); 
        $("#gameOver").append(`<p>...${classicArt.name} also has no years left... </p>`);
        $('#call-api-btn2').attr('disabled', 'disabled');
        $('#call-api-btn1').attr('disabled', 'disabled');
    } else {
        // else must be error
        $("#divArtBattle").prepend(`<h2>Oops...look like there's paint on our face.</h2>`);
    };

    if(!classicArt.dead && !modernArt.dead){
        const imgData2 = $.get(
            `https://picsum.photos/v2/list/`, (data2) => {
                // Returning all data
                console.log(data2);
                // Extract info
                // have to put in an if() statement for not returning results where 'undefined' (e.g. no url)
                    const i = Math.floor(Math.random() * 30);  // change '31' depending on how many images in array
                    const dataClassicArt = data2[i];
                    const id2 = dataClassicArt.id; // why does this keep throwing an error?
                    const width = 600;
                    const height = 400;
                    const author2 = dataClassicArt.author;
                    const url2 = `https://picsum.photos/id/${id2}/${width}/${height}`;
            
                    console.log(id2);
                    console.log(author2);
                    console.log(url2);
            
                    // Creating elements to add those responses
                    
                    const image2 = `<p id="imageP2"><img class="image-cell-2" src="${url2}"></img></p>`;
                    const authorName2 = `<p>${author2}</p>`; 
                    // const imageUrl = `<a id="3" href="${url}" target="_blank">Go to image</a>`;
                    
                    //Appending the elements on the DOM
                    $("#divArtBattle").prepend(image2);
                    $("#imageP2").append(authorName2);
                    // $("#col-2").append(imageUrl);
                })
    }
}
);