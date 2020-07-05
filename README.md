# Tamagotchi

[![GitHub repo size](https://img.shields.io/github/repo-size/megan-pg/tamagotchi)](https://shields.io/)

<!-- ![image or animation of application](./assets/tamagotchi.png) -->

## Table of Contents:
* [Description](##Description)
* [How to Install](##How-to-Install)
* [Technologies Used](##Technologies-Used)
* [Usage](##Usage)
* [Contributors](##Contributors)
* [Link to Page](##Link-to-Page)

## Description
This application is a remake of the original Tamagotchi game from the 80's. User logs in and plays with a chosen animal. Keeping it alive and keeping it alive for XX amount of time is the goal.

## How to Install
To run locally: `npm install` in your terminal/bash. Create database `sequelize db:create` then `node server` to turn on the app and database. Run `seeds.sql` in mySQL to get started.

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

## Usage
* Choose your pet
    * Turtle
    * Fish
    * Gator
    * Mammal
User inputs Name. Date and pet ID get auto generated.

* Choose level of difficulty 
    * Easy - Starts off with all full meters
    * Medium - Starts off with all half meters
    * Hard - Starts off with meters almost empty

* Hunger button
    * Feed - This will update your Hunger meter (makes positive sound)
    * Snack - This will update your Happy/Bored and Hunger meters but will decrement your Health meter.

* Disipline button - This will decrement your Happy/Bored meter but will also decrement the chance of your pet acting out (make a negative sound)

* Medicine button - When your pet's health is very low you can use this but it will also severely lower their Happy/Bored meter (makes a negative sound)

* Clean button - After your pet poops, it will need to be cleaned. Don't let it sit too long in it's poop or the health meter will be decremented.

* Happy/Bored Button
    * Love your pet to boost Happy/Bored meter (makes a positive sound)
    * Play with pet to boost Happy/Bored meter (makes a positive sound)

* Light button - When your pet becomes bored, it wants to go to sleep. Don't let it sit too long bored or the health meter will be decremented. 

## Contributors
* **Megan Pardy-Gokcu** - [megan-pg](https://github.com/megan-pg)
* **Doug Wright** - [Spazcool](https://github.com/Spazcool)
* **Scott House** - [sehouse](https://github.com/sehouse)
* **Karla McLeod** - [kmcleod81](https://github.com/kmcleod81)

## Link to Heroku Page
* <!-- https://?.herokuapp.com/ -->