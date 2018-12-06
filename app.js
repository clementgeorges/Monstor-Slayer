new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false, 
        turns: [],
        
    },    
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        }, 
        attack: function() {
            //Player attack calculation
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
           
            //Logs Player damage to Monster to DOM
            this.turns.unshift({
                isPlayer: true,
                text: `You attacks Monster for ${damage}`,
            })
            
            //To see if Player has won
            if(this.checkWin()) {
                return
            }

            //Monster attack calculation //See monsterAttach Function
            this.monsterAttacks();
            
            //To see if Monster has won
            this.checkWin();
        },
        specialAttack: function() {
            //Player attack calculation
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage

            //Logs Player special attack to DOM
            this.turns.unshift({
                isPlayer: true,
                text: `You launches a Special Attack for ${damage}`
            })
            
            //To see if Player has won
            if(this.checkWin()) {
                return
            }
            //Monster attack calculation //See monsterAttach Function
            this.monsterAttacks();
        },
        heal: function() {
            if(this.playerHealth <= 90) { //Makes sure you can heal before 90%
                this.playerHealth += 10; //You can only heal by 10%
            } else {
                this.playerHealth = 100; //Make sure you cant over heal from 100%
            }

            //Logs Player Heal to DOM
            this.turns.unshift({
            isPlayer: true,
            text: `You Heals for 10`
            })
            
            this.monsterAttacks(); //When healing Monster can still attack
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.turns = []
        }, 
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage
            
            //Logs Monster damage to Player to DOM
            this.turns.unshift({
                isPlayer: false,
                text: `Monster attacks You for ${damage}`
            })
            
            //To see if Monster has won
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }, 
        checkWin: function() {
            if(this.monsterHealth <=0){
                if(confirm('You have Won!. New Game?')){
                    this.startGame();
                    this.turns = []
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <= 0){
                if(confirm('You have Lost!. New Game?')){
                    this.startGame();
                    this.turns = []
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false
        }
    },
})