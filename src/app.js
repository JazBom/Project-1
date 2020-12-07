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
            console.log(`${this.name} lobs a shot worth:`, damage);
            console.log(`${enemy.name} has been attacked by ${this.name}.`);
            enemy.takeHit(damage);
        } 
        return damage;
    }

    // calculate hit taken
    takeHit(damage){
        this.hitpoints = this.hitpoints - damage;
        this.dead = this.hitpoints <= 0;
        if(!this.dead){
            console.log(`${this.name} takes damage of:`, damage);
            console.log(`${this.name}'s remaining hitpoints:`, this.hitpoints)
            console.log(`--------------- ${this.name} status ---------------`);
            console.log(`${this.name} is still alive ... watch out!`)
        } else {
            console.log(`${this.name} has been killed.`)
        }
    }
}
class ModernArtPlayer extends Player {
    constructor(name, hitpoints){
        super(name, hitpoints);
        }
    attackEnemy(enemy) {
        this.attackpoint = Math.floor(Math.random() * 3);
        super.attack(enemy, this.attackpoint);
    }
}
class ClassicArtPlayer extends Player {
    constructor(name, hitpoints){
        super(name, hitpoints);
        this.attackpoint = 2;
    }
    attackEnemy(enemy) {
        super.attack(enemy, this.attackpoint);
    }
}
// entry point 



//determine starting player
const secondPlayer = Math.round(Math.random() + 1);
$("#call-api-btn" + secondPlayer).addClass('disabled');

// players
window.modernArt = new ModernArtPlayer('Picasso', 10);
console.log(modernArt);
window.classicArt = new ClassicArtPlayer('Raffaello', 10);
console.log(classicArt);

// game play
$("#call-api-btn1").on("click", () => { 
    const modernArt = window.modernArt;
    const classicArt = window.classicArt;
    console.log("Call api button 1 was clicked!");
    $('#call-api-btn1').addClass('disabled');
    $('#call-api-btn2').removeClass('disabled');
    // modern art attacks
    modernArt.attackEnemy(classicArt);
    // write out gameplay....
    if(!modernArt.dead && !classicArt.dead){
        // gameplay if both still alive
        console.log(classicArt);// object - display values under buttons?
        $("#divArtBattle").prepend(`<h2 id="modernArtQuote">"Inhale colour!!! Die young!!!"</h2>`);
        $("#modernArtQuote").append(`<p>${modernArt.name} slathers toxic cobalt violet on his enemy.</p>`); // replaces this with random sentence - build random sentence generator
        $("#modernArtQuote").append(`<p>${classicArt.name} loses ${modernArt.attackpoint} year${modernArt.attackpoint>1?'s':''} of his life...  Only ${classicArt.hitpoints} good painting years left!</p>`); // fix plural
        $("#modernArtQuote").append(`<p>That young upstart ${modernArt.name} is still alive and waiting for another chance... watch out ${classicArt.name}.</p>`);
        console.log(classicArt);
    } else if(modernArt.dead && !classicArt.dead) {
        // console.log(`Picasso is the winner!!! Game over Raffaello.`)
        $("#divArtBattle").prepend(`<h2 "modernArtWinner">Picasso is the winner!!! Game over Raffaello.</h2>`);
        $("#modernArtWinner").append(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`); 
        $("#modernArtWinner").append(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
    } else if(!classicArt.dead && modernArt.dead){
        // console.log(`Raffaello is the winner!!! Game over Picasso.`);
        $("#divArtBattle").prepend(`<h2 id="classicArtWinner">Raffaello is the winner!!! Game over Picasso.</h2>`);
        $("#classicArtWinner").append(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`); 
        $("#classicArtWinner").append(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
    } else if(classicArt.dead && modernArt.dead){
        // console.log(`Game over. No winners...art is dead...`);
        $("#divArtBattle").prepend(`<h2 id="gameOver">Game over. No winners...art is dead....</h2>`);
        $("#gameOver").append(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`); 
        $("#gameOver").append(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
    } else {
        $("#divArtBattle").prepend(`<h2>Oops...look like there's paint on our face.</h2>`);
    };
    const imgData1 = $.get(
    `https://picsum.photos/v2/list`, (data1) => { //  image from a moden art collection appearing
        // Returning all data
        console.log(data1);
        // Extract info
            const i = Math.floor(Math.random() * 31); // change '31' depending on how many images in array
            const dataModernArt = data1[i]// change [i] to [random number 1-500]
            const id1 = dataModernArt.id; 
            const width = 300;
            const height = 200;
            const author1 = dataModernArt.author;
            const url1 = `https://picsum.photos/id/${id1}/${width}/${height}`;
    
            console.log(id1);
            console.log(author1);
            console.log(url1);
    
            // Creating elements to add those responses
            const image1 = `<p id="imageP1"><img src="${url1}"></img></p>`;
            const authorName1 = `<p>${author1}</p>`; 
            // const imageUrl = `<a id="3" href="${url}" target="_blank">Go to image</a>`;
            
            //Appending the elements on the DOM
            $("#divArtBattle").prepend(image1);
            $("#imageP1").append(authorName1);
            // $("#col-2").append(imageUrl);
        }
    );
});


// Every time Butto n#2 is pushed, this happens
// Gameplay, points scoring, text re life left etc

// including the image from a moden art collection appearing
$("#call-api-btn2").on("click", () => { 
    const modernArt = window.modernArt;
    const classicArt = window.classicArt;
    console.log("Call api button 2 was clicked!");
    $('#call-api-btn2').addClass('disabled');
    $('#call-api-btn1').removeClass('disabled');
    // classic art attacks
    classicArt.attackEnemy(modernArt);
    // gameplay
    if(!modernArt.dead && !classicArt.dead){
        console.log(modernArt);// object - display values under buttons?
        $("#divArtBattle").prepend(`<h2 id="classicArtQuote">"Eat my classic slow, painful lead poisoning for the sake of your art!!!"</h2>`);
        $("#classicArtQuote").append(`<p>${classicArt.name} squeezes lead white in his enemy's face.</p>`); // replaces this with random sentence - build random sentence generator
        $("#classicArtQuote").append(`<p>${modernArt.name} loses ${classicArt.attackpoint} year${classicArt.attackpoint>1?'s':''}  of his life...  Only ${modernArt.hitpoints} good painting years left!</p>`); // fix plural
        $("#classicArtQuote").append(`<p>${classicArt.name} is still young and beautiful... watch out ${modernArt.name}.</p>`);
        console.log(modernArt);
    } else if (!modernArt.dead && classicArt.dead){
        // console.log(`<p>Picasso is the winner!!! Game over Raffaello.</p>`)
        $("#divArtBattle").prepend(`<h2 "modernArtWinner">Picasso is the winner!!! Game over Raffaello.</h2>`);
        $("#modernArtWinner").append(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`); 
        $("#modernArtWinner").append(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
    } else if(!classicArt.dead && modernArt.dead){
        // console.log(`<p>Raffaello is the winner!!! Game over Picasso.</p>`);
        $("#divArtBattle").prepend(`<h2 id="classicArtWinner">Raffaello is the winner!!! Game over Picasso.</h2>`);
        $("#classicArtWinner").append(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`); 
        $("#classicArtWinner").append(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
    } else if(classicArt.dead && modernArt.dead){
        // console.log(`Game over. No winners...art is dead...`);
        $("#divArtBattle").prepend(`<h2 id="gameOver">Game over. No winners...art is dead....</h2>`);
        $("#gameOver").append(`<p>${modernArt.name} has ${modernArt.hitpoints} year${modernArt.hitpoints>1?'s':''} left..</p>`); 
        $("#gameOver").append(`<p>${classicArt.name} has ${classicArt.hitpoints} year${classicArt.hitpoints>1?'s':''} left.. </p>`);
    } else {
        $("#divArtBattle").prepend(`<h2>Oops...look like there's paint on our face.</h2>`);
    };

    if(!classicArt.dead && !modernArt.dead){
        const imgData2 = $.get(
            `https://picsum.photos/v2/list`, (data2) => {
                // Returning all data
                console.log(data2);
                // Extract info
                // have to put in an if() statement for not returning results where 'undefined' (e.g. no url)
                    const i = Math.floor(Math.random() * 31);  // change '31' depending on how many images in array
                    const dataClassicArt = data2[i]
                    const id2 = dataClassicArt.id; 
                    const width = 300;
                    const height = 200;
                    const author2 = dataClassicArt.author;
                    const url2 = `https://picsum.photos/id/${id2}/${width}/${height}`;
            
                    console.log(id2);
                    console.log(author2);
                    console.log(url2);
            
                    // Creating elements to add those responses
                    
                    const image2 = `<p id="imageP2"><img src="${url2}"></img></p>`;
                    const authorName2 = `<p>${author2}</p>`; 
                    // const imageUrl = `<a id="3" href="${url}" target="_blank">Go to image</a>`;
                    
                    //Appending the elements on the DOM
                    $("#divArtBattle").prepend(image2);
                    $("#imageP2").append(authorName2);
                    // $("#col-2").append(imageUrl);
                }
            );
    } 
});