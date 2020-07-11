# Tamagotchi

[![GitHub repo size](https://img.shields.io/github/repo-size/megan-pg/tamagotchi)](https://shields.io/)

<!-- ![image or animation of application](./assets/tamagotchi.png) -->

## Table of Contents:
* [Description](##Description)
* [How to Install](##How-to-Install)
* [Technologies Used](##Technologies-Used)
* [Usage](##Usage)
* [Contributors](##Contributors)
* [Special Thanks](##Special-Thanks)
* [Link to Page](##Link-to-Page)

## Description
This application is a remake of the original Tamagotchi game from the 80's. User logs in and plays with a chosen animal. Keeping it alive and keeping it alive for XX amount of time is the goal.

## How to Install
Requires:
* Node
* MySQL

To run locally:
1. Install dependencies:
    ``` npm install ```

2. Create database:
    ``` sequelize db:create ```

3. Run server:
    ```node server```
    
4. Open localhost in browser & create an account

## Technologies Used
Project is created with:
* HTML5
* CSS3
* Materialize
* Javascript
* MySql
* Deployed in Heroku
* Node.js
    * bcryptjs
    * dotenv
    * express
    * jsonwebtoken
    * mysql2
    * sequelize
    * uuid

* Online Pixelart.com
* Texture Packer (to create sprite sheets)

## Usage
* Choose your pet
    * Turtle
    * Fish
    * Gator
    * Mammal
User inputs Name. Date and pet ID get auto generated.

* Choose level of difficulty 
    * Easy - Starts off with meters near empty
    * Medium - Starts off with meters half full
    * Hard - Starts off with meters almost full


* Feed Button - This will update your Hunger meter (makes positive sound)

* Clean Button - After your pet poops, it will need to be cleaned. Don't let it sit too long in it's poop or the health meter will be decremented.

* Play Button - Play with pet to boost Happy/Bored meter (makes a positive sound)

* Sleep Button - Play with pet to boost Happy/Bored meter (makes a positive sound)

* Medicine Button - When your pet's health is very low you can use this but it will also severely lower their Happy/Bored meter (makes a negative sound)

* Love Button - Love your pet to boost Happy/Bored meter (makes a positive sound)


## Contributors
* **Megan Pardy-Gokcu** - [megan-pg](https://github.com/megan-pg)
* **Doug Wright** - [Spazcool](https://github.com/Spazcool)
* **Scott House** - [sehouse](https://github.com/sehouse)
* **Karla McLeod** - [kmcleod81](https://github.com/kmcleod81)

## Special Thanks/Credits
* Game Music: "Chubby Cat", from PlayOnLoop.com Licensed under Creative Commins by Attriution 4.0
* Additional sound effects from [Zap Splat](https://www.zapsplat.com)
* Cool bouncy animation found on codepen @champa720

## Link to Heroku Page
* [Digital Dude](https://digitaldude.herokuapp.com/)
